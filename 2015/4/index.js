import crypto from 'crypto';

const input = 'iwrupvqb';

function md5_parse(string) {
	return crypto.createHash('md5').update(string).digest('hex');
}

function part_1() {
	let found = false;
	let number = 1;

	while (!found) {
		const hash = md5_parse(input + number);
		if (hash.startsWith('00000')) {
			found = true;
		} else {
			number += 1;
		}
	}

	return number;
}

function part_2() {
	let found = false;
	let number = 1;

	while (!found) {
		const hash = md5_parse(input + number);
		if (hash.startsWith('000000')) {
			found = true;
		} else {
			number += 1;
		}
	}

	return number;
}

console.log(`Part 1: ${part_1()}`);
console.log(`Part 2: ${part_2()}`);
