import fs from 'fs';

const dataStr = fs.readFileSync('input.txt', 'utf8');
let data = dataStr.split('\n').filter(Boolean);

data = data.map(line => {
	const words = line.split(' ');

	const startingPerson = words[0];
	const endingPerson = words[words.length - 1].slice(0, -1);
	const happiness = parseInt(`${words[2] === 'gain' ? '' : '-'}${words[3]}`);

	return {
		startingPerson,
		endingPerson,
		happiness,
	};
});

const people = data.reduce((acc, { startingPerson, endingPerson }) => {
	if (!acc.includes(startingPerson)) {
		acc.push(startingPerson);
	}

	if (!acc.includes(endingPerson)) {
		acc.push(endingPerson);
	}

	return acc;
}, []);

function permute(arr) {
	// Early return if only 1 or less is left with array of that value
	if (arr.length <= 1) {
		return [arr];
	}

	const permutations = [];

	// Loop through all
	for (let i = 0; i < arr.length; i++) {
		// Get current person
		const currentPerson = arr[i];

		// Get all elements before and after current person
		const remainingPeople = arr.slice(0, i).concat(arr.slice(i + 1));
		const remainingPermutations = permute(remainingPeople);

		// Loop over all possible permutations
		for (let perm of remainingPermutations) {
			// Add current person to all permutations
			permutations.push([currentPerson, ...perm]);
		}
	}

	return permutations;
}

function circularPermutations(people) {
	// Early return if array is empty
	if (people.length === 0) {
		return [];
	}

	// Get first person
	const firstPerson = people[0];
	// Get all people except first person
	const remainingPeople = people.slice(1);
	// Get all combinations of remaining people
	const remainingPeopleCombinations = permute(remainingPeople);

	// Initialise result array
	const circularPerms = [];
	for (let perm of remainingPeopleCombinations) {
		// Add element with first person and all different permutations of remaining people
		circularPerms.push([firstPerson, ...perm]);
	}

	return circularPerms;
}

function mapHappiness(result) {
	// Initialise happiness to 0
	let happiness = 0;

	for (let i = 0; i < result.length; i++) {
		// Get first person
		const currentPerson = result[i];
		// Get person next to first person
		const nextPerson = result[(i + 1) % result.length];

		// Get data object from first person
		const currentHappiness = data.find(({ startingPerson, endingPerson }) => {
			return startingPerson === currentPerson && endingPerson === nextPerson;
		});
		// Get data object from next person next to first person
		const nextHappiness = data.find(({ startingPerson, endingPerson }) => {
			return startingPerson === nextPerson && endingPerson === currentPerson;
		});

		// Add happiness from both objects (can be negative if people dont like each other)
		happiness += currentHappiness.happiness;
		happiness += nextHappiness.happiness;
	}

	return {
		arrangement: result,
		happiness,
	};
}

const permutations = circularPermutations(people).map(mapHappiness);

const maxHappiness = permutations.reduce((acc, { happiness }) => {
	return Math.max(acc, happiness);
}, -Infinity);

console.log(`Part 1: ${maxHappiness}`);

const newPeople = [...people, 'me'];

for (let person of people) {
	data.push({
		startingPerson: 'me',
		endingPerson: person,
		happiness: 0,
	});

	data.push({
		startingPerson: person,
		endingPerson: 'me',
		happiness: 0,
	});
}

const newPermutations = circularPermutations(newPeople).map(mapHappiness);

const newMaxHappiness = newPermutations.reduce((acc, { happiness }) => {
	return Math.max(acc, happiness);
}, -Infinity);

console.log(`Part 2: ${newMaxHappiness}`);
