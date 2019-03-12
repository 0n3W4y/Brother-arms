var Entity = (function(){
	function Entity( newId, newParent, params ){
	//public
		this.parent = newParent;
		this.id = newId;
		this.components = new Array();
		this.graphicsId = params.graphicsId;
		this.configureEntity( params.components );
	}

	Entity.prototype.configureEntity = function( params ){
		//{ "Lifecycle": {}, "Position": {} }
		for( var key in params ){
			var newComponent;
			if( key == "lifecycle" ){
				newComponent = new Lifecycle( this, params[ key ] );
			}else if( key == "position" ){
				newComponent = new Position( this, params[ key ] );
			}else{
				console.log( "Error in Entity.configureEntity, no components with name: " + key );
				return;
			};
			this.components[ key ] = ( newComponent );
		};
		
	};

	Entity.prototype.update = function( time ){
		for( var key in this.components ){
			if( this.components[ key ].updated ){
				this.components[ key ].update( time );
			};			
		};
	};


	return Entity;
}());