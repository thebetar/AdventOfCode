import fs from 'fs';

const registers = {
	a: 0,
	b: 0,
};

let curLine = 0;

function halfRegister(registers, key) {
	registers[key] = Math.floor(registers[key] / 2);
}

function tripleRegister(registers, key) {
	registers[key] *= 3;
}

function incrementRegister(registers, key) {
	registers[key]++;
}

function jump(registers, offset) {
	curLine += Number(offset) - 1;
}

function jumpEven(registers, key, offset) {
	if (registers[key] % 2 === 0) {
		jump(registers, offset);
	}
}

function jumpOne(registers, key, offset) {
	if (registers[key] === 1) {
		jump(registers, offset);
	}
}

const instructions = fs.readFileSync('input.txt', 'utf8').split('\n');

function runProgram() {
	while (curLine < instructions.length) {
		const instruction = instructions[curLine];
		const [command, ...args] = instruction.replace(',', '').split(' ');

		switch (command) {
			case 'hlf':
				halfRegister(registers, args[0]);
				break;
			case 'tpl':
				tripleRegister(registers, args[0]);
				break;
			case 'inc':
				incrementRegister(registers, args[0]);
				break;
			case 'jmp':
				jump(registers, parseInt(args[0]));
				break;
			case 'jie':
				jumpEven(registers, args[0], parseInt(args[1]));
				break;
			case 'jio':
				jumpOne(registers, args[0], parseInt(args[1]));
				break;
		}

		curLine++;
	}
}

runProgram();

console.log(`Part 1: ${registers.b}`);

// Part 2
registers.a = 1;
registers.b = 0;

curLine = 0;

runProgram();

console.log(`Part 2: ${registers.b}`);
