define(['jquery','panels/characterPanel'],function($,charPanelClass){

	return class heroPanelClass extends charPanelClass {

		constructor(character){
			if(typeof(character) !== "object" || character.constructor.name !== "Hero"){
				console.log(character);
      			throw new TypeError('The variable "character" must be a "Hero" class instance');
			} 
			super(character);
		}

		refreshStatus(){
			super.refreshStatus();
			this.status = $(this.status).html($(this.status).html()
				+ "<br/>Experience points : " + parseInt(this.character.getExp) + "/" + parseInt(this.character.getNextExpCap)) ;
		}

	}
});