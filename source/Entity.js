var Entity = (function(){
	function Entity( newId, newParent, params, type, entityName, configType ){
	//public
		this.parent = newParent;
		this.id = newId;
		this.components = {};
		this.components.updated = {};
		this.components.nonupdated = {};
		this.configureEntity( params );
		this.type = type; // alive or object
		this.objectType = entityName; // tree, wall, char;
		this.configType = configType; //config name ;
	}
	// перенести в EntityManager.
	Entity.prototype.configureEntity = function( params ){
		//{ "Lifecycle": {}, "Position": {} }
		for( var key in params ){
			var newComponent;
			if( key == "lifecycle" ){
				newComponent = new Lifecycle( this, params[ key ] );
			}else if( key == "position" ){
				newComponent = new Position( this, params[ key ] );
			}else if( key == "health" ){
				newComponent = new Health( this, params[ key ] );
			}else if( key == "move" ){
				newComponent = new Move( this, params[ key ] );
			}else if( key == "name" ){
				newComponent = new Name( this, params[ key ] );
			}else if( key == "graphics" ){
				newComponent = new Position( this, params[ key ] );
			}else{
				console.log( "Error in Entity.configureEntity, no components with name: " + key );
				return;
			};
			if( newComponent.updated ){
				this.components.updated[ key ] = newComponent;
			}else{
				this.components.nonupdated[ key ] = newComponent;
			};
		};
		
	};

	Entity.prototype.update = function( time ){
		for( var key in this.components.updated ){
			this.components.updated[ key ].update( time );
		};
	};


	return Entity;
}());