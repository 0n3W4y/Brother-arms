var Scene = (function(){
	function Scene( newParent, newId ){
	//public
		init( newParent, newId );
		
	}
	Scene.prototype.createTileMap = function( params ){
		tileMap = new TileMap( this, params.gridSize, params.tableBlock );
		tileMap.generateGrid( params );
	}

	Scene.prototype.getTileMap = function(){
		return tileMap;
	}

	Scene.prototype.getId = function(){
		return id;
	}

	Scene.prototype.getParent = function(){
		return parent;
	}


	//private
	var parent = null;
	var id = null;
	var tileMap = null;

	var init = function( newParent, newId ){
		parent = newParent;
		id = newId;
	}
	

	return Scene;
}());