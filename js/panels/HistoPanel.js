define(
	["jquery","panels/panel"],
	function($,panelClass){

	return class HistoPanelClass extends panelClass {

		constructor(){
			super();
		}

		appendText(text){
			let newText = $("<div></div>").addClass("text").text(text);
			$(this.fullPanel).append(newText);
		}

		getPanel(){
			if(!this.built){
				this.buildPanel();
			}

			return $(this.fullPanel);
		}

		buildPanel(){
			this.built = true;
			this.fullPanel = $("<div></div>").addClass("panel").addClass("histoPanel");
		}

	}

});