var EntityManager = (function(){
	function EntityManager( newParent ){
	//public
		this.parent = newParent;
		this.aliveEntities = new Object(); // who can do some work; //we can do object like this: { SceneId : [array of entities...] };
		this.objectEntities = new Object(); // like a chest, or tree;
		this.entityId = 0;
	}

	EntityManager.prototype.createEntity = function( type, params, sceneId ){
		if( type != "alive" || type != "object" ){
			console.log("Error in EntityManager, can't create entity with type: " + type );
			return null;
		}
		var id = createId();
		var newEntity = new Entity( id, this, params );
		this.addEntity( type, newEntity, sceneId );
		return newEntity;
	};

	EntityManager.prototype.removeEntity = function( entity ){
		
	};

	EntityManager.prototype.moveEntityTo = function( entity, place ){

	};

	EntityManager.prototype.addEntity = function( type, entity, sceneId ){
		var container;
		if( type == "alive" ){
			container = this.aliveEntities;
		}else{
			container = this.objectEntities;
		}

		if( sceneId || sceneId === 0 ){
			if( this.container.sceneId == undefined ){
				this.container.sceneId = new Array();
			}

			this.container.sceneId.push( entity );
		}else{
			console.log( "Error in EntityManager.addEntity, can't add entity to array, sceneId can't be: " + sceneId );
		}
	};

	EntityManager.prototype.update = function( time ){

		for( var key in this.aliveEntities ){
			var entitiesArray = this.aliveEntities.key;
			for( var i = 0; i < entitiesArray.length; i++ ){
				entitiesArray[i].update( time );
			}
		}
		
		for( var newKey in this.objectEntities ){
			var entitiesArray = this.objectEntities.newKey;
			for( var j = 0; j < entitiesArray.length; j++ ){
				entitiesArray[j].update( time );
			}
		}
		
	};

	EntityManager.prototype.createId = function(){
		return ++this.entityId;
	};

	return EntityManager;
}());