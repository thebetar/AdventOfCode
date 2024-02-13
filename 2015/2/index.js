import fs  from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');

const lines = input.split('\n');

function get_size(l, w, h) {
    const side1 = l * w;
    const side2 = w * h;
    const side3 = h * l;

    return 2 * side1 + 2 * side2 + 2 * side3 + Math.min(side1, side2, side3);
}

function get_length(l, w, h) {
    const [min1, min2] = [l, w, h].sort((a, b) => a - b).slice(0, 2);

    return min1 + min1 + min2 + min2 + l * w * h;
}

const total = lines.reduce((acc, line) => {
    const [l, w, h] = line.split('x').map(Number);

    const size = get_size(l, w, h);
    const length = get_length(l, w, h);

    return [acc[0] + size, acc[1] + length];
}, [0, 0]);

console.log(`Total: ${total[0]}`);
console.log(`Length: ${total[1]}`);