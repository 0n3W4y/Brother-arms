var Scene = (function(){
	function Scene( newParent, newId ){
	//public
		this.parent = newParent;
		this.tileMap = null;
		this.id = newId;
		
	};

	Scene.prototype.createTileMap = function( params ){
		this.tileMap = new TileMap( this );
		this.tileMap.generateGrid( params );
	};

	Scene.prototype.createEntity = function( params ){
		var newEntity = this.parent.entityManager.createEntity( params, this.id );
		return newEntity;
	};

	Scene.prototype.draw = function(){
		//TODO: draw all map and all objects on map, draw all entities on map;
		this.parent.parent.graphicsManager.drawTileMap( this.tileMap.grid, this.tileMap.height, this.tileMap.width );
	};


	//private
	return Scene;
}());