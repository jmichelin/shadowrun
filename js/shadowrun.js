/*
Help Shadowrun not be so slow!
*/

function calcAttackerDicePool() {
  //alert(document.querySelector('#attackerDicePoolBadge').textContent);
  //agility + weapon skill + smartLinkBonus + - woundModifier - if (recoilModifier > 0)
  //document.querySelector('#number3MadLibReplace').textContent = document.getElementById("number3").value;
  var attackerDicePool = 0;
  var agility = parseInt(document.getElementById("agility").value);
  if (agility) {
    attackerDicePool = agility;
  }
  //alert(agility + " " + typeof(agility));
  //attackerDicePool = agility;

  var weaponSkill = parseInt(document.getElementById("weaponSkill").value);
  if (weaponSkill) {
    attackerDicePool = attackerDicePool + weaponSkill;
  }
  //alert(weaponSkill + " " + typeof(weaponSkill));

  var smartLinkBonus = parseInt(document.getElementById("smartLinkBonus").value);
  if (smartLinkBonus) {
      //alert("smartLinkBonus" + smartLinkBonus);
    attackerDicePool = attackerDicePool + smartLinkBonus;
  }
  var woundModifier = parseInt(document.getElementById("woundModifier").value);
  if (woundModifier) {
    attackerDicePool = attackerDicePool - woundModifier;
  }
  var recoilModifier = parseInt(document.getElementById("recoilModifier").value);
  if (Number.isInteger(recoilModifier)) {
    attackerDicePool = attackerDicePool - recoilModifier;
  }
  var additionalBonus = parseInt(document.getElementById("additionalBonus").value);
  if (additionalBonus) {
    attackerDicePool = attackerDicePool + additionalBonus;
  }
  //attackerDicePool = agility + weaponSkill;// + weaponSkill;// + smartLinkBonus - woundModifier;
  /**/
  document.querySelector('#attackerDicePoolBadge').textContent = attackerDicePool;
  document.getElementById("attackerDicePoolHidden").value = attackerDicePool;
}

function calcDamageValue() {
  var attackerDamageValue = 0;
  var weaponDamageValue = parseInt(document.getElementById("weaponDamageValue").value);
  if (weaponDamageValue) {
    attackerDamageValue = weaponDamageValue;
  }
  //alert(weaponDamageValue + " " + typeof(weaponDamageValue));
  //attackerDamageValue = weaponDamageValue;
  var ammoDamageValue = parseInt(document.getElementById("ammoDamageValue").value);
  if (ammoDamageValue) {
    attackerDamageValue = attackerDamageValue + ammoDamageValue;
  }
  var attackersHits = parseInt(document.getElementById("attackersHits").value);
  if (attackersHits) {
    attackerDamageValue = attackerDamageValue + attackersHits;
  }
  var defendersHits = parseInt(document.getElementById("defendersHits").value);
  if (defendersHits) {
    attackerDamageValue = attackerDamageValue - defendersHits;
  }
  //document.querySelector('#modifiedDV').textContent = attackerDamageValue;
  document.getElementById("modifiedDV").value = attackerDamageValue;
  calcFinalDamageValue();
}
////////////////////////
//Calculate Modified Defenders Armor
////////////////////////
function calcModifiedDefendersArmor() {
  var modifiedDefendersArmor = 0;
  //alert("type of: " + typeof(document.getElementById("weaponAPValue").value) + " value: " +document.getElementById("weaponAPValue").value);
  //alert("type of: " + typeof(parseInt(document.getElementById("weaponAPValue").value)) + " value: " +document.getElementById("weaponAPValue").value);
  var weaponAPValue = parseInt(document.getElementById("weaponAPValue").value);
  var weaponAPModifier = 0;
  if(weaponAPValue > 0) {
    weaponAPModifier = weaponAPValue;
    //alert("type of: " + typeof(weaponAPModifier) + " value: " + weaponAPModifier);
    //alert("type of: " + typeof(parseInt(modifiedDefendersArmor)) + " value: " +modifiedDefendersArmor);
  }
  ammoAPValue = parseInt(document.getElementById("ammoAPValue").value);
  ammoAPModifier = 0;
  if (ammoAPValue > 0) {
    //alert("ammo ap "+ document.getElementById("ammoAPValue").value);
    ammoAPModifier = parseInt(document.getElementById("ammoAPValue").value);
    //alert("ammoAPModifier " + typeof(ammoAPModifier) + "value: " + ammoAPModifier)
  }
  defendersArmor = parseInt(document.getElementById("defendersArmor").value);
  if (defendersArmor > 0) {
    //alert("ammo ap "+ document.getElementById("defendersArmor").value);
    defendersArmor = parseInt(document.getElementById("defendersArmor").value);
    //alert("ammoAPModifier " + typeof(ammoAPModifier) + "value: " + ammoAPModifier)
  } else {
    defendersArmor = 0;
  }
  document.getElementById("modifiedDefendersArmor").value = defendersArmor - (weaponAPModifier + ammoAPModifier);
  calcDefenderDamageTaken();
}

