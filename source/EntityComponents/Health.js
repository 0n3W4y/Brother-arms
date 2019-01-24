var Health = (function(){ 
	function Health( newParent, params ){
	//public
		this.currentHP = null;
		this.staticHP = null;
		init( newParent );
		this.configureHealth( params );
	}

	Health.prototype.getParent = function(){
		return parent;
	};

	Health.prototype.configureHealth = function( params ){
		//  lefthand, righthand, head, torso, leftleg, rightleg,
		var staticParams = params[ "staticHP" ];
		if( staticParams[ "head" ] != null ){
			this.staticHP = { "head": staticParams[ "head" ], "leftArm": staticParams[ "leftArm" ], "rightArm": staticParams[ "rightArm" ], 
						"torso": staticParams[ "torso" ], "leftLeg": staticParams[ "leftLeg" ], "rightLeg": staticParams[ "rightLeg" ] };
		}else{
			this.staticHP = staticParams;
		}

		if( params[ "currentHP" ] != null ){
			var currentParams = params[ "currentHP" ];
			if( currentParams[ "head" ] != null ){
				this.currentHP = { "head": currentParams[ "head" ], "leftArm": currentParams[ "leftArm" ], "rightArm": currentParams[ "rightArm" ], 
						"torso": currentParams[ "torso" ], "leftLeg": currentParams[ "leftLeg" ], "rightLeg": currentParams[ "rightLeg" ] };
			}else{
				this.currentHP = currentParams;
			}
		}else{
			this.currentHP = this.staticHP;
		}		
	};

	Health.prototype.getFullHP = function(){
		var result;
		if( this.currentHP[ "head" ] != null ){
			var he = ( this.currentHP[ "head" ] * 100 ) / this.staticHP[ "head" ];
			var lh = ( this.currentHP[ "leftArm" ] * 100 ) / this.staticHP[ "leftArm" ];
			var rh = ( this.currentHP[ "rightArm" ] * 100 ) / this.staticHP[ "rightArm" ];
			var to = ( this.currentHP[ "torso" ] * 100 ) / this.staticHP[ "torso" ];
			var ll = ( this.currentHP[ "leftLeg" ] * 100 ) / this.staticHP[ "leftLeg" ];
			var rl = ( this.currentHP[ "rightLeg" ] * 100 ) / this.staticHP[ "rightLeg" ];
			var num = ( he + lh + rh + to + ll + rl ) / 6; // because 6 params;
			result = Math.round( num );
		}else{
			result = Math.round( ( this.currentHP * 100 ) / this.staticHP );
		}

		return result;
	};

	Health.prototype.doDamageTo = function( place, num ){
		if( this.currentHP[ place ] != null ){
			if( this.currentHP[ place ] == 0 ){
				return -1; // no damage
			}else{
				this.currentHP[ place ] -= num;
				if( this.currentHP[ place ] <= 0 ){
					this.currentHP[ place ] = 0;
					return 0; // place destoyed;
				}else{
					return this.currentHP[ place ];
				}
			}
		}else{
			console.log( "Error in Health.js, function: doDamageTo, place is - " + place + "." );
			return -1;
		}
	}

	//private
	var parent = null;
	var inited = false;

	var init = function( newParent ){
		if( !inited ){
			parent = newParent;
			inited = true;
		}else{
			console.log( "Health already inited." );
			return;
		}
		
	};

	return Health;
}());