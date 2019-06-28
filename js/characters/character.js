define(["jquery"],function($){

	return class Character{


		constructor(){
			if (this.constructor === Character){
      			throw new TypeError('Abstract class "Character" cannot be instantiated directly');
			}

			if(this.getType === undefined){
				throw new TypeError('"getType" getter must be implemented');
			}

			if(this.triggerRefresh === undefined){
				throw new TypeError('"triggerRefresh" getter must be implemented');
			}

			if(this.strength === undefined){
				throw new TypeError('"triggerRefresh" getter must be implemented');
			}

			if(this.endurance === undefined){
				throw new TypeError('"triggerRefresh" getter must be implemented');
			}

			if(this.agility === undefined){
				throw new TypeError('"triggerRefresh" getter must be implemented');
			}

			if(this.wisdom === undefined){
				throw new TypeError('"triggerRefresh" getter must be implemented');
			}

			this.level = 1;

			this.isKillable = true;

			this.baseLP 			= 100;
			this.baseAttackPoints 	= 100;
			this.baseDefensePoints 	= 100;
			/** 10% of base Life Points **/
			this.baseHealingPoints 	= 10;

			this.initMaxLP();

			this.resetLP();

		}

		initMaxLP(){
			this.maxLP = this.baseLP * this.level * (1 + Math.random() * this.endurance);
		}


		attackedBy(character){

			let lpToRemove;

			lpToRemove = character.getAttackPoints - this.getDefensePoints;

			if(lpToRemove < 0){
				lpToRemove = 0;
			}

			this.LP -= parseInt(lpToRemove);

			if(this.LP <= 0 && !this.isKillable){
				this.LP = 1;
			}

			this.triggerRefresh();

		}

		resetLP(){
			this.LP = this.getMaxLP;
		}

		heal(){
			lpRestored = this.getHealingPoints;
			this.LP += lpRestored;

			if(this.LP > this.getMaxLP){
				this.LP = this.getMaxLP;
			}

			this.triggerRefresh();
		}

		get getHealingPoints(){
			let $finalValue = this.baseHealingPoints * this.level * (1 + Math.random() * this.strength) / 100;
			return parseInt($finalValue);
		}

		get getAttackPoints(){
			return this.baseAttackPoints * this.level * (1 + Math.random() * this.strength) / 100;
		}
		get getDefensePoints(){
			return this.baseDefensePoints * this.level * (1 + Math.random() * this.agility) / 100;
		}

		get getMaxLP(){
			return parseInt(this.maxLP);
		}

		get getLevel(){
			return this.level;
		}

		get getLP(){
			return this.LP;
		}

		isDead(){
			return this.isKillable && this.LP <= 0;
		}

		print(){
			return "Je suis un " + this.getType + "\n" + this.getLP + "/" + this.getMaxLP + " LP\n" + this.getAttackPoints + " AP\n" + this.getDefensePoints + " DP";
		}

		triggerRefresh(){

		}



	}

});