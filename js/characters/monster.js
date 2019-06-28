define(["jquery","characters/character"],function($,characterClass){


	return class Monster extends characterClass{

		strength 	= Math.random() * 5;
		endurance 	= Math.random() * 4;
		agility 	= Math.random() * 3;
		wisdom		= 0;

		get getType(){
			return "Monster";
		}

		get strength(){
			return Math.random() * 5;
		}

		get endurance(){
			return Math.random() * 4;
		}

		get agility(){
			return Math.random() * 3;
		}

		get wisdom(){
			return 0;
		}

	}

});