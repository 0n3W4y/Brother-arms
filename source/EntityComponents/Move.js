var Move = (function(){
	function Move( newParent, params ){
	//public
		this.parent = newParent;
		this.x = null;
		this.y = null;
		this.speed = null;
		this.mapIndex = null;
		this.coordsPath = null;
		this.pointToReach = null;
		this.pathComplete = true;
	}

	Move.prototype.moveTo = function( coords ){ // { x, y }
		var newX = coords.x;
		var newY = coords.y;
	}

	Move.prototype.move = function(){
		if( coordsPath[0] != null ){
			
		}
		x += newX;
		y += newY;
	}

	Move.prototype.constructPathToPoint = function( newX, newY ){
		if( !pathComplete ){
			var lastPointToGo = coordsPath[ coordsPath.length-1 ];
			if( lastPointToGo == null ){
				lastPointToGo = { x, y };
				coordsPath = new Array();
			}

			var distanceX = Math.abs( lastPointToGo.x - newX );
			var distanceY = Math.abs( lastPointToGo.y - newY );
		}
	}

	//private
	
	
	return Move;
}());