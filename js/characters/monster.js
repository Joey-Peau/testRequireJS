define(["jquery","characters/enemy"],function($,enemyClass){


	return class Monster extends enemyClass{


		get getType(){
			return "Monster";
		}

		initVar(){
			this.strength 	= parseInt(Math.random() * (5 + this.level));
			this.endurance 	= parseInt(Math.random() * (4 + this.level));
			this.agility 	= parseInt(Math.random() * (3 + this.level));
			this.wisdom		= parseInt(Math.random() * (0 + this.level));
			this.chance		= parseInt(Math.random() * (1 + this.level));
		}

	}

});