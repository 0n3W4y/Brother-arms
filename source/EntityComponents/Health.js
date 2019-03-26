var Health = (function(){ 
	function Health( parent, params ){
	//public
		this.currentHP = {};
		this.staticHP = {};
		this.parent = parent;
		this.componentName = "health";
		this.updated = false;
		this.configureHP( params );
	};

	Health.prototype.configureHP = function( params ){
		for( var key in params ){
			this.staticHP[ key ] = params[ key ];
			if( params[ key ].length ){
				this.staticHP[ key ] = Math.floor( params[ key ][ 0 ] + Math.random() * ( params[ key ][ 1 ] - params[ key ][ 0 ] + 1 ) );
			}
			this.currentHP[ key ] = this.staticHP[ key ];
		}
	};

	Health.prototype.getAverageHP = function(){
		var result = 0;
		var i = 0;
		for( var key in this.currentHP ){
			result += ( this.currentHP[ key ] * 100 ) / this.staticHP[ key ];
			i++;
		};

		result = Math.round( result / i );
		return result;
	};

	Health.prototype.getFullHp = function(){
		var result = {};
		for( var key in this.currentHP ){
			result[ key ] = this.currentHP[ key ];
		}
		return result;
	}

	Health.prototype.getArrayOfPartsHP = function(){
		var result = [];
		for( var key in this.currentHP ){ // put all parts, if 0 - too, in future we can check to cut this part from entity
			if( this.currentHP[ key ] >= 0 ){
				result.push( key );
			};
		};
	}

	Health.prototype.doDamageTo = function( place, value ){
		if( this.currentHP[ place ] ){
			var num = this.currentHP[ place ];
			num -= value;
			if( num < 0 ){
				this.currentHP[ place ] = 0;
				//TODO: do changes to all entity;
			};
			this.currentHP[ place ] = num;
		}else{
			console.log( "Error in Health.doDamageTo, place is - " + place + " not available on this entity with ID: " + this.parent.id );
		};
	};

	//private

	return Health;
}());