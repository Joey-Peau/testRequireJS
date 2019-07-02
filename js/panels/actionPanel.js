define(
	["jquery","panels/panel","characters/enemy","characters/hero"],
	function($,panelClass,enemyClass,heroClass){

	return class ActionPanelClass extends panelClass {

		constructor(){

			super();

			let _self = this;


			this.attackButton = $("<button></button>").addClass("actionButton btn btn-outline-danger").attr("type","button").text("attack").on("click",function(event){
				_self.triggerEvent("attack")
			});

			this.runButton = $("<button></button>").addClass("actionButton btn btn-outline-dark").attr("type","button").text("run").on("click",function(event){
				_self.triggerEvent("run");
			});

			this.healButton = $("<button></button>").addClass("actionButton btn btn-outline-success").attr("type","button").text("heal").on("click",function(event){
				_self.triggerEvent("heal");
			});
		}

		buildPanel(){
			this.built = true;
			this.fullPanel = $("<div></div>").addClass("panel")
				.append(this.attackButton)
				.append(this.runButton)
				.append(this.healButton);
		}

	}

});