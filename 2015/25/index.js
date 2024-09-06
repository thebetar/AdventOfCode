const start = 20151125;

function getNextRow(num) {
	return (num * 252533) % 33554393;
}

// Now get for row 2981, column 3075
let row = 1;
let column = 1;

let current = start;
let currentRow = 1;
let currentColumn = 1;

while (true) {
	if (currentRow === 2981 && currentColumn === 3075) {
		console.log(`Part One: ${current}`);
		break;
	}

	current = getNextRow(current);

	if (currentRow === 1) {
		currentRow = currentColumn + 1;
		currentColumn = 1;
	} else {
		currentRow--;
		currentColumn++;
	}
}
