const bossStats = {
	hitpoints: 109,
	damage: 8,
	armor: 2,
};

const items = [
	{ name: 'Weapons', cost: 8, damage: 4, armor: 0 },
	{ name: 'Weapons', cost: 10, damage: 5, armor: 0 },
	{ name: 'Weapons', cost: 25, damage: 6, armor: 0 },
	{ name: 'Weapons', cost: 40, damage: 7, armor: 0 },
	{ name: 'Weapons', cost: 74, damage: 8, armor: 0 },
	{ name: 'Armor', cost: 13, damage: 0, armor: 1 },
	{ name: 'Armor', cost: 31, damage: 0, armor: 2 },
	{ name: 'Armor', cost: 53, damage: 0, armor: 3 },
	{ name: 'Armor', cost: 75, damage: 0, armor: 4 },
	{ name: 'Armor', cost: 102, damage: 0, armor: 5 },
	{ name: 'Rings', cost: 25, damage: 1, armor: 0 },
	{ name: 'Rings', cost: 50, damage: 2, armor: 0 },
	{ name: 'Rings', cost: 100, damage: 3, armor: 0 },
	{ name: 'Rings', cost: 20, damage: 0, armor: 1 },
	{ name: 'Rings', cost: 40, damage: 0, armor: 2 },
	{ name: 'Rings', cost: 80, damage: 0, armor: 3 },
];

const weapons = items.filter(i => i.name === 'Weapons');
const armor = items.filter(i => i.name === 'Armor');
const rings = items.filter(i => i.name === 'Rings');

const combinations = [];

// With weapons and armor
for (let i = 0; i < weapons.length; i++) {
	for (let j = 0; j < armor.length; j++) {
		combinations.push({
			inventory: [weapons[i], armor[j]],
			cost: weapons[i].cost + armor[j].cost,
			damage: weapons[i].damage + armor[j].damage,
			armor: weapons[i].armor + armor[j].armor,
		});

		for (let k = 0; k < rings.length; k++) {
			combinations.push({
				inventory: [weapons[i], armor[j], rings[k]],
				cost: weapons[i].cost + armor[j].cost + rings[k].cost,
				damage: weapons[i].damage + armor[j].damage + rings[k].damage,
				armor: weapons[i].armor + armor[j].armor + rings[k].armor,
			});

			for (let l = k + 1; l < rings.length; l++) {
				if (k === l) {
					continue;
				}

				combinations.push({
					inventory: [weapons[i], armor[j], rings[k], rings[l]],
					cost: weapons[i].cost + armor[j].cost + rings[k].cost + rings[l].cost,
					damage: weapons[i].damage + armor[j].damage + rings[k].damage + rings[l].damage,
					armor: weapons[i].armor + armor[j].armor + rings[k].armor + rings[l].armor,
				});
			}
		}
	}
}

// With only weapons
for (let i = 0; i < weapons.length; i++) {
	combinations.push({
		inventory: [weapons[i]],
		cost: weapons[i].cost,
		damage: weapons[i].damage,
		armor: weapons[i].armor,
	});

	for (let k = 0; k < rings.length; k++) {
		combinations.push({
			inventory: [weapons[i], rings[k]],
			cost: weapons[i].cost + rings[k].cost,
			damage: weapons[i].damage + rings[k].damage,
			armor: weapons[i].armor + rings[k].armor,
		});

		for (let l = k + 1; l < rings.length; l++) {
			if (k === l) {
				continue;
			}

			combinations.push({
				inventory: [weapons[i], rings[k], rings[l]],
				cost: weapons[i].cost + rings[k].cost + rings[l].cost,
				damage: weapons[i].damage + rings[k].damage + rings[l].damage,
				armor: weapons[i].armor + rings[k].armor + rings[l].armor,
			});
		}
	}
}

function canBeatBoss(combination) {
	const boss = {
		...bossStats,
	};

	const player = {
		hitpoints: 100,
		damage: combination.damage,
		armor: combination.armor,
	};

	let won = false;

	while (true) {
		boss.hitpoints -= Math.max(player.damage - boss.armor, 1);

		if (boss.hitpoints <= 0) {
			won = true;
			break;
		}

		player.hitpoints -= Math.max(boss.damage - player.armor, 1);

		if (player.hitpoints <= 0) {
			break;
		}
	}

	return won;
}

const winningCombinations = combinations.filter(canBeatBoss);

const minCost = winningCombinations.reduce((min, combination) => Math.min(min, combination.cost), Infinity);

console.log(`Part 1: ${minCost}`);

const losingCombinations = combinations.filter(combination => !canBeatBoss(combination));

const maxCost = losingCombinations.reduce((max, combination) => Math.max(max, combination.cost), -Infinity);

console.log(`Part 2: ${maxCost}`);
