var Move = (function(){
	function Move( newParent, params ){
	//public
		init( newParent ); 
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

	Move.prototype.getCoords = function(){
		return { x, y };
	}

	Move.prototype.setMapIndex = function( index ){
		mapIndex = index;
	}

	Move.prototype.getMapIndex = function(){
		return mapIndex;
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
	var parent = null;
	var inited = false;
	var x = null;
	var y = null;
	var speed = null;
	var mapIndex = null;
	var coordsPath = null;
	var pointToReach = null;
	var pathComplete = true;


	var init = function( newParent ){
		if( !inited ){
			parent = newParent;
			corrdsPath = new Array();
			inited = true;
		}else{
			console.log( "Move already inited." );
			return;
		}
		
	};
	
	return Move;
}());