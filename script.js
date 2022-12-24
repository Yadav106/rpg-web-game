let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [
    {
        name: "stick",
        power: 5
    },
    {
        name: "dagger",
        power: 30
    },
    {
        name: "claw hammer",
        power: 50
    },
    {
        name: "sword",
        power: 100
    }
];

const locations = [
    {
        name: "town square",
        "button text": ["Go To Store", "Go To Cave", "Fight Dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in Town Square. You see a sign that says \"Store\""
    },
    {
        name: "store",
        "button text": ["Buy 10 health(10 gold)", "Buy Weapon(30 gold)", "Go to Town Square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You entered the Store"
    },
    {
        name: "cave",
        "button text": ["Fight Slime", "Fight Fanged Beast", "Go to Town Square"],
        "button functions": [fightSlime, fightFanged, goTown],
        text: "You entered the Cave, you see two monsters!"
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Go to Town"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting the monster!"
    },
    {
        name: "kill monster",
        "button text": ["Go to Town", "Go to Town", "Go to Town"],
        "button functions": [goTown, goTown, goTown],
        text: 'The monster screams "Arg!" As you kill the monster, you gain experience and find gold!'
    },
    {
        name: "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You Died 💀"
    }
];

const monsters = [
    {
        name: "slime",
        level: 2,
        health: 15
    },
    {
        name: "fanged beast",
        level: 8,
        health: 60
    },
    {
        name: "dragon",
        level: 20,
        health: 300
    }
];

// initialise buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location){
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];

    text.innerText = location.text;

    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
}

function goTown() {
    update(locations[0]);
}

function goStore() {
    update(locations[1]);
}

function goCave() {
    update(locations[2]);
}

function buyHealth(){
    if (gold>=10){
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    }
    else {
        text.innerText = "You do not have enough gold to buy health :(";
    }
}

function buyWeapon(){
    if(currentWeapon < weapons.length - 1){
        if(gold>=30){
            gold -= 30;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "You now have a " + newWeapon + '!';
            inventory.push(newWeapon);
            text.innerText += " In your inventory, you have: " + inventory;
        }
        else{
            text.innerText = "You do not have enough gold to buy a new weapon :("
        }
    }
    else{
        text.innerText = "You already have the most powerful weapon!";
        button2.innerText = "Sell Weapon for 15 Gold";
        button2.onclick = sellWeapon;
    }
}

function sellWeapon(){
    if(inventory.length > 1){
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "You sold a " + currentWeapon + '.';
        text.innerText += " In your inventory you have " + inventory;
    }else{
        text.innerText = "Don't sell your only weapon";
    }
}

function fightSlime() {
    fighting = 0;
    goFight();
}

function fightFanged() {
    fighting = 1;
    goFight();
}

function fightDragon(){
    fighting = 2;
    goFight();
}

function goFight(){
    update(locations[3]);
    monsterHealth = monsters[fighting]['health'];
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting]['name'];
    monsterHealthText.innerText = monsterHealth;
}

function attack() {
    text.innerText = "The " + monsters[fighting].name + " attacks.\n";
    text.innerText += "You attack with " + weapons[currentWeapon].name + ".\n";
    health -= monsters[fighting].level;
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if(health <= 0){
        lose();
    }
    else if (monsterHealth <= 0){
        if(fighting === 2){
            monsterHealth = 0;
            monsterHealthText.innerText = 0;
            winGame();
        } else{
            monsterHealth = 0;
            monsterHealthText.innerText = 0;
            defeatMonster();
        }
    }
}

function dodge() {
    text.innerText = "You dodged the attack from " + monsters[fighting].name;
}

function lose(){
    update(locations[5]);
}

function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;

    goldText.innerText = gold;
    xpText.innerHTML = xp;
    update(locations[4]);
}

function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ['stick'];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}

function winGame() {
    text.innerText = "You won! You saved the town from the dragon!";
}