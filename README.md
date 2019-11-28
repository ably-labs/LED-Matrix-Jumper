Christmas Jumper API
=================

In this repository is a node app for running audio recognition and an API for returning festive themed iconography. There's also an arudino sketch, that powers an AdaFruit Feather Huzzah that will display the images on strips of NeoPixels.

## Contents

* Quickstart

Web

* Configuration
** AudD
** Azure
* Running
* Testing
* Usage

Hardware

* Hardware Requirements
* Configuration

## Quickstart

If you're familiar with running AdaFruit or Arduino code, and node applications - do the following:

* Edit config.js to contain valid AudD API keys and Azure storage bucket keys
* Edit arduino.ino setting your Wifi SSID and password
* Edit arduino.ino to provide the URL and port you'll use to run the node app in server.js
* NPM start / host the app on something (Azure, Heroku, etc)
* Upload Arduino sketch to hardware with your settings embedded.

Web
===

## Configuration

You're going to need some API keys for this sample to work. 

### AudD

* AudD API key - Get one from (the Telegram bot) at: https://audd.io/
* You'll need to use telegram on your mobile device to get a working key, but the process is nice and easy, don't panic!

### Azure

You'll need to create a storage account, container, and grab the associated API key.

* Create an Azure account - signup here - https://azure.microsoft.com/en-gb/services/storage/blobs/
* Create a storage account - https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts
* Create a storage container for the app
* On the storage container, change the access level to "Blob (anonymous read access for blobs only)"
* Grab your API key and account information.

> Home > Storage Accounts > YOUR STORAGE ACCOUNT - Access Keys

You'll see some information there you need:
* Storage Account Name
* Key 1
* Connection String
* Key 2
* Connection String

You just need to grab the account name, and one of the keys.

### Using your API keys

* Open the file config.js

Fill in:
* The name of your azure storage-account (e.g. "jumperstorageaccount") into azure-account
* The azure storage container name into "azure-containerName"
* The full URL of your blob storage account into "azure-blobStorage"

This will look like

    > https://your-azure-storage-account.blob.core.windows.net

* Your azure-key from either "Key 1" or "Key 2" into "azure-key"
* Your AudD token into "audd-token".


## Running

First, make sure you `npm install`.

Browsing to the root of the webserver on http://localhost:12271 will take you to the audio capture page.

You can start the app by running `npm start`.

    > npm start
    
    > hello-express@0.0.1 start C:\dev\christmas-jumper
    > node server.js
    
    Your app is listening on port 12271

If you want to develop against this with hot-reload and debugging enabled, first, make sure you've installed nodemon

    > npm install -g nodemon
    
then you can simply run `npm run devserver`

    > npm run devserver
    
    > hello-express@0.0.1 devserver C:\dev\christmas-jumper
    > nodemon --inspect server.js
    
    [nodemon] 1.19.4
    [nodemon] to restart at any time, enter `rs`
    [nodemon] watching dir(s): *.*
    [nodemon] watching extensions: js,mjs,json
    [nodemon] starting `node --inspect server.js`
    Debugger listening on ws://127.0.0.1:9229/5ce30222-84d5-4b69-81bd-23a6b1647594
    For help, see: https://nodejs.org/en/docs/inspector
    Your app is listening on port 12271

This will run the server on the same port, with --inspect enabled to connect `VSCode` or `WebStorm` debuggers to step through the code.
It'll also hot-reload any javascript changes, so you don't have to cycle your node process during dev.

* For VSCode see: https://code.visualstudio.com/docs/nodejs/nodejs-debugging
* For WebStorm see: https://www.jetbrains.com/help/webstorm/running-and-debugging-node-js.html

## Testing

Requires jest. You probably want to

    > npm install -g jest

and restart your terminal for this to work well.

From the command line, run `npm test` (or just `jest`) - to run the entire test suite.

    > npm test
    
    > hello-express@0.0.1 test C:\dev\christmas-jumper
    > jest
    
     PASS  commands/SongDetector.test.js (5.092s)
      Song detector
        √ Execute returns song title from AudD API call. (2ms)
        √ Execute calls AudD with API token from configuration
        √ Execute instructs AudD to download song from azure blob storage
        √ Integration test: Can detect song that we know about when run against the real AudD API (3952ms)
    
    Test Suites: 1 passed, 1 total
    Tests:       4 passed, 4 total
    Snapshots:   0 total
    Time:        5.741s
    Ran all test suites.

Or use your favourite jest supporting tool.

## Usage

Just open your browser!

Hardware
=========

## Hardware Requirements

* AdaFruit Feather Huzzah
* USB Cable (usb-a to micro USB)
* NeoPixels Addressable RGB LEDs
* Some power! (a battery, or usb-power etc)

## Software

* Arduino IDE - https://www.arduino.cc/en/main/software

## Configuration

* Open arduino.ino in Arduino IDE
* Edit line 39 to contain your WiFi access point SSID
* Edit line 40 to contain your WiFi password!
* Edit line 58 to be the URL of your running Web app (see above!)
    * Web app needs to be running on port 80, over HTTP.

## Usage

* Plug cable into PC
* Plug cable into AdaFruit Huzzah
* Click Upload button in Arduino IDE
    * Watch all the code run in the serial debugging window if you like!

