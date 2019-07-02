define(['jquery','panels/characterPanel','progressBar'],function($,charPanelClass,progressbarClass){

	return class heroPanelClass extends charPanelClass {

		expProgress;

		constructor(character){
			if(typeof(character) !== "object" || character.constructor.name !== "Hero"){
				console.log(character);
      			throw new TypeError('The variable "character" must be a "Hero" class instance');
			} 
			super(character);
		}

		refreshStatus(){
			super.refreshStatus();
			if(this.expProgress === undefined){
				this.expProgress = new progressbarClass(parseInt(this.character.getExp),parseInt(this.character.getNextExpCap),"blue");
			}
			this.expProgress.resetBar(parseInt(this.character.getExp),parseInt(this.character.getNextExpCap),"blue");
			this.expProgress.refresh();
		}

		buildPanel(){
			super.buildPanel();
			this.fullPanel.append(this.expProgress.getDiv());
		}

	}
});