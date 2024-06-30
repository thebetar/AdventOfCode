const puzzleInput = 34000000;

function getPresentCount(houseNumber) {
	let presentCount = 0;

	for (let i = 1; i <= houseNumber; i++) {
		if (houseNumber % i === 0) {
			presentCount += i * 10;
		}
	}

	return presentCount;
}

let houseNumber = 1;

while (true) {
	const presentCount = getPresentCount(houseNumber);

	if (presentCount >= puzzleInput) {
		break;
	}

	houseNumber++;
}

console.log(`Part 1: ${houseNumber}`);

function getPresentCount2(houseNumber) {
	let presentCount = 0;

	for (let i = 1; i <= houseNumber; i++) {
		if (houseNumber % i === 0 && houseNumber / i <= 50) {
			presentCount += i * 11;
		}
	}
	831600;

	return presentCount;
}

houseNumber = 1;

while (true) {
	const presentCount = getPresentCount2(houseNumber);

	if (presentCount >= puzzleInput) {
		break;
	}

	houseNumber++;
}

console.log(`Part 2: ${houseNumber}`);
