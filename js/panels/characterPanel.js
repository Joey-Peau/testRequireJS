define(['jquery','panels/panel', "progressBar"],function($,panelClass,barClass){

	return class CharPanelClass extends panelClass{

		character;
		healthBar;
		fullPanel;
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

		refreshStatus(){
			this.status = $(this.status).html("Je suis un " + this.character.getType
				+ "<br>Level : " + this.character.level
				+ "<br>Strength : " + this.character.strength
				+ "<br>endurance : " + this.character.endurance
				+ "<br>agility : " + this.character.agility
				+ "<br>wisdom : " + this.character.wisdom
				+ "<br>chance : " + this.character.chance
				+ "<br>AP : " + this.character.getAttackPoints
				+ "<br>DP : " + this.character.getDefensePoints
			);
		}

		buildPanel(){
			this.built = true;
			this.fullPanel = $("<div></div>").addClass("panel")
				.append(this.healthBar.getDiv())
				.append(this.manaBar.getDiv())
				.append(this.status);
		}

		getPanel(){
			this.refreshStatus();
			if(!this.built){
				this.buildPanel();
			}
			return $(this.fullPanel);
		}

	}

});