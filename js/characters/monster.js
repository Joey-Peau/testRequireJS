define(["jquery","characters/character"],function($,characterClass){


	return class Monster extends characterClass{

		get getType(){
			return "Monster";
		}

	}

});