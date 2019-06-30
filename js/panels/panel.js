define(['jquery',"eventEmitter"],function($,eventEmitter){

	return class Panel{
		emitter;

		constructor(){
			this.emitter = new eventEmitter();

			this.width = 50;
			this.heigth = 50;
		}

		getDiv(){
			return $("<div></div>").addClass("panel").css({width: this.width, heigth : this.heigth});
		}


		triggerEvent(eventToTrigger,data){
			this.emitter.emitEvent(eventToTrigger,data);
		}

	}
});