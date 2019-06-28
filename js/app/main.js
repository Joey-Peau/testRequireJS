define(["jquery","characters/hero","characters/monster"], function($,heroClass, characterClass) {
	hero = new heroClass();
	character = new characterClass();


	console.log(typeof(heroClass));

	console.log(hero.print());
	console.log(character.print());
});
