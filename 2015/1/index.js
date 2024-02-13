import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');

let basement = false;

const total = input.split('').reduce((acc, curr, index) => {
    if(acc < 0 && !basement) {
        console.log(`Reached basement at char ${index}`)
        basement = true;
    }

	if (curr === '(') {
		return acc + 1;
	}

	if (curr === ')') {
		return acc - 1;
	}

	return acc;
}, 0);

console.log(`Total: ${total}`);
