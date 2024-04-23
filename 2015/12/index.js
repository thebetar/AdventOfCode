import fs from 'fs';

const dataStr = fs.readFileSync('input.json', 'utf8');
const data = JSON.parse(dataStr);

let result = 0;

function getAllNumbers(data) {
	if (typeof data === 'number') {
		result += data;
		return;
	}

	if (Array.isArray(data)) {
		data.forEach(getAllNumbers);
		return;
	}

	if (typeof data === 'object') {
		Object.values(data).forEach(getAllNumbers);
	}
}

getAllNumbers(data);

console.log(`Part 1: ${result}`);

result = 0;

function getAllNumbersExcludingRed(data) {
	if (typeof data === 'number') {
		result += data;
		return;
	}

	if (Array.isArray(data)) {
		data.forEach(getAllNumbersExcludingRed);
		return;
	}

	if (typeof data === 'object') {
		const values = Object.values(data);

		if (values.includes('red')) {
			return;
		}

		values.forEach(getAllNumbersExcludingRed);
	}
}

getAllNumbersExcludingRed(data);

console.log(`Part 2: ${result}`);
