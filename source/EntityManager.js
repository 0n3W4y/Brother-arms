var EntityManager = (function(){
	function EntityManager( newParent ){
	//public

		init( newParent );
	}

	EntityManager.prototype.getParent = function(){
		return parent;
	};

	EntityManager.prototype.getAliveEntitesArray = function(){
		return aliveEntites;
	};

	EntityManager.prototype.getObjectEntitiesArray = function(){
		return objectEntities;
	};

	EntityManager.prototype.createEntity = function( type, params ){
		var id = createId();
		var newEntity = new Entity( id, this, params );
		if( type == "alive" )
			aliveEntities.push( newEntity );
		else if( type == "object" ){
			objectEntities.push( newEntity );
		}else{
			console.log("Error in EntityManager, can't create entity with type: " + type );
		}
		return newEntity;
	};

	EntityManager.prototype.update = function( time ){
		for( var i = 0; i < aliveEntities.length; i++ ){
			aliveEntities[i].update( time );
		}

		for( var j = 0; j < objectEntities.length; j++ ){
			objectEntities[j].update( time );
		}
	};

	//private
	var parent = null;
	var aliveEntities = null; // who can do some work;
	var objectEntities = null; // like a chest, or tree;
	var inited = false;
	var entityId = 0;

	var init = function( newParent ){
		if( !inited ){
			parent = newParent;
			aliveEntities = new Array();
			objectEntities = new Array();
			inited = true;
		}else{
			console.log( "EntityManager already inited." );
			return;
		}
		
	};

	var createId = function(){
		return entityId++;
	};

	return EntityManager;
}());