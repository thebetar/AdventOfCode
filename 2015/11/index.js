const forbiddenChas = ['i', 'o', 'l'];
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

function verifyPassword(string) {
	// Check for increasing pair of three letters
	const increasingPairs = string.split('').some((char, index) => {
		if (index < 2) {
			return false;
		}

		const firstCharIndex = alphabet.indexOf(string[index - 2]);
		const secondCharIndex = alphabet.indexOf(string[index - 1]);
		const thirdCharIndex = alphabet.indexOf(string[index]);

		if (firstCharIndex + 1 === secondCharIndex && secondCharIndex + 1 === thirdCharIndex) {
			return true;
		}

		return false;
	});

	if (!increasingPairs) {
		return false;
	}

	// Check for forbidden chars
	if (forbiddenChas.some(char => string.includes(char))) {
		return false;
	}

	// Check for pairs of letters which are not the same
	const similarCharsRegex = /(\w)\1{1}/g;

	const matches = string.match(similarCharsRegex);

	if (!matches) {
		return false;
	}

	const overlappingMatches = matches.filter((match, index) => {
		return matches.some((otherMatch, otherIndex) => {
			if (index === otherIndex) {
				return false;
			}

			if (match === otherMatch) {
				return false;
			}

			return true;
		});
	});

	if (matches.length < 2 || overlappingMatches.length < 2) {
		return false;
	}

	return true;
}

function incrementPassword(string) {
	const stringArray = string.split('');
	let index = stringArray.length - 1;

	while (true) {
		if (index < 0) {
			stringArray.unshift('a');
			index = stringArray.length - 1;
			continue;
		}

		if (stringArray[index] === 'z') {
			stringArray[index] = 'a';
			index -= 1;
			continue;
		}

		stringArray[index] = String.fromCharCode(stringArray[index].charCodeAt(0) + 1);
		break;
	}

	return stringArray.join('');
}

function getNextPassword(string) {
	let nextPassword = string;

	do {
		nextPassword = incrementPassword(nextPassword);
	} while (!verifyPassword(nextPassword));

	return nextPassword;
}

const startPassword = 'hxbxwxba';

const newPassword = getNextPassword(startPassword);

console.log('Part 1:', newPassword);
console.log('Part 2:', getNextPassword(newPassword));
