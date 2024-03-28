let startingInput = '1321131112';

function part_1() {
	function lookAndSay(input) {
		let result = '';
		let value = '';

		const inputValues = input.split('');

		for (const inputValue of inputValues) {
			// If value is empty (first iteration) set value
			if (!value) {
				value = inputValue;
				continue;
			}

			// If value is the same as last value add it
			if (value[value.length - 1] === inputValue) {
				value += inputValue;
			} else {
				// If value is different add the length and the value to the result
				result += value.length + value[0];
				value = inputValue;
			}
		}

		// Extra step to add the last value
		return result + value.length + value[0];
	}

	for (let i = 0; i < 50; i++) {
		startingInput = lookAndSay(startingInput);
	}

	return startingInput.length;
}

console.log(`Part 1: ${part_1()}`);
