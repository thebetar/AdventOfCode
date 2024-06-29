import fs from 'fs';

const dataStr = fs.readFileSync('input.txt', 'utf8');
const data = dataStr.split('\n').filter(Boolean);

const seconds = 2503;

const reindeer = data.map(line => {
	const words = line.split(' ');

	const name = words[0];
	const speed = parseInt(words[3]);
	const time = parseInt(words[6]);
	const restTime = parseInt(words[13]);

	let timeLeft = seconds;
	let distance = 0;

	while (timeLeft > 0) {
		const flyTime = Math.min(time, timeLeft);
		distance += flyTime * speed;
		timeLeft -= flyTime;

		if (timeLeft > 0) {
			timeLeft -= restTime;
		}
	}

	return {
		name,
		speed,
		time,
		restTime,
		distance,
		points: 0,
	};
});

const fastestReindeer = reindeer.reduce((acc, { distance }) => {
	return Math.max(acc, distance);
}, 0);

console.log(`Part 1: ${fastestReindeer}`);

// Reset distance for part 2
reindeer.forEach(r => {
	r.distance = 0;
});

let timeLeft = seconds;

while (timeLeft > 0) {
	reindeer.forEach(r => {
		const iterTime = timeLeft % (r.time + r.restTime);

		if (iterTime <= r.time) {
			r.distance += r.speed;
		}
	});

	const maxDistance = reindeer.reduce((acc, { distance }) => {
		return Math.max(acc, distance);
	}, 0);

	reindeer.find(r => r.distance === maxDistance).points++;

	timeLeft--;
}

const mostPoints = reindeer.reduce((acc, { points }) => {
	return Math.max(acc, points);
}, 0);

console.log(`Part 2: ${mostPoints}`);
