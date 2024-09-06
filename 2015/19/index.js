import fs from 'fs';

let data = fs.readFileSync('input.txt', 'utf8');
let molecule;
[data, molecule] = data.split('\n\n');
data = data.split('\n');

const combinations = [];

for (const line of data) {
	const [from, to] = line.split(' => ');

	combinations.push([from, to]);
}

const moleculePossiblities = new Set([]);

for (let i = 0; i < combinations.length; i++) {
	const [from, to] = combinations[i];

	for (let j = 0; j < molecule.length; j++) {
		if (molecule.slice(j, j + from.length) === from) {
			const newMolecule = molecule.slice(0, j) + to + molecule.slice(j + from.length);

			moleculePossiblities.add(newMolecule);
		}
	}
}

console.log(`Part 1: ${moleculePossiblities.size}`);

// Part 2
let search = molecule;
let steps = 0;

while (search !== 'e') {
	for (const [from, to] of combinations) {
		if (search.includes(to)) {
			search = search.replace(to, from);
			steps++;
		}
	}
}

console.log(`Part 2: ${steps}`);
