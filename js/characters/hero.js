define(["jquery","characters/character"],function($,characterClass){


	return class Hero extends characterClass{


		constructor(level){
			super(level);

			this.isKillable = true;

			this.experiencePoints = 0;

			this.baseMaxExp = 1000;
			this.nextExpCap = this.baseMaxExp;

			this.resetLP();

			this.emitter.defineEvents(["chanceExp","experience","levelUp"]);
		}

		get getExp(){
			return this.experiencePoints;
		}

		initVar(){
			this.strength 	= 5;
			this.endurance 	= 5;
			this.agility 	= 5;
			this.wisdom 	= 5;
			this.chance 	= 5;
		}

		get getType(){
			return "Hero";
		}

		get getNextExpCap(){
			return this.nextExpCap;
		}

		addExperiencePoints(exp){
			if(this.getChance >= Math.random() * 100){
				exp *= (1 + this.getChance / 100);
				this.triggerEvent("chanceExp",{value: exp});
			}

			this.experiencePoints += exp;



			if(this.experiencePoints >= this.getNextExpCap){
				this.experiencePoints -= this.getNextExpCap;
				this.levelUp();
				this.resetExpCap();

				this.initMaxLP();
				this.resetLP();
			}

			this.triggerEvent("experience",{value: exp});

			this.triggerEvent("refresh");
		}

		resetExpCap(){
			//TODO next exp cap function
			let nextExpCap = this.getLevel * 1000;

			this.nextExpCap = nextExpCap;
		}

		levelUp(){
			this.level++;
			this.chooseUpgrade();

			this.resetExpCap();

			this.triggerEvent("levelUp",{value: this.level})

			this.triggerEvent("refresh");
		}

		chooseUpgrade(){
			let attributeSelected = "all";
			//TODO algorithm to choose upgrade

			this.upgradeAttribute(attributeSelected);
		}

		upgradeAttribute(attribute){
			switch(attribute){
				case "strength":
					this.strength++;
					break;
				case "endurance":
					this.endurance++;
					break;
				case "agility":
					this.agility++;
					break;
				case "wisdom":
					this.wisdom++;
					break;
				case "chance":
					this.chance++;
					break;
				case "all":
					this.strength++;
					this.endurance++;
					this.agility++;
					this.wisdom++;
					this.chance++;
					break;

			}
		}

	}

});