import { expect, test } from 'vitest'
import ActiveImageSelector from "./ActiveImageSelector.js";

const sut = new ActiveImageSelector();

describe("ActiveImageSelector", () => {

    it("can suggest an image ignoring the case of song names", () => {
        const returnedKey = sut.execute("jingle BELL rock")
        expect(returnedKey).toBe("bell");
    });

    each([
        ["Jingle Bell Rock", "bell"],
        ["Let It Snow! Let It Snow! Let It Snow!", "snow"],
        ["Rockin' Around the Christmas Tree", "tree"],
        ["Santa Claus Is Coming To Town", "santa"],
        ["Deck The Halls", "holly"],
        ["We Wish You A Merry Christmas", "pud"],
        ["Fairytale Of New York (feat. Kirsty MacColl)", "star"],
        ["White Christmas", "snow"],
        ["Sleigh Ride", "sled"],
        ["Jingle Bells - 1", "bell"],
        ["Christmas Alphabet", "sock"],
        ["Santa Baby", "hat"],
        ["All I Want for Christmas Is You", "gift"],
        ["It's the Most Wonderful Time of the Year", "candy"],
        ["Rudolph the Red-Nosed Reindeer", "deer"],
        ["Frosty the Snowman", "frosty"]
    ])('Maps %s to %s', (song, key) => {
        const returnedImageKey = sut.execute(song);

        expect(returnedImageKey).toBe(key);
    });
});
