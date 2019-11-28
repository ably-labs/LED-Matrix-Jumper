class ActiveImageSelector {
    constructor() {
    }

    execute(mostRecentSong) {
        const cleaned = mostRecentSong.toLowerCase();
        const map = {
            "have yourself a merry little christmas (remastered)": "hat",
            "have yourself a merry little christmas": "hat",
            "jingle bell rock": "bell",
            "let it snow! let it snow! let it snow!": "snow",
            "rockin' around the christmas tree": "tree",
            "rockin around the christmas tree": "tree",
            "santa claus is coming to town": "santa",
            "waiting for christmas to arrive": "santa",
            "deck the halls": "holly",
            "deck the hall": "holly",
            "i wish it could be christmas everyday": "star",
            "we wish you a merry christmas": "pud",
            "fairytale of new york (feat. kirsty maccoll)": "star",
            "white christmas": "snow",
            "sleigh ride": "sled",
            "jingle bells - 1": "bell",
            "christmas alphabet": "sock",
            "santa baby": "hat",
            "all i want for christmas is you": "gift",
            "it's the most wonderful time of the year": "candy",
            "rudolph the red-nosed reindeer": "deer",
            "frosty the snowman": "frosty"
        };

        return map[cleaned];
    }
}

module.exports = ActiveImageSelector;
