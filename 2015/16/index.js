import fs from 'fs';

let data = fs.readFileSync('input.txt', 'utf8');
data = data.split('\n');
data = data.map(line => {
	const values = line.split(', ');
	const sueProperties = {};

	for (let i = 0; i < values.length; i++) {
		if (i === 0) {
			const [, name, value] = values[i].split(': ');
			sueProperties[name] = parseInt(value);
			continue;
		}

		const [name, value] = values[i].split(': ');
		sueProperties[name] = parseInt(value);
	}

	return sueProperties;
});

const sueInfo = {
	children: 3,
	cats: 7,
	samoyeds: 2,
	pomeranians: 3,
	akitas: 0,
	vizslas: 0,
	goldfish: 5,
	trees: 3,
	cars: 2,
	perfumes: 1,
};

const sue = data.findIndex(sue => {
	for (const key in sue) {
		if (sue[key] !== sueInfo[key]) {
			return false;
		}
	}

	return true;
});

console.log(`Part 1: ${sue + 1}`);

const sue2 = data.findIndex(sue => {
	for (const key in sue) {
		if (key === 'cats' || key === 'trees') {
			if (sue[key] <= sueInfo[key]) {
				return false;
			}
		} else if (key === 'pomeranians' || key === 'goldfish') {
			if (sue[key] >= sueInfo[key]) {
				return false;
			}
		} else if (sue[key] !== sueInfo[key]) {
			return false;
		}
	}

	return true;
});

console.log(`Part 2: ${sue2 + 1}`);
