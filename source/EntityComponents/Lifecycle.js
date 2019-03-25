var Lifecycle = (function(){
	function Lifecycle( parent, params ){
		this.parent = parent;
		this.componentName = "lifecycle";
		this.updated = true;	
		this.isDead = false;
		this.currentTickTime = 0;
		this.pointToChangeDay = 600000; //default 1 day ~10 minute at real time; // like rimworld ( 1 day = 16m40s );
		this.configureComponent( params );
	};

	Lifecycle.prototype.configureComponent = function( params ){
		this.day = params.day;
		if( params.day.length ){
			this.day = params.day[ Math.floor( Math.random() * params.day.length ) ];
		};
		this.maxDays = params.maxDays;// 36000; //default 100 years
		if( params.maxDays.length ){
			this.maxDays = params.maxDays[ Math.floor( Math.random() * params.maxDays.length ) ];
		};		
		this.phases = params.phases; // 1, 2, 3, 4, 5; 0-1, 1-2, 2-3, all this 3 pahses
		if( params.phases.length ){
			this.phases = params.phases[ Math.floor( Math.random() * params.phases.length ) ];
		};
		this.changeNextPhase = params.changeNextPhase// 15; //default;
		if( params.changeNextPhase.length ){
			this.changeNextPhase = params.changeNextPhase[ Math.floor( Math.random() * params.phases.length ) ];
		};
		this.canDie = params.canDie;
		
		this.currentPhase;
		this.calculateCurrentPhase();
		this.needToChangePhase = true;
		this.nextPhase;
		this.calculateNextPhase();
		if( this.phases <= 1 ){
			this.needToChangePhase = false;
		};	
	};

	Lifecycle.prototype.calculateNextPhase = function(){
		this.nextPhase = this.currentPhase * this.changeNextPhase;
	};

	Lifecycle.prototype.calculateCurrentPhase = function(){
		var value = Math.floor( this.day / this.changeNextPhase );
		if( value > this.phases ){
			value = this.phases;
		}else if( value == 0 ){
			value = 1;
		};
		this.currentPhase = value;
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
				//start dead chain after entity death;
				this.isDead = true;
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

	Lifecycle.prototype.setPhase = function( value ){
		this.currentPhase = value;
		this.needToChangePhase = true;
		this.calculateNextPhase();
		//change graphics; 
	};

	return Lifecycle;
}());