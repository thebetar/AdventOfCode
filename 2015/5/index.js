import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');

const words = input.split('\n');

function part_1() {
    let nice = 0;

    for (const word of words) {
        const vowelsRegex = RegExp(/[aeiou].*[aeiou].*[aeiou]/, 'g');
        const doubleLetterRegex = RegExp(/(.)\1/, 'g');
        const naughtyRegex = RegExp(/ab|cd|pq|xy/, 'g');

        if (word.match(vowelsRegex) && word.match(doubleLetterRegex) && !word.match(naughtyRegex)) {
            nice += 1;
        }
    }

    return nice;
}

function part_2() {
    let nice = 0;

    for (const word of words) {
        const patternTwiceRegex = RegExp(/(..).*\1/, 'g');
        const doubleLetterRexg = RegExp(/(.).\1/, 'g');

        if (word.match(patternTwiceRegex) && word.match(doubleLetterRexg)) {
            nice += 1;
        }
    }

    return nice;
}

console.log(`Nice words count: ${part_1()}`);
console.log(`Nice words count: ${part_2()}`);