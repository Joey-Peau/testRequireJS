define(['jquery'],function($){

	return class Panel{

		constructor(){
			this.width = 50;
			this.heigth = 50;
		}

		getDiv(){
			return $("<div></div>").addClass("panel").width(this.width).heigth(this.heigth);
		}

	}
});