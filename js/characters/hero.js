define(["jquery","characters/character"],function($,characterClass){


	return class Hero extends characterClass{

		constructor(){
			super();

			this.resetLP();
		}

		get getType(){
			return "Hero";
		}

		get strength(){
			return 0;
		}

		get endurance(){
			return 0;
		}

		get agility(){
			return 0;
		}

		get wisdom(){
			return 0;
		}

	}

});