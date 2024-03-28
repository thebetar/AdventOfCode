import fs from 'fs';

const data = fs.readFileSync('input.txt', 'utf8');
const lines = data.split('\n');

const uniqueCities = new Set();
const information = [];

for (const line of lines) {
	const [cities, distance] = line.split(' = ');
	const [city1, city2] = cities.split(' to ');
	uniqueCities.add(city1);
	uniqueCities.add(city2);

	information.push({
		city1,
		city2,
		distance: parseInt(distance, 10),
	});
}

const cities = Array.from(uniqueCities);

function calculate() {
	const possibleRoutes = [];

	function getRoute(route, remainingCities) {
		if (remainingCities.length === 0) {
			possibleRoutes.push({
				routes: route,
			});
			return;
		}

		for (let i = 0; i < remainingCities.length; i++) {
			const newRoute = [...route, remainingCities[i]];
			const newRemainingCities = remainingCities.filter((city, index) => index !== i);
			getRoute(newRoute, newRemainingCities);
		}
	}

	getRoute([], cities);

	for (const possibleRoute of possibleRoutes) {
		possibleRoute.totalDistance = possibleRoute.routes.reduce((acc, city, index) => {
			if (index === 0) {
				return acc;
			}

			const city1 = city;
			const city2 = possibleRoute.routes[index - 1];

			const distance =
				information.find(info => {
					return (
						(info.city1 === city1 && info.city2 === city2) || (info.city1 === city2 && info.city2 === city1)
					);
				}).distance || 0;

			return acc + distance;
		}, 0);
	}

	return {
		min: Math.min(...possibleRoutes.map(route => route.totalDistance)),
		max: Math.max(...possibleRoutes.map(route => route.totalDistance)),
	};
}

const { min: part_1, max: part_2 } = calculate();

console.log(`Part 1: ${part_1}`);
console.log(`Part 2: ${part_2}`);
