var Scene = (function(){
	function Scene( newParent, newId ){
	//public
		this.parent = newParent;
		this.tileMap = null;
		this.id = newId;
		this.createArrayOfEntities();
		
	};

	Scene.prototype.createTileMap = function( params ){
		this.tileMap = new TileMap( this, params );
	};

	Scene.prototype.generateBiome = function( params ){
		this.tileMap.generateBiome( params );
	};

	Scene.prototype.createEntity = function( type, name, params ){
		var newEntity = this.parent.entityManager.createEntity( type, name, this.id, params );
		return newEntity;
	};

	Scene.prototype.draw = function(){
		//TODO: draw all map and all objects on map, draw all entities on map;
		this.parent.parent.graphicsManager.layer0NeedToUpdate = true;
		this.parent.parent.graphicsManager.layer1NeedToUpdate = true;
		//this.parent.parent.graphicsManager.layer2NeedToUpdate = true;
		//this.parent.parent.graphicsManager.layer3NeedToUpdate = true;
		//this.parent.parent.graphicsManager.layer4NeedToUpdate = true;
		//this.parent.parent.graphicsManager.layer5NeedToUpdate = true;
		
	};

	Scene.prototype.update = function( time ){
		this.parent.entityManager.updateScene( this.id, time );
	};

	Scene.prototype.createArrayOfEntities = function(){
		this.parent.entityManager.createSceneArrayOfEntities( this.id );
	};

	Scene.prototype.getSceneEntities = function(){

	};


	//private
	return Scene;
}());