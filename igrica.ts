function randomGenerator() {
  return Math.floor(Math.random() * 100);
}

abstract class Hero {
  name: string;
  type: string;
  weaponBag: any;
  currentWeapon: any;
  health: number;

  constructor(name: string, type: string) {
    this.name = name;
    this.type = type;
    this.weaponBag = [];
    this.currentWeapon;
    if (this instanceof Wizard) {
      this.health = 150;
    } else {
      this.health = 100;
    }
  }

  // stavlja oruzje u ranac
  takeWeapon(weapon: any) {
    // da li moze da koristi
    if (this.type !== weapon.hero) {
      throw new Error("you cant use this weapon!");
    }

    // da li ima mesta
    if (this.weaponBag.length >= 2) {
      throw new Error("There is not enough room in bag!");
    }

    this.weaponBag.push(weapon);
  }

  // baca oruzje iz ranca
  removeWeapon(type: string) {
    this.weaponBag = this.weaponBag.filter((item: any) => item.type !== type);
  }

  // trenutno oruzje
  setCurrentWeapon() {
    if (this.weaponBag <= 0) {
      throw new Error("You have no weapons, take weapon!");
    }
    this.currentWeapon = this.weaponBag[0];
  }
}

//-------------------------------------------------------------------------------------------------

class Warrior extends Hero {
  type: string;

  constructor(name: string, type: string, health: any) {
    super(name, health);
    this.type = type;
  }
}

//------------------------------------------------------------------------------------------------

class Wizard extends Hero {
  type: string;

  constructor(name: string, type: string, health: any) {
    super(name, health);
    this.type = type;
  }
}

//------------------------------------------------------------------------------------------------

abstract class Monster {
  name: string;
  melee: any;
  health: number;
  specialPower: any;
  currentAttack: any;

  constructor(name: string, melee: {}, health: number, specialPower: {}) {
    this.name = name;
    this.melee = melee;
    this.health = health;
    this.specialPower = specialPower;
    this.currentAttack;
  }

  setAttack() {
    if (randomGenerator() >= 50) {
      this.currentAttack = this.specialPower;
    } else {
      this.currentAttack = this.melee;
    }
  }
}

//------------------------------------------------------------------------------------------------

class Dragon extends Monster {
  melee: any;
  specialPower: any;

  constructor(name: string, melee: any, health: number, specialPower: any) {
    super(name, melee, health, specialPower);
    this.melee = {
      type: "hit",
      damage: 5,
    };
    this.specialPower = {
      type: "fire",
      damage: 20,
    };
  }
}

//-------------------------------------------------------------------------------------------------

class Spider extends Monster {
  melee: any;
  specialPower: any;

  constructor(name: string, melee: any, health: number, specialPower: any) {
    super(name, melee, health, specialPower);
    this.melee = {
      type: "hit",
      damage: 5,
    };
    this.specialPower = {
      type: "venom",
      damage: 8,
    };
  }
}

//--------------------------------------------------------------------------------------------------

class Weapon {
  type: string;
  hero: string;
  damage: number;

  constructor(type: string, hero: string) {
    this.type = type;
    this.hero = hero;
    if (this.type == "sword") {
      this.damage = 10;
    } else if (this.type == "spear") {
      this.damage = 15;
    } else {
      this.damage = 20;
    }
  }
}

//--------------------------------------------------------------------------------------------------

class Battle {
  hero: any;
  monster: any;
  winner: any;

  constructor(hero: Hero, monster: Monster) {
    this.hero = hero;
    this.monster = monster;
    this.winner;
  }

  fight() {
    while (this.hero.health > 0 && this.monster.health > 0) {
      if (randomGenerator() > 50) {
        console.log(
          `${this.monster.name} attacks ${this.hero.name} with ${this.monster.currentAttack.type}`
        );
        this.hero.health -= this.monster.currentAttack.damage;
      } else {
        this.monster.health -= this.hero.currentWeapon.damage;
        console.log(
          `${this.hero.name} attacks ${this.monster.name} with ${this.hero.currentWeapon.type}`
        );
      }
    }
    this.hero.health > 0
      ? this.setWinner(this.hero.name)
      : this.setWinner(this.monster.name);
  }
  setWinner(winner: any) {
    this.winner = winner;
    console.log(
      `${this.winner} is the winner of the duel with ${
        this.monster.health <= 0 ? this.monster.name : this.hero.name
      }`
    );
  }
}

//-----------------------------------------------------------------------------------------------

const wizard = new Wizard("Gandalf", "wizard", Hero);
const warrior = new Warrior("Strider", "warrior", Hero);

const dragon = new Dragon("Smaug", Monster, 250, Monster);
const spider = new Spider("Shelob", Monster, 200, Monster);

const sword = new Weapon("sword", "warrior");
const spear = new Weapon("spear", "warrior");
const spell = new Weapon("spell", "wizard");

warrior.takeWeapon(sword);
warrior.takeWeapon(spear);
warrior.removeWeapon("spear");
warrior.setCurrentWeapon();
wizard.takeWeapon(spell);

dragon.setAttack();
spider.setAttack();

console.log(warrior);
console.log(wizard);
console.log(dragon);
console.log(spider);

const battle = new Battle(warrior, dragon);
battle.fight();
