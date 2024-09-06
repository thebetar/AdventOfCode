const bossStats = {
	hp: 55,
	damageAmt: 8,
};

class Player {
	history = [];
	initialStats = {};
	isWizard = false;
	spells = [];

	damageAmount = 0;

	constructor(initial, isWizard) {
		this.history = [];
		this.initialStats = initial;
		this.isWizard = Boolean(isWizard);

		if (this.isWizard) {
			this.spells = [
				{
					cost: 53,
					effect: (m, o) => o.damage(4),
				},
				{
					cost: 73,
					effect: (m, o) => {
						o.damage(2);
						m.hp += 2;
					},
				},
				{
					cost: 113,
					start: (m, o) => (m.armor += 7),
					effect: (m, o) => {},
					end: (m, o) => (m.armor -= 7),
					duration: 6,
				},
				{
					cost: 173,
					effect: (m, o) => o.damage(3),
					duration: 6,
				},
				{
					cost: 229,
					effect: (m, o) => (m.mana += 101),
					duration: 5,
				},
			];
		}

		this.start();
	}

	attack(opponent, spellIdx) {
		if (!this.isWizard) {
			opponent.damage(this.damageAmount);
		} else {
			this.history.push(spellIdx);

			const spell = this.spells[spellIdx];
			this.spent += spell.cost;
			this.mana -= spell.cost;

			if (!spell.duration) {
				spell.effect(this, opponent);
				return;
			}

			const newSpell = {
				idx: spellIdx,
				effect: spell.effect,
				duration: spell.duration,
			};

			// Run spell initial effect
			if (spell.start) {
				spell.start(this, opponent);
			}

			// If spell has an end effect add it to the spell for later
			if (spell.end) {
				newSpell.end = spell.end;
			}

			// Add spell to active spells
			this.activeSpells.push(newSpell);
		}
	}

	damage(n) {
		// Damanage is at least 1
		this.hp -= Math.max(1, n - this.armor);
	}

	duplicate() {
		const newPlayer = new Player(this.initialStats, this.isWizard);
		newPlayer.hp = this.hp;
		newPlayer.spent = this.spent;
		newPlayer.armor = this.armor;
		newPlayer.turn = this.turn;

		newPlayer.activeSpells = this.activeSpells.map(spell => Object.assign({}, spell));
		newPlayer.history = this.history.slice();

		if (this.isWizard) {
			newPlayer.mana = this.mana;
		} else {
			newPlayer.damageAmount = this.damageAmount;
		}

		return newPlayer;
	}

	takeTurn(opponent) {
		this.turn++;

		// Iterate over all active spells
		this.activeSpells.forEach(spell => {
			if (spell.duration <= 0) {
				return;
			}

			spell.effect(this, opponent);
			spell.duration--;

			if (spell.duration === 0 && spell.end) {
				spell.end(this, opponent);
			}
		});
	}

	start() {
		this.hp = this.initialStats.hp;
		this.spent = 0;
		this.armor = 0;
		this.turn = 0;
		this.activeSpells = [];

		if (this.isWizard) {
			this.mana = this.initialStats.mana;
		} else {
			this.damageAmount = this.initialStats.damageAmt;
		}
	}
}

function playAllGames(me, boss, partTwo, depth) {
	depth = depth || 0;

	for (let i = 0; i < me.spells.length; i++) {
		let spellMatch = false;

		for (let j = 0; j < me.activeSpells.length; j++) {
			if (me.activeSpells[j].duration > 1 && i === me.activeSpells[j].idx) {
				spellMatch = true;
			}
		}

		if (spellMatch || me.spells[i].cost > me.mana) {
			continue;
		}

		const newMe = me.duplicate();
		const newBoss = boss.duplicate();

		if (partTwo) newMe.hp--;

		newMe.takeTurn(newBoss);
		newBoss.takeTurn(newMe);
		newMe.attack(newBoss, i);

		newMe.takeTurn(newBoss);
		newBoss.takeTurn(newMe);
		newBoss.attack(newMe);

		if (newBoss.hp <= 0) {
			cheapestSpent = Math.min(cheapestSpent, newMe.spent);
		}

		if (newMe.hp > (partTwo ? 1 : 0) && newBoss.hp > 0 && newMe.spent < cheapestSpent) {
			playAllGames(newMe, newBoss, partTwo, depth + 1);
		}
	}
}

const me = new Player({ hp: 50, mana: 500 }, true);
const boss = new Player(bossStats);

let cheapestSpent = Infinity;

playAllGames(me, boss);
console.log('Part One:', cheapestSpent);

cheapestSpent = Infinity;
playAllGames(me, boss, true);
console.log('Part Two:', cheapestSpent);
