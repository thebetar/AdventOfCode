import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');

const directions = input.split('');

function part_1() {
	let position = [0, 0];
	const history = {
		[position.join(',')]: 1,
	};

	for (const direction of directions) {
		switch (direction) {
			case '^':
				position = [position[0], position[1] + 1];
				break;
			case 'v':
				position = [position[0], position[1] - 1];
				break;
			case '>':
				position = [position[0] + 1, position[1]];
				break;
			case '<':
				position = [position[0] - 1, position[1]];
				break;
		}

		if (history[position.join(',')]) {
			history[position.join(',')] += 1;
		} else {
			history[position.join(',')] = 1;
		}
	}

	return Object.keys(history).length;
}

function update_position(position, direction) {
	switch (direction) {
		case '^':
			return [position[0], position[1] + 1];
		case 'v':
			return [position[0], position[1] - 1];
		case '>':
			return [position[0] + 1, position[1]];
		case '<':
			return [position[0] - 1, position[1]];
	}
}

function update_history(history, position) {
	if (history[position.join(',')]) {
		history[position.join(',')] += 1;
	} else {
		history[position.join(',')] = 1;
	}

	return history;
}

function part_2() {
	let position = [0, 0];
	let roboPosition = [0, 0];
	const history = {
		[position.join(',')]: 1,
	};

	directions.forEach((direction, index) => {
		if (index % 2 === 0) {
			position = update_position(position, direction);

			update_history(history, position);
		} else {
			roboPosition = update_position(roboPosition, direction);

			update_history(history, roboPosition);
		}
	});

	return Object.keys(history).length;
}

console.log(`Part 1: ${part_1()}`);
console.log(`Part 2: ${part_2()}`);
