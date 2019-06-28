define(["jquery"],function($){

	return class Character{


		constructor(){
			if (this.constructor === Character){
      			throw new TypeError('Abstract class "Character" cannot be instantiated directly');
			}

			if(this.getType === undefined){
				throw new TypeError('"getType" getter must be implemented');
			}

			this.level = 1;
			
			this.baseLP = 100;
			this.MaxLP 	= 100;
			this.LP 	= 100;

			this.isKillable = true;

			this.baseAttackPoints 	= 100;
			this.baseDefensePoints 	= 100;

			this.strength 	= 0;
			this.endurance 	= 0;
			this.agility 	= 0;

		}


		attackedBy(character){

			let lpToRemove;

			lpToRemove = character.getAttackPoints - this.getDefensePoints;

			if(lpToRemove < 0){
				lpToRemove = 0;
			}

			this.LP -= lpToRemove;

			if(this.LP <= 0 && !this.isKillable){
				this.LP = 1;
			}

		}

		get getAttackPoints(){
			return this.baseAttackPoints * this.level * (1 + Math.random() * this.strength) / 100;
		}
		get getDefensePoints(){
			return this.baseDefensePoints * this.level * (1 + Math.random() * this.agility) / 100;
		}

		get getLevel(){
			return this.level;
		}

		get getLP(){
			return this.LP;
		}

		get getMaxLP(){
			return this.LP * this.level * (1 + Math.random() * this.endurance);
		}

		isDead(){
			return this.isKillable && this.LP <= 0;
		}

		print(){
			return "Je suis un " + this.getType;
		}



	}

});