import fs from 'fs'

const data = fs.readFileSync('input.txt', 'utf8');
const lines = data.split('\n');

function part_1() {
    let total_chars = 0;
    let total_chars_in_memory = 0;

    for (const line of lines) {
        total_chars += line.length;
        total_chars_in_memory += eval(line).length;
    }

    return total_chars - total_chars_in_memory;
}

function part_2() {
    let total_chars = 0
    let total_chars_in_encoded = 0

    for (let line of lines) {
        total_chars += line.length

        line = line.replace(/\\/g, '\\\\');
        line = line.replace(/"/g, '\\"');
        line = `"${line}"`

        total_chars_in_encoded += line.length
    }
    
    return total_chars_in_encoded - total_chars
}

console.log(`Part 1: ${part_1()}`);
console.log(`Part 2: ${part_2()}`);
