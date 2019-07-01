define(
	["jquery","characters/hero","characters/monster","panels/heroPanel",'panels/ennemiPanel','panels/actionPanel','panels/HistoPanel'], 
	function($,heroClass, monsterClass,heroPanelClass, ennemiPanelClass,actionPanelClass,histoPanelClass) {

		let hero = new heroClass(1);
		let monster = new monsterClass(parseInt(1 + Math.random() * hero.getLevel));

		let gameDiv = $("<div></div>").attr("id","gamePanel").css({ width : "100%", heigth : "100%"});

		let heroPanel 	= new heroPanelClass(hero);
		let ennemyPanel = new ennemiPanelClass(monster);
		let actionPanel = new actionPanelClass();
		let histoPanel 	= new histoPanelClass();

		let heroDiv 	= heroPanel.getPanel().addClass("leftPanel");
		let ennemiDiv 	= ennemyPanel.getPanel().addClass("rightPanel");
		let actionDiv 	= actionPanel.getPanel().addClass("topPanel");
		let histoDiv 	= histoPanel.getPanel().addClass("bottomPanel");

		actionPanel.emitter.on("heal",function(){
			histoPanel.appendText("Hero healed");
			hero.heal();

			hero.attackedBy(monster);
		});

		hero.emitter.on("dead",function(){
			alert("You are dead\n Reload the page");
		});

		actionPanel.emitter.on("attack",function(){
			monster.attackedBy(hero);

			if(!monster.isDead()){
				hero.attackedBy(monster);
			}
		});

		actionPanel.emitter.on("run",function(){
			//hero.addExperiencePoints(oldMonster.getExpGiven);

			monster = new monsterClass(parseInt(1 + Math.random() * hero.getLevel));
			ennemyPanel.changeCharacter(monster);

			refreshMonster(monster);
		});

		refreshActionPanel(monster);
		refreshMonster(monster);

		$("body").append(actionDiv).append(heroDiv).append(ennemiDiv).append(histoDiv);

		function refreshActionPanel(oldMonster){
		}

		function refreshMonster(newMonster){

			newMonster.emitter.once("dead",function(){
				histoPanel.appendText(newMonster.getType + " is dead");
				hero.addExperiencePoints(newMonster.getExpGiven);
				monster = new monsterClass(hero.getLevel);

				ennemyPanel.changeCharacter(monster);
				refreshMonster(monster);
			});

		}
	}
);
