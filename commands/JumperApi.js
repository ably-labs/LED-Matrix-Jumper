import ActiveImageSelector from "./ActiveImageSelector.js";
import SongDetector from "./SongDetector.js";

class JumperApi {

    constructor(songDetector, imageSelector) {
        this._mostRecentSong = "";
        this._songDetector = songDetector || new SongDetector();
        this._imageSelecctor = imageSelector || new ActiveImageSelector();
    }

    mostRecentSong() {
        return this._mostRecentSong;
    }

    async detectSongFromClip(base64byteString) {
        const byteArray = Buffer.from(base64byteString, 'base64');
        const potentialSong = await this._songDetector.execute(byteArray);
        
        if(potentialSong.hasOwnProperty("unrecognised")) {            
            return this.ok(this._mostRecentSong);
        }

        this._mostRecentSong = potentialSong;
        return this.ok(this._mostRecentSong);
    }

    getActiveImageKey() {
        if(this._mostRecentSong === "") {
            return this.ok("default");
        }

        const result = this._imageSelecctor.execute(this._mostRecentSong);
        return this.ok(result);
    }

    ok(value) { return { status: 200, body: value } };
}

export default JumperApi;
