define(['jquery','panels/panel', "progressBar"],function($,panelClass,barClass){

	return class CharPanelClass extends panelClass{

		character;
		healthBar;
		fullPanel;

		divDescription;
		divLevel;
		divStrength;
		divEndurance;
		divAgility;
		divWisdom;
		divChance;
		divAP;
		divDP;

		_self = this;

		constructor(character){
			super();

			let _self = this;

			this.built = false;



			this.character = character;

			this.healthBar = new barClass(this.character.getLP,this.character.getMaxLP,"red");
			this.manaBar = new barClass(this.character.getMP,this.character.getMaxMP,"green");

			this.status = $("<div></div>").addClass("status");

			this.refreshCharacter();

		}

		refreshCharacter(){
			let _self = this;

			this.healthBar.resetBar(this.character.getLP,this.character.getMaxLP,"red");
			this.healthBar.refresh();

			this.manaBar.resetBar(this.character.getMP,this.character.getMaxMP,"green");
			this.manaBar.refresh();
			this.refreshStatus();

			this.character.emitter.on("refresh",function(event){
				//health bar
				_self.healthBar.newValue = _self.character.getLP;
				_self.healthBar.newMax = _self.character.getMaxLP;

				_self.healthBar.refresh();

				//Mana bar
				_self.manaBar.newValue = _self.character.getMP;
				_self.manaBar.newMax = _self.character.getMaxMP;

				_self.manaBar.refresh();

				_self.refreshStatus();
			});
		}

		changeCharacter(newCharacter){
			this.character.emitter.removeAllListeners();

			this.character = newCharacter;

			this.refreshCharacter();
		}

		buildHelpPopover($title,$content){
			return $("<button></button>").addClass("btn btn-secondary").attr({
				"type" : "button",
				"title": $title,
				"data-content": $content,
			}).popover({
				"trigger" : "focus",
			});
		}

		refreshStatus(){
			this.divDescription = $("<div></div>").text("Je suis un " + this.character.getType);
			this.divLevel 		= this.buildHelpPopover("level","Character level").text("Level : " + this.character.level);
			this.divStrength 	= this.buildHelpPopover("Strength","Strength affects attack").text("Strength : " + this.character.strength);
			this.divEndurance 	= this.buildHelpPopover("Endurance","Endurance affects Life Points").text("Endurance : " + this.character.endurance);
			this.divAgility 	= this.buildHelpPopover("Agility","Agility affects defense").text("Agility : " + this.character.agility);
			this.divWisdom 		= this.buildHelpPopover("Wisdom","Wisdom affects Mana Points").text("Wisdom : " + this.character.wisdom);
			this.divChance 		= this.buildHelpPopover("Chance","Chance affects Mana Points").text("Chance : " + this.character.chance);
			this.divAP 			= $("<div></div>").text("AP : " + this.character.getAttackPoints);
			this.divDP 			= $("<div></div>").text("DP : " + this.character.getDefensePoints);
		}

		buildPanel(){
			this.built = true;
			this.status = $(this.status).append(this.divDescription,this.divLevel,this.divStrength,this.divEndurance,this.divAgility,this.divWisdom,this.divChance,this.divAP,this.divDP);
			this.fullPanel = $("<div></div>").addClass("panel")
				.append(this.healthBar.getDiv())
				.append(this.manaBar.getDiv())
				.append(this.status);

		}

		getPanel(){
			this.refreshStatus();
			return super.getPanel();
		}

	}

});