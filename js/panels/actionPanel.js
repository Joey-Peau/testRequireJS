defined(["jquery","panels/panel"],function($,panelClass){

	return class ActionPanel extends panelClass {

		this.hero;

		bindHero(hero){
			if(typeof(hero) !== "object" || hero.constructor.name !== "Hero"){
      			throw new TypeError('The variable "hero" must be a "Hero" class instance');
			} 

			this.hero = hero;
		}

	}

});