import fs from 'fs';

let data = fs.readFileSync('input.txt', 'utf8');
data = data.split('\n');

data = data.map(item => {
	let values = item.split(': ')[1];
	values = values.split(',').map(value => parseInt(value.trim().split(' ')[1]));

	return values;
});

let max = 0;
let healthyMax = 0;
const iters = 100;

// i = amount of teaspons of first ingredient
for (let i = 0; i < iters; i++) {
	// j = amount of teaspons of second ingredient
	for (let j = 0; j < iters - i; j++) {
		// k = amount of teaspons of third ingredient
		for (let k = 0; k < iters - i - j; k++) {
			// l = amount of teaspons of fourth ingredient (the rest of the ingredients)
			const l = iters - i - j - k;

			const capacity = i * data[0][0] + j * data[1][0] + k * data[2][0] + l * data[3][0];
			const durability = i * data[0][1] + j * data[1][1] + k * data[2][1] + l * data[3][1];
			const flavor = i * data[0][2] + j * data[1][2] + k * data[2][2] + l * data[3][2];
			const texture = i * data[0][3] + j * data[1][3] + k * data[2][3] + l * data[3][3];
			const calories = i * data[0][4] + j * data[1][4] + k * data[2][4] + l * data[3][4];

			if (capacity < 0 || durability < 0 || flavor < 0 || texture < 0) {
				continue;
			}

			const score = capacity * durability * flavor * texture;

			max = Math.max(max, score);

			if (calories == 500) {
				healthyMax = Math.max(healthyMax, score);
			}
		}
	}
}

console.log(`Part 1: ${max}`);
console.log(`Part 2: ${healthyMax}`);
