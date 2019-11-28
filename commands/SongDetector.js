const cfg = require('../config');
const axios = require("axios");
const { StorageSharedKeyCredential } = require("@azure/storage-blob");
const { BlobServiceClient } = require("@azure/storage-blob");
const uuid = require('uuid/v1');

class SongDetector {
    constructor(config = cfg, httpClient = axios, uploadAndReturnUrl = uploadToAzureBlobStorage) {
        this._config = config;
        this._httpClient = httpClient;
        this._upload = uploadAndReturnUrl;
    }

    async execute(bytes) {
        const url = await this._upload(this._config, bytes);
        const result = await this.pushToRecognitionApi(url);

        if (resultDoesNotContainATitle(result)) {
            return { unrecognised: true };
        }

        return result.data.result.title;
    }

    async pushToRecognitionApi(url) {
        const token =  this._config["audd-token"];
        return await this._httpClient.post(`https://api.audd.io/?api_token=${token}&return=timecode&url=${url}`);
    }
}

const uploadToAzureBlobStorage = async (config, bytes) => {
    // Create correctly authenticated Azure blob storage clients.
    const defaultAzureCredential = new StorageSharedKeyCredential(config["azure-account"], config["azure-key"]);
    const blobServiceClient = new BlobServiceClient(config["azure-blobStorage"], defaultAzureCredential);
    const containerClient = blobServiceClient.getContainerClient(config["azure-containerName"]);

    // Generate unique filename and upload
    const unique = "latestSongUpload" //uuid();
    const blockBlobClient = containerClient.getBlockBlobClient(unique);
    const uploadBlobResponse = await blockBlobClient.upload(bytes, bytes.length || 0);

    // Return path, with extra "cacheBust" query string part so we can reuse urls without getting cached.
    return `${config["azure-blobStorage"]}/${config["azure-containerName"]}/${unique}?cacheBust=${Date.now()}`;
};

const resultDoesNotContainATitle = (result) => {
    return  typeof result == 'undefined' || result == null || 
            typeof result.data == 'undefined' ||  result.data == null ||
            typeof result.data.result == 'undefined' || result.data.result == null ||
            typeof result.data.result.title == 'undefined' || result.data.result.title == null;
};

module.exports = SongDetector;
