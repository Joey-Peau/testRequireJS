define(["jquery"],function($){


	return class ProgressBar{
		textSpan;

		constructor(initialValue, initialMax, color, width){
			this.value = initialValue;
			this.max = initialMax;
			this.color = color;
			this.width = width;

			this.showBoth = true;

			this.built = false;

			this.uuid = this.create_UUID();


			this.barContainer = $("<div></div>").attr("id",this.uuid).addClass("progress").css({height : "20px", margin: "10px"});

			this.barValue = $("<div></div>").addClass("progress-bar").attr("role","progressbar");
			this.textSpan = $("<span></span>").addClass("barLabel");

		}

		set newValue(value){
			this.value = value;
		}

		set newMax(max){
			this.max = max;
		}

		refresh(){
			this.refreshTextSpan();
			this.refreshBarValue();

			if(!this.built){
				this.buildDiv();
			}
		}

		refreshTextSpan(){
			this.textSpan = $(this.textSpan).html("" + this.value + "/" + this.max);
		}

		refreshBarValue(){
			this.barValue = $(this.barValue)
				.attr("aria-valuenow",this.value)
				.attr("aria-valuemin",0)
				.attr("aria-valuemax",this.max)
				.css({ background: this.color, width: (this.value / this.max) * 100 + "%" });
		}

		resetBar(value,max,color){
			this.value = value;
			this.max = max;
			this.color = color;
		}

		showBoth(showboth){
			this.showBoth = showboth;
		}

		getDiv(){
			if(!this.built){
				this.buildDiv();
			}
			return $(this.barContainer);
		}

		buildDiv(){
			this.built = true;

			this.refresh();

			this.barContainer = $(this.barContainer).append(this.textSpan).append(this.barValue);
		}

		create_UUID(){
			var dt = new Date().getTime();
			var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				var r = (dt + Math.random()*16)%16 | 0;
				dt = Math.floor(dt/16);
				return (c=='x' ? r :(r&0x3|0x8)).toString(16);
			});
			return uuid;
		}

	}

});