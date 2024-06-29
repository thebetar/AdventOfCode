import fs from 'fs';

let data = fs.readFileSync('input.txt', 'utf8');
data = data.split('\n');
data = data.map(data => data.split(''));

let currentIter = [];

for (let i = 0; i < data.length; i++) {
	currentIter[i] = data[i].slice();
}

let lastIter = [];

for (let i = 0; i < 100; i++) {
	for (let row = 0; row < currentIter.length; row++) {
		lastIter[row] = currentIter[row].slice();
	}

	for (let row = 0; row < lastIter.length; row++) {
		for (let col = 0; col < lastIter[row].length; col++) {
			let values = [];

			if (row !== 0) {
				if (col !== 0) {
					values.push(lastIter[row - 1][col - 1] === '#' ? 1 : 0);
				}

				values.push(lastIter[row - 1][col] === '#' ? 1 : 0);

				if (col !== lastIter[row].length - 1) {
					values.push(lastIter[row - 1][col + 1] === '#' ? 1 : 0);
				}
			}

			if (col !== 0) {
				values.push(lastIter[row][col - 1] === '#' ? 1 : 0);
			}

			if (col !== lastIter[row].length - 1) {
				values.push(lastIter[row][col + 1] === '#' ? 1 : 0);
			}

			if (row !== lastIter.length - 1) {
				if (col !== 0) {
					values.push(lastIter[row + 1][col - 1] === '#' ? 1 : 0);
				}

				values.push(lastIter[row + 1][col] === '#' ? 1 : 0);

				if (col !== lastIter[row].length - 1) {
					values.push(lastIter[row + 1][col + 1] === '#' ? 1 : 0);
				}
			}

			const on = values.filter(v => v === 1).length;

			if (lastIter[row][col] === '#') {
				if (on === 2 || on === 3) {
					currentIter[row][col] = '#';
				} else {
					currentIter[row][col] = '.';
				}
			} else {
				if (on === 3) {
					currentIter[row][col] = '#';
				} else {
					currentIter[row][col] = '.';
				}
			}
		}
	}
}

const count = currentIter.reduce((acc, row) => {
	return acc + row.filter(col => col === '#').length;
}, 0);

console.log(`Part 1: ${count}`);

for (let i = 0; i < data.length; i++) {
	currentIter[i] = data[i].slice();
}
lastIter = [];

for (let i = 0; i < 100; i++) {
	for (let row = 0; row < currentIter.length; row++) {
		lastIter[row] = currentIter[row].slice();
	}

	for (let row = 0; row < lastIter.length; row++) {
		for (let col = 0; col < lastIter[row].length; col++) {
			if (
				(row == 0 && col == 0) ||
				(row == 0 && col == lastIter[row].length - 1) ||
				(row == lastIter.length - 1 && col == 0) ||
				(row == lastIter.length - 1 && col == lastIter[row].length - 1)
			) {
				currentIter[row][col] = '#';
				continue;
			}

			let values = [];

			if (row !== 0) {
				if (col !== 0) {
					values.push(lastIter[row - 1][col - 1] === '#' ? 1 : 0);
				}

				values.push(lastIter[row - 1][col] === '#' ? 1 : 0);

				if (col !== lastIter[row].length - 1) {
					values.push(lastIter[row - 1][col + 1] === '#' ? 1 : 0);
				}
			}

			if (col !== 0) {
				values.push(lastIter[row][col - 1] === '#' ? 1 : 0);
			}

			if (col !== lastIter[row].length - 1) {
				values.push(lastIter[row][col + 1] === '#' ? 1 : 0);
			}

			if (row !== lastIter.length - 1) {
				if (col !== 0) {
					values.push(lastIter[row + 1][col - 1] === '#' ? 1 : 0);
				}

				values.push(lastIter[row + 1][col] === '#' ? 1 : 0);

				if (col !== lastIter[row].length - 1) {
					values.push(lastIter[row + 1][col + 1] === '#' ? 1 : 0);
				}
			}

			const on = values.filter(v => v === 1).length;

			if (lastIter[row][col] === '#') {
				if (on === 2 || on === 3) {
					currentIter[row][col] = '#';
				} else {
					currentIter[row][col] = '.';
				}
			} else {
				if (on === 3) {
					currentIter[row][col] = '#';
				} else {
					currentIter[row][col] = '.';
				}
			}
		}
	}
}

const count2 = currentIter.reduce((acc, row) => {
	return acc + row.filter(col => col === '#').length;
}, 0);

console.log(`Part 2: ${count2}`);
