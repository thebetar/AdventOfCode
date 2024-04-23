import fs from 'fs';

const dataStr = fs.readFileSync('input.json', 'utf8');
let data = JSON.parse(dataStr);

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

let maxHapiness = 0;

function getPossibleArrangements(people) {
	let arrangements = [];

	const uniquePeople = new Set(people.map(person => person.startingPerson));
}
