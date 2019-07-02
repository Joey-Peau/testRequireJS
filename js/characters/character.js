define(["jquery","progressBar","eventEmitter"],function($,progressBarClass,eventEmitter){

	return class Character{
		emitter;

		constructor(level){
			this.emitter = new eventEmitter();
			if (this.constructor === Character){
      			throw new TypeError('Abstract class "Character" cannot be instantiated directly');
			}

			if(this.getType === undefined){
				throw new TypeError('"getType" getter must be implemented');
			}

			this.level = 1;
			if(typeof(level) !== "integer"){
				this.level = level;
			}


			this.initVar();

			if(this.strength === undefined){
				this.strength = 0;
			}

			if(this.endurance === undefined){
				this.endruance = 0;
			}

			if(this.agility === undefined){
				this.agility = 0;
			}

			if(this.wisdom === undefined){
				this.wisdom = 0;
			}

			if(this.chance === undefined){
				this.chance = 0;
			}


			this.isKillable = true;

			this.baseLP 			= 100;
			this.baseMP 			= 100;
			this.baseAttackPoints 	= 100;
			this.baseDefensePoints 	= 100;
			/** 1% of base Life Points **/
			this.baseHealingPoints 	= 10;

			this.initMaxLP();
			this.resetLP();

			this.initMaxMP();
			this.resetMP();

			this.emitter.defineEvents(["miss","critical","attack","dead","refresh","outOfMana","healed"]);


		}

		get getStrength(){
			return this.strength ;
		}

		get getEndurance(){
			return this.endurance;
		}

		get getAgility(){
			return this.agility;
		}

		get getWisdom(){
			return this.wisdom;
		}

		get getChance(){
			return this.chance;
		}

		initMaxLP(){
			this.maxLP = this.baseLP * (this.getLevel + Math.random()) * (this.getEndurance + 1);
		}

		initMaxMP(){
			this.maxMP = this.baseMP + (this.getLevel + Math.random() * (this.getWisdom + 1));
		}


		attackedBy(character){

			let lpToRemove;

			lpToRemove = character.getAttackPoints - this.getDefensePoints;

			if(lpToRemove < 0){
				lpToRemove = character.getAttackPoints * 0.1;
				this.triggerEvent("miss",{attacker : character, attackee : this, value : lpToRemove});
			}

			if(character.getChance >= Math.random() * 100){
				lpToRemove *= 2;
				this.triggerEvent("critical",{attacker : character, attackee : this, value : lpToRemove});
			}
			this.triggerEvent("attack",{attacker : character, attackee : this, value : lpToRemove} );

			this.LP -= lpToRemove;

			if(this.LP <= 0){
				if(!this.isKillable){
					this.LP = 1;
				}else{
					this.LP = 0;
					this.triggerEvent("dead");
				}
			}

			this.triggerEvent("refresh");

		}

		resetLP(){
			this.LP = this.getMaxLP;
		}

		resetMP(){
			this.MP = this.getMaxMP;
		}

		heal(){
			let manaUsed = 1 + Math.random() * (1 + this.getLevel) / (1 + this.getWisdom);


			if(this.getMP - manaUsed < 0){
				this.triggered("outOfMana",{manaUsed : manaUsed, MP : this.getMP});
			}else{
				this.MP -= manaUsed;

				let lpRestored = this.getHealingPoints;
				this.LP += lpRestored;

				if(this.LP > this.getMaxLP){
					this.LP = this.getMaxLP;
				}
				
				this.triggerEvent("healed",{manaUsed : manaUsed, value : lpRestored });
			}

			this.triggerEvent("refresh");
		}

		get getHealingPoints(){
			let $finalValue = this.baseHealingPoints * this.getLevel * (10 + Math.random() * this.getWisdom);
			return $finalValue;
		}

		get getAttackPoints(){
			return this.baseAttackPoints * this.getLevel * (1 + Math.random() * this.getStrength);
		}
		get getDefensePoints(){
			return this.baseDefensePoints * this.getLevel * (1 + Math.random() * this.getAgility);
		}

		get getMaxLP(){
			return parseInt(this.maxLP);
		}

		get getMaxMP(){
			return parseInt(this.maxMP);
		}

		get getLevel(){
			return parseInt(this.level);
		}

		get getLP(){
			return this.LP <=0 ? 0 : parseInt(this.LP);
		}

		get getMP(){
			return this.MP <=0 ? 0 : parseInt(this.MP);
		}

		isDead(){
			return this.isKillable && this.getLP <= 0;
		}

		print(){
			console.log("Je suis un " + this.getType + "\n" + this.getLP + "/" + this.getMaxLP + " LP\n" + this.getAttackPoints + " AP\n" + this.getDefensePoints + " DP");
		}

		initVar(){
			this.strength 	= 0;
			this.endurance 	= 0;
			this.agility 	= 0;
			this.wisdom		= 0;
		}

		triggerEvent(eventToTrigger,data){
			this.emitter.emit(eventToTrigger,data);
		}



	}

});