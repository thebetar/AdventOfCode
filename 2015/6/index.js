import fs from 'fs';

let data = fs.readFileSync('input.txt', 'utf8');
data = data.split('\n');

function part_1() {
	const lights = [...Array(999)].map(() => {
		return [...Array(999)].map(() => 0);
	});

	for (const line of data) {
		const action = line.includes('turn on') ? 'turn on' : line.includes('turn off') ? 'turn off' : 'toggle';

		const splitLine = line.split('through');
		const [start] = splitLine[0].match(/(\d+),(\d+)/);
		const [end] = splitLine[1].match(/(\d+),(\d+)/);

		const colStart = Number(start.split(',')[0]);
		const rowStart = Number(start.split(',')[1]);

		const colEnd = Number(end.split(',')[0]);
		const rowEnd = Number(end.split(',')[1]);

		for (let i = rowStart; i <= rowEnd; i++) {
			for (let j = colStart; j <= colEnd; j++) {
				if (action === 'turn on') {
					lights[i][j] = 1;
				} else if (action === 'turn off') {
					lights[i][j] = 0;
				} else {
					lights[i][j] = lights[i][j] === 1 ? 0 : 1;
				}
			}
		}
	}

	const onLights = lights.reduce((acc, row) => {
		return (
			acc +
			row.reduce((acc, light) => {
				return light === 1 ? acc + 1 : acc;
			}, 0)
		);
	}, 0);

	console.log(`Part 1: ${onLights}`);
}

function part_2() {
	const lights = [...Array(1000)].map(() => {
		return [...Array(1000)].map(() => 0);
	});

	for (const line of data) {
		const action = line.includes('turn on') ? 'turn on' : line.includes('turn off') ? 'turn off' : 'toggle';

		const splitLine = line.split('through');
		const [start] = splitLine[0].match(/(\d+),(\d+)/);
		const [end] = splitLine[1].match(/(\d+),(\d+)/);

		const colStart = Number(start.split(',')[0]);
		const rowStart = Number(start.split(',')[1]);

		const colEnd = Number(end.split(',')[0]);
		const rowEnd = Number(end.split(',')[1]);

		for (let i = rowStart; i <= rowEnd; i++) {
			for (let j = colStart; j <= colEnd; j++) {
				if (action === 'turn on') {
					lights[i][j] += 1;
				} else if (action === 'turn off') {
					lights[i][j] = lights[i][j] === 0 ? 0 : lights[i][j] - 1;
				} else {
					lights[i][j] += 2;
				}
			}
		}
	}

	const onLights = lights.reduce((acc, row, i) => {
		return (
			acc +
			row.reduce((acc, light, j) => {
				if (Number.isNaN(light)) {
					console.log(light, i, j);
				}
				return acc + light;
			}, 0)
		);
	}, 0);

	console.log(`Part 2: ${onLights}`);
}

part_1();
part_2();
