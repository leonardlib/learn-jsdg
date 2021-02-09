/**
 * This exercise reads a txt file, computes the frequency
 * of each letter in that text and displays a histogram of 
 * the most used characters.
 * 
 * Run: node index.js < test.txt
 */

/**
 * This class extends Map to override get method to
 * return a default value when the key is not in the map.
 */
class AuxMap extends Map {
    constructor(defaultValue) {
        super();
        this.defaultValue = defaultValue;
    }

    get(key) {
        if (this.has(key)) {
            return super.get(key);
        } else {
            return this.defaultValue;
        }
    }
}

class Histogram {
    constructor() {
        this.letters = new AuxMap(0);
        this.totalLetters = 0;
    }

    /**
     * Function add letters to the histogram
     * @param {*} text 
     */
    add(text) {
        text = text.replace(/[^a-zA-Z]/g, "").toUpperCase(); // keep only letters

        for (let character of text) {
            let count = this.letters.get(character); // get letter count
            this.letters.set(character, count + 1); // increment letter count
            this.totalLetters++;
        }
    }

    toString() {
        let entries = [...this.letters];

        // Sort letters by frequency, then alphabetically
        entries.sort((a, b) => {
            if (a[1] === b[1]) {
                return a[0] < b[0] ? -1 : 1;
            } else {
                return b[1] - a[1];
            }
        });

        // Convert letter count to percentage
        for (let entry of entries) {
            entry[1] = (entry[1] * 100) / this.totalLetters;
        }

        // Keep letters with a percentage greater or equal to 1
        entries = entries.filter(entry => entry[1] >= 1);

        // Create a line of text of every letter data
        let lines = entries.map(([ letter, percentage ]) => `${letter}: ${"#".repeat(Math.round(percentage))} ${percentage.toFixed(2)} %`);

        return lines.join('\n');
    }
}

/**
 * Function to read the txt file and 
 * create the histogram.
 */
const readTxt = async () => {
    process.stdin.setEncoding('utf-8');
    let histogram = new Histogram();

    for await (let chunk of process.stdin) {
        histogram.add(chunk);
    }

    return histogram;
};

// Execute the exercise and display the histogram in console
readTxt().then(histogram => {
    console.log(histogram.toString());
}).catch(error => {
    console.log(error);
});
