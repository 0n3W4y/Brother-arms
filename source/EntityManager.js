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
		var newEntity;
		return newEntity;
	};

	//private
	var parent = null;
	var aliveEntities = null;
	var objectEntities = null;
	var inited = false;

	var init = function( newParent ){
		if( !inited ){
			parent = newParent;
			inited = true;
		}else{
			console.log( "EntityManager already inited." );
			return;
		}
		
	};

	return EntityManager;
}());