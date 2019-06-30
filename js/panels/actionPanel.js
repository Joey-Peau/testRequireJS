define(
	["jquery","panels/panel","characters/enemy","characters/hero"],
	function($,panelClass,enemyClass,heroClass){

	return class ActionPanelClass extends panelClass {

		constructor(){

			super();

			let _self = this;


			this.attackButton = $("<button></button>").addClass("actionButton").text("attack").on("click",function(event){
				_self.triggerEvent("attack")
			});

			this.runButton = $("<button></button>").addClass("actionButton").text("run").on("click",function(event){
				_self.triggerEvent("run");
			});

			this.healButton = $("<button></button>").addClass("actionButton").text("heal").on("click",function(event){
				_self.triggerEvent("heal");
			});
		}

		getPanel(){
			return $("<div></div>").append(this.attackButton).append(this.runButton).append(this.healButton);
		}

	}

});