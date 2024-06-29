import fs from 'fs';

let data = fs.readFileSync('input.txt', 'utf8');
data = data.split('\n').map(Number);

const eggnog = 150;

let combinations = [];

function getCombinations(numbers, sum, currentNumbers) {
	if (sum === eggnog) {
		combinations.push(currentNumbers);
	}

	if (sum > eggnog) {
		return;
	}

	for (let i = 0; i < numbers.length; i++) {
		const newNumbers = numbers.slice(i + 1);
		getCombinations(newNumbers, sum + numbers[i], [...currentNumbers, numbers[i]]);
	}
}

getCombinations(data, 0, []);

console.log(`Part 1: ${combinations.length}`);

const minContainers = Math.min(...combinations.map(c => c.length));
const combnationsWithMinContains = combinations.filter(c => c.length === minContainers);

console.log(`Part 2: ${combnationsWithMinContains.length}`);
