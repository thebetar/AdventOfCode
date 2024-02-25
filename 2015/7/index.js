import fs from 'fs';

const dataStr = fs.readFileSync('input.txt', 'utf8');
const data = dataStr.split('\n');

function part_1() {
    const signals = {};
    let results = {};

    for (const line in data) {
        const [input, output] = data[line].split(' -> ');
        signals[output] = input.split(' ');
    }

    function calculate(wire) {
        let val;

        if (!Number.isNaN(+wire)) {
            return Number(wire);
        }

        if (results[wire] === undefined) {
            const values = signals[wire];

            if(values.length === 1) {
                val = calculate(values[0]);
            } else {
                const operator = values[values.length - 2];

                switch(operator) {
                    case 'AND':
                        val = calculate(values[0]) & calculate(values[2]);
                        break;
                    case 'OR':
                        val = calculate(values[0]) | calculate(values[2]);
                        break;
                    case 'LSHIFT':
                        val = calculate(values[0]) << calculate(values[2]);
                        break;
                    case 'RSHIFT':
                        val = calculate(values[0]) >> calculate(values[2]);
                        break;
                    case 'NOT':
                        val = ~calculate(values[1]);
                        break;
                }
            }

            results[wire] = val;
        }

        return results[wire];
    }

    const resultPart1 = calculate('a');
    results = {
        b: resultPart1
    };
    
    const resultPart2 = calculate('a');


    return {
        part1: resultPart1,
        part2: resultPart2
    }
}

const {
    part1,
    part2
} = part_1();

console.log('Part 1:', part1);
console.log('Part 2:', part2);