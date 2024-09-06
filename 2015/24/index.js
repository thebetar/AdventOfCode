import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n').map(Number);

class Sled {
	passangerSeat = new Set();
	compartment1 = new Set();
	compartment2 = new Set();

	constructor(passangerSeat, compartment1, compartment2) {
		this.passangerSeat = passangerSeat;
		this.compartment1 = compartment1;
		this.compartment2 = compartment2;
	}
}

// Get all combinations which would make even weight
function getCombinations(weights, sum, currentNumbers, total, combinations) {
	if (sum === total) {
		combinations.push(currentNumbers);
		return;
	}

	if (sum > total) {
		return;
	}

	for (let i = 0; i < weights.length; i++) {
		const weight = weights[i];

		const newWeights = weights.slice(i + 1);

		const newSum = sum + weight;

		const newNumbers = currentNumbers.slice();
		newNumbers.push(weight);

		getCombinations(newWeights, newSum, newNumbers, total, combinations);
	}

	return combinations;
}

const total = input.reduce((a, b) => a + b);
let combinations = getCombinations(input, 0, [], total / 3, []);

// Minimum packages are all possiblities for in passenger seat
function getMinimumPackages(combinations) {
	const min = Math.min(...combinations.map(c => c.length).filter(l => l <= 8));
	return combinations.filter(c => c.length === min);
}

let minimumPackages = getMinimumPackages(combinations);

// Get all possible sleds per minimum packages
function getLowestQE(minimumPackages) {
	return Math.min(...minimumPackages.map(m => m.reduce((a, b) => a * b)));
}

let lowestQE = getLowestQE(minimumPackages);

console.log(`Part One: ${lowestQE}`);

// Part Two
combinations = getCombinations(input, 0, [], total / 4, []);
minimumPackages = getMinimumPackages(combinations);
lowestQE = getLowestQE(minimumPackages);

console.log(`Part Two: ${lowestQE}`);
