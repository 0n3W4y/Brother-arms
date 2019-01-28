var Scene = (function(){
	function Scene( newParent, newId ){
	//public
		init( newParent, newId );
		
	};

	Scene.prototype.createTileMap = function( params ){
		tileMap = new TileMap( this, params.gridSize );
		tileMap.generateGrid( params );
	};

	Scene.prototype.getTileMap = function(){
		return tileMap;
	};

	Scene.prototype.getId = function(){
		return id;
	};

	Scene.prototype.getParent = function(){
		return parent;
	};

	Scene.prototype.createEntity = function( entityType, params ){
		var newEntity = parent.entityManager.createEntity( entityType, params );
		return newEntity;
	};

	Scene.prototype.draw = function(){
		//TODO: draw all map and all objects on map, draw all entities on map;
		parent.getParent().getManager( "graphics" ).drawTileMap( tileMap.getGrid(), tileMap.getSize(), tileMap.getGridSize() );
	};


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