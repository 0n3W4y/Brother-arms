var EntityManager = (function(){
	function EntityManager( newParent, params ){
	//public
		this.parent = newParent;
		this.aliveEntities = new Object(); // who can do some work; //we can do object like this: { SceneId : [array of entities...] };
		this.objectEntities = new Object(); // like a chest, or tree;
		this.entityId = 0;
		this.entityParams = params;
	};

	EntityManager.prototype.createEntity = function( entityType, entityName, sceneId, tile, params ){
		var type;
		if( entityType == 1 ){
			type = "alive";
		}else if( entityType == 0 ){
			type = "object";
		}else{
			console.log("Error in EntityManager, can't create entity with type: " + entityType );
			return null;
		};

		var newParams = params;
		if( !params ){
			newParams = this.generateParamsForEntity( type, entityName, tile )
		};
		var id = this.createId();
		var newEntity = new Entity( id, this, newParams );
		this.addEntity( type, newEntity, sceneId );
		return newEntity;
	};

	EntityManager.prototype.removeEntity = function( entity ){
		
	};

	EntityManager.prototype.replaceEntityTo = function( entity, place ){

	};

	EntityManager.prototype.addEntity = function( type, entity, sceneId ){
		var container;
		if( type == "alive" ){
			container = this.aliveEntities;
		}else{
			container = this.objectEntities;
		}

		if( sceneId || sceneId === 0 ){
			container.sceneId.push( entity );
		}else{
			console.log( "Error in EntityManager.addEntity, can't add entity to array, sceneId can't be: " + sceneId );
		}

		//TODO: Можно сделать как в прошлых проектах добаление entity  в аррей в пустой индекс. что бы не растить аррей. просто функция перебора индексов
		// в при первом совпадении в null  он добавляет в эту дырку. 
		// еще как вариант добавить свободные индексы в массив и удалять их оттуда по ненадобности. в итоге entities может быть за 1000, а свободных 
		// индексов около 10-20, по производительности будет проще slice сделать массиву из 100 индексов. чем из 1000 соотвественно
		// можно сделать поле, в котором будет указанно нужно ли заполнять контейнер с entities из индексов или можно еще собирать их в 1 большйо контейнер
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

	EntityManager.prototype.updateScene = function( sceneId, time ){
		if( !sceneId && sceneId !== 0 ){
			return;
		}
		var aliveEntitiesContainer = this.aliveEntities.sceneId;
		var objectEntitiesContainer = this.objectEntities.sceneId;

		for( var i = 0; i < aliveEntitiesContainer.length; i++ ){
			aliveEntitiesContainer[ i ].update( time );
		}

		for( var j = 0; j < objectEntitiesContainer.length; j++ ){
			objectEntitiesContainer[ j ].update( time );
		}
	};

	EntityManager.prototype.createId = function(){
		var id = this.entityId;
		this.entityId++;
		return id;
	};

	EntityManager.prototype.createSceneArrayOfEntities = function( sceneId ){
		this.aliveEntities.sceneId = new Array();
		this.objectEntities.sceneId = new Array();
	};

	EntityManager.prototype.generateParamsForEntity = function( type, entityName, tile ){
		var params;
		var tileX = tile.x;
		var tileY = tile.y;
		var tileBiome = tile.tileBiome;
		var container = this.entityParams[ type ];
		for( var key in container ){
			var newContainer = container[ key ];
			for( var obj in newContainer ){
				if( obj == entityName ){
				}
			}
		}
		return params;
	};

	return EntityManager;
}());