function setNumberOfRounds() {
  var numberOfRounds = 1;
  fireMode = document.getElementById("fireMode").value;
  switch (fireMode) {
    case "fullAutoFull":
    numberOfRounds = 10;
    break;
    case "fullAutoLong":
    numberOfRounds = 6;
    break;
    case "burstFire":
    numberOfRounds = 3;
    break;
    case "semiAuto":
    numberOfRounds = 1;
    break;
    default:
    numberOfRounds = 1;

  }
  document.getElementById("numOfRounds").value = numberOfRounds;
  calcRecoilModifier();
}

function toggleFireMode() {
  //alert("fireModeWidthFlag" + document.getElementById("fireModeWidthFlag").value);
  //alert("fireMode" + document.getElementById("fireMode").value)
  if (document.getElementById("fireModeWidthFlag").value === "notset") { //if empty value set initial value and initial fireMode modifier (DV vs armor mod)
    //alert("fireModeWidthFlag if " + document.getElementById("fireModeWidthFlag").value);
    //alert(document.getElementById("fireModeWidth").value);
    if (document.getElementById("fireModeWidth").value === "wide") {
      //alert(document.querySelector("#defenderDicePoolModifier").textContent);
      var defenderDicePoolModifier = -2;
      //alert("should be -2 " + defenderDicePoolModifier);
      if (document.querySelector("#defenderDicePoolModifier").textContent === "") {
        defenderDicePoolModifier = parseInt(document.querySelector("#defenderDicePoolModifier").textContent) + defenderDicePoolModifier;
        alert("inside the if" + defenderDicePoolModifier);
      }
      document.querySelector("#defenderDicePoolModifier").textContent = defenderDicePoolModifier;
      document.getElementById("fireModeWidthFlag").value = "set";
    } else { //narrow
      var modifiedDamageValueModifier = document.getElementById("numOfRounds").value - 1;
      //alert(modifiedDamageValueModifier);
      var modifiedDamageValueModifier = parseInt(document.getElementById("modifiedDV").value) + modifiedDamageValueModifier;
      //alert(modifiedDamageValueModifier);
      document.getElementById("modifiedDV").value = modifiedDamageValueModifier;
      document.getElementById("fireModeWidthFlag").value = "set";
    }
    //alert("fireModeWidthFlag if " + document.getElementById("fireModeWidthFlag").value);
  } else if (document.getElementById("fireModeWidthFlag").value === "set"){ //check value and toggle width modifiers
    //alert("fireModeWidthFlag else " + document.getElementById("fireModeWidthFlag").value);
    if (document.getElementById("fireModeWidth").value === "wide") {
      //alert(document.querySelector("#defenderDicePoolModifier").textContent);
      //toggle old value
      document.getElementById("modifiedDV").value = document.getElementById("modifiedDV").value - (document.getElementById("numOfRounds").value -1);
      //alert(document.querySelector("#defenderDicePoolModifier").textContent);
      var defenderDicePoolModifier = -2;
      //alert("should be -2 " + defenderDicePoolModifier);
      if (document.querySelector("#defenderDicePoolModifier").textContent === "") {
        defenderDicePoolModifier = parseInt(document.querySelector("#defenderDicePoolModifier").textContent) + defenderDicePoolModifier;
        alert("inside the if" + defenderDicePoolModifier);
      }
      document.querySelector("#defenderDicePoolModifier").textContent = defenderDicePoolModifier;
    } else { //narrow
      var defenderDicePoolModifier = 2;
      //alert("should be 2 " + defenderDicePoolModifier);
      document.querySelector("#defenderDicePoolModifier").textContent = parseInt(document.querySelector("#defenderDicePoolModifier").textContent) + defenderDicePoolModifier;
      //modify damage
      var modifiedDamageValueModifier = document.getElementById("numOfRounds").value - 1;
      //alert(modifiedDamageValueModifier);
      var modifiedDamageValueModifier = parseInt(document.getElementById("modifiedDV").value) + modifiedDamageValueModifier;
      //alert(modifiedDamageValueModifier);
      document.getElementById("modifiedDV").value = modifiedDamageValueModifier;
      document.getElementById("fireModeWidthFlag").value = "set";
    }
  }
}
////////////////////////////////
// Recoil Modifer Calculator
////////////////////////////////
function calcRecoilModifier() {
  var currentNumOfBullets = parseInt(document.getElementById("numOfRounds").value);
  var currentRecoilCompensation = parseInt(document.getElementById("recoilCompensation").value);
  var weaponTypeModifier = document.getElementById("weaponTypeModifier").value;
  //var fireMode = document.getElementById("fireMode").value;
  var recoilModifier = "0";
  recoilModifier = currentRecoilCompensation - (currentNumOfBullets - 1);
  //alert(weaponTypeModifier);
  if (weaponTypeModifier === "heavy" || (weaponTypeModifier === "shotgun" && currentNumOfBullets >= 3)) {
    recoilModifier *= 2;
  }
  // if (recoilModifier != NaN) {
  //   alert("Inside If Type of recoilModifier : " + typeof(recoilModifier) + " \nvalue recoilModifier: " + recoilModifier);
  //
  //   document.getElementById("recoilModifier").value = recoilModifier;
  // }
  document.getElementById("recoilModifier").value = recoilModifier;
  calcAttackerDicePool();
  //alert("Type of recoilModifier : " + typeof(recoilModifier) + " \nvalue recoilModifier: " + recoilModifier);

}
////////////////////////////
// random number
// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
///////////////////////////
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
/////////////////////////////
// dice roller
// document.querySelector("#attackerDiceRoll").innerHTML;
/////////////////////////////
function rollDice(num1, owner) {
  diceResult = 0;
  numOfHits = 0;
  resultsLog = "";
  for (i=0; i < num1; i++) {
    diceResult = getRandomIntInclusive(1,6);
    if (diceResult === 6) {
      numOfHits++;
      resultsLog += "<span class=\"hitSuccess icon-diesix\">" + diceResult + "</span>&nbsp;";
    } else if (diceResult === 5) {
      numOfHits++;
      resultsLog += "<span class=\"hitSuccess icon-diefive\">" + diceResult + "</span>&nbsp;";
    } else if (diceResult === 4)  {
      resultsLog += "<span class=\"hitFail icon-diefour\">" + diceResult + "</span>&nbsp;";
    } else if (diceResult === 3)  {
      resultsLog += "<span class=\"hitFail icon-diethree\">" + diceResult + "</span>&nbsp;";
    } else if (diceResult === 2)  {
      resultsLog += "<span class=\"hitFail icon-dietwo\">" + diceResult + "</span>&nbsp;";
    } else if (diceResult === 1)  {
      resultsLog += "<span class=\"hitFail icon-dieone\">" + diceResult + "</span>&nbsp;";
    }
  }
  if (owner === "attacker") {
    document.querySelector("#attackerDiceRoll").innerHTML = resultsLog;
    document.getElementById("attackersHits").value = numOfHits;
  } else if (owner === "defender") {
    document.querySelector("#defenderDiceRoll").innerHTML = resultsLog;
    document.getElementById("defenderHits").value = numOfHits;
  }
  //;
  //return numOfHits;
}
/////////////////////////
//roll attackers dice
///////////////////////
function rollAttackerDice() {
  var numOfDice = 0;
  numOfDice = parseInt(document.getElementById("attackerDicePoolHidden").value);
  rollDice(numOfDice, "attacker");
  calcDamageValue();
}
/////////////////////////
//roll defenders dice
///////////////////////
function rollDefendersDice() {
  var numOfDice = 0;
  numOfDice = parseInt(document.getElementById("defenderDicePoolHidden").value);
  rollDice(numOfDice, "defender");
  calcDamageValue();
}
/////////////////////////
//calc final damage value
//////////////////////////
function calcFinalDamageValue () {
  modifiedDV = parseInt(document.getElementById("modifiedDV").value);
  numOfRounds = parseInt(document.getElementById("numOfRounds").value);
  document.getElementById("finalDV").value = modifiedDV + (numOfRounds - 1);
  calcDefenderDamageTaken();
}
/////////////////////////////
//calc defender damage taken
/////////////////////////////
function calcDefenderDamageTaken () {
  finalDV = parseInt(document.getElementById("finalDV").value);
  modifiedDefendersArmor = parseInt(document.getElementById("modifiedDefendersArmor").value);
  var damageCalc = (modifiedDefendersArmor - finalDV) * -1;
  if(_.isNaN(damageCalc) || damageCalc <= 0){
      damageCalc = 0;
  }
  document.getElementById("defenderDamageTaken").value = damageCalc ;
}
//////////////
//Tool Tips!
//////////////
$("#defenderSoakDP").tooltip({
	content: "Body + Armor - Attacker AP"
	});
