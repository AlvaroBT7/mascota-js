import colors from 'colors';

const STAT_COLORS = {
  good: 'green',
  medium: 'yellow',
  bad: 'red'
}

const calculateColorByStatValue = (statValue, maxStatValue) => {
  let finalColor;
  if (statValue < Math.floor(maxStatValue * 0.3)) finalColor =  STAT_COLORS.good
  else if (statValue < Math.floor(maxStatValue * 0.7)) finalColor = STAT_COLORS.medium
  else return STAT_COLORS.bad;
  return finalColor;
}

class Game
{
  constructor(pet) 
  {
    this.pet = pet;
    this.runningSpeed = 500;
  }

  _getUserInput(callback)
  {
    process.stdin.on("data", (data) => {
      const userInput = data.toString()[0];
      callback(userInput);
    });
  }

  run(exitKey)
  {
    this._getUserInput((userInput) => {
      if (
        userInput === 'a' &&
        this.pet.variableStats.age-5 > 0
        ) this.pet.variableStats.age -= 5

      else if(
        userInput === 'h' &&
        this.pet.variableStats.health < 100
        ) this.pet.variableStats.health += 1;
    });

    const loop = setInterval(() => {
      console.clear();
      console.log();

      this.pet.updateStats();
    }, this.runningSpeed)
  }
}

class Pet
{
  constructor(name, age, color)
  {
    this.stats = { name, color }
    this._maxStatsValue = 100;
    this._initialStatsValue = 0;
    this.variableStats = (
      {
        health: this._initialStatsValue,
        hunger: this._initialStatsValue,
        happiness: this._initialStatsValue,
        age: this._initialStatsValue,
        _isDeath: Boolean(this._initialStateValue)
      }
    )
    this.states = {
      healthy: "healthy",
      sick: "sick",
      hungry: "hungry",
      notHungry: "notHungry",
      happy: "happy",
      bored: "bored"
    }
  }

  showInterface()
  {
    console.log(`
Static Pet Stats:
Name = ${this.stats.name.blue}
Color = ${this.stats.color.blue}

Variable Pet Stats:
Health = ${this.variableStats.health.toString()[calculateColorByStatValue(this.variableStats.health, this._maxStatsValue)]}
Hunger = ${this.variableStats.hunger.toString()[calculateColorByStatValue(this.variableStats.hunger, this._maxStatsValue)]}
Happiness = ${this.variableStats.happiness.toString()[calculateColorByStatValue(this.variableStats.happiness, this._maxStatsValue)]}
Age = ${this.variableStats.age.toString()[calculateColorByStatValue(this.variableStats.age, this._maxStatsValue)]}
      `.trim())
  }

  updateStats()
  { this.showInterface();
  if (this.variableStats.age > this._maxStatsValue-1) this.variableStats._isDeath = true;
  if (this.variableStats._isDeath) throw `${this.stats.name} is dead !`.red;
  this.variableStats.age++;
  }
}


async function main()
{
  const PET = new Pet("Alfredo", 15, "verde");
  const GAME = new Game(PET);
  GAME.run('q');
  
}

main();