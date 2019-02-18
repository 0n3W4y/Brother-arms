var Scene = (function(){
	function Scene( newParent, newId ){
	//public
		this.parent = newParent;
		this.tileMap = null;
		this.id = newId;
		this.createArrayOfEntities();
		
	};

	Scene.prototype.createTileMap = function( params ){
		this.tileMap = new TileMap( this );
		this.tileMap.generate( params );
	};

	Scene.prototype.createEntity = function( params ){
		var newEntity = this.parent.entityManager.createEntity( params, this.id );
		return newEntity;
	};

	Scene.prototype.draw = function(){
		//TODO: draw all map and all objects on map, draw all entities on map;
		this.parent.parent.graphicsManager.drawTileMap( this.tileMap.grid, this.tileMap.height, this.tileMap.width );
		//this.parent.parent.graphicsManager.drawEntities( )
	};

	Scene.prototype.update = function( time ){
		this.parent.entityManager.updateScene( this.id, time );
	};

	Scene.prototype.createArrayOfEntities = function(){
		this.parent.entityManager.createSceneArrayOfEntities( this.id );
	};

	Scene.prototype.getSceneEntities - function(){

	};


	//private
	return Scene;
}());