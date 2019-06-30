define(["jquery","characters/character"],function($,characterClass){


	return class Enemy extends characterClass{

		constructor(level){
			super(level);

			if(this.constructor === Enemy){
      			throw new TypeError('Abstract class "Enemy" cannot be instantiated directly');
			}
		}

		get getExpGiven(){
			let baseExpGiven = (1 + Math.random() * this.level) * (this.strength + this.endurance + this.agility + this.wisdom);

			if(this.isDead){
				baseExpGiven *= (1 + Math.random());
			}

			return baseExpGiven;
		}

	}

});