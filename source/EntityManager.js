var EntityManager = (function(){
	function EntityManager( newParent, params ){
	//public
		this.parent = newParent;
		this.aliveEntities = new Object(); // who can do some work; //we can do object like this: { SceneId : [array of entities...] };
		this.objectEntities = new Object(); // like a chest, or tree;
		this.entityId = 0;
		this.entityParams = params;
	};

	EntityManager.prototype.createEntity = function( type, entityName, sceneId, params ){
		// можно дописать функцию, которая при любом раскладе будет генерировать набор компонентов и настройки рандомным образом, учитывая параметры которые есть
		// тогда мы сможем создать дракона с рандомными параметрами. но с определенным именем и фамилией, к примеру.
		var newParams = this.generateParamsForEntity( type, entityName, params );	
		var id = this.createId();
		var newEntity = new Entity( id, this, newParams.params, type, entityName, newParams.entityConfigType );
		this.doGraphicsForEntity( newEntity );
		this.addEntity( type, newEntity, sceneId );
		//TODO: create graphics;
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

	EntityManager.prototype.generateParamsForEntity = function( type, entityName, params ){
		var newParams;
		var container;
		if( entityName == "tree" ){
			container = this.entityParams[ type ].resources[ entityName ];
			newParams = this.createTreeParams( container, params );
		}else if( entityName == "bush" ){
			container = this.entityParams[ type ].resources[ entityName ];
			newParams = this.createTreeParams( container, params );
		}else if( entityName == "rock" ){
			container = this.entityParams[ type ].resources[ entityName ];
			newParams = this.createRockParams( container, params );
			console.log( container );
		}else{
			console.log( "Error in EntityManager.generateParamsForEntity, can't find params for type: " + type + "; entity name: " + entityName );
		}
		return newParams;
	};

	EntityManager.prototype.doGraphicsForEntity = function( entity ){

	};

	EntityManager.prototype.createTreeParams = function( container, params ){
		var newParams;
		var newContainer = container[ params.biome ];
		var objLength = 0;
		var configType = params.entityConfigType;
		for( var key in newContainer ){
			objLength++;
		};
		// функия поддерживает настройку на определенный тип, дерево ->  орешник к примеру. Если точно нужно эти параметры.
		if( params && params.entityConfigType ){
			newParams = newContainer[ params.entityConfigType ]; //{ componentName: { params ..}, { componentName: { params }, ...} };
		}else{
			var newContainerArr = [];
			for( var obj in newContainer ){
				newContainerArr.push( obj );
			};
			configType = newContainerArr[ Math.floor( Math.random() * newContainerArr.length ) ]
			newParams = newContainer[ configType ];
		};
		
		for( var num in newParams ){
			var cont = newParams[ num ];
			for( var some in cont ){
				if( params && params.components && params.components[ num ] && params.components[ num ][ some ] ){
					cont[ some ] = params.components[ num ][ some ];
				};
			};
		};
		return { "params": newParams, "entityConfigType": configType };
	};

	return EntityManager;
}());