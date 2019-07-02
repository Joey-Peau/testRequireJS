define(['jquery','bootstrap',"eventEmitter"],function($,$boot,eventEmitter){

	return class Panel{
		emitter;
		fullPanel;

		constructor(){
			if(this.buildPanel === undefined){
				throw new TypeError('"buildPanel" function must be implemented');
			}

			this.built = false;


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

		getPanel(){
			if(!this.built){
				this.buildPanel();
			}
			return $(this.fullPanel);
		}

	}
});