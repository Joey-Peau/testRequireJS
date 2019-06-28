define(["jquery","characters/character"],function($,characterClass){


	return class Hero extends characterClass{

		get getType(){
			return "Hero";
		}

	}

});