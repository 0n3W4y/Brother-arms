var Lifecycle = (function(){
	function Lifecycle( parent, params ){
		this.parent = parent;
		this.componentName = "lifecycle";
		this.updated = true;

		this.day = params.day || 0; // default;
		this.maxDays = params.maxDays || 36000; //default 100 years
		this.canDie = params.canDie || true; //

		this.phases = params.phases || 1; //default - never;
		this.currentPhase = params.currentPhase || 1; //default;
		this.changeNextPhase = params.changeNextPhase || 15; //default;
		this.needToChangePhase = true;
		this.nextPhase = null;
		this.calculateNextPhase();
		if( this.phases <= 1 ){
			this.needToChangePhase = false;
		};		
		
		this.currentTickTime = params.currentTickTime || 0;
		this.pointToChangeDay = params.pointToChangeDay || 600000; //default 1 day 10 minute at real time; // like rimworld ( 1 day = 16m40s );
	};

	Lifecycle.prototype.calculateNextPhase = function(){
		this.nextPhase = this.currentPhase * this.changeNextPhase;
	};

	Lifecycle.prototype.changeDayMonthAge = function(){
		this.day++;
		
		if( this.needToChangePhase ){
			if( this.day >= this.nextPhase ){
				this.changePhase();
			};
		};
		
		if( this.canDie ){
			if( this.day >= this.maxDays ){
				//start dead chain after this entity died;
			};
		};		
	};

	Lifecycle.prototype.changePhase = function(){
		this.currentPhase++;
		if( this.currentPhase == this.phases ){
			this.needToChangePhase = false;
		}
		this.calculateNextPhase();
		//need to change grapchis
	};

	Lifecycle.prototype.getFullAgeData = function(){
		var year = Math.floor( this.day / 12 / 30 );
		var month = Math.floor( ( this.day - year * 12 * 30 ) / 30 );
		var day = this.day - month * 30 - year * 12 * 30;
		
		return { "day": day, "month": month, "age": year, "fullDays": this.day };
	}

	Lifecycle.prototype.update = function( time ){
		this.currentTickTime += time;
		if( this.currentTickTime >= this.pointToChangeDay ){
			this.changeDayMonthAge();
			this.currentTickTime = this.pointToChangeDay - this.currentTickTime;
		};
	};

	lifecycle.prototype.setPhase = function( value ){
		this.currentPhase = value;
		this.needToChangePhase = true;
		this.calculateNextPhase();
		//change graphics; 
	}

	return Lifecycle;
}());