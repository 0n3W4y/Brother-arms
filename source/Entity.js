var Entity = (function(){
	function Entity( newId, newParent, params ){
	//public
		this.parent = newParent;
		this.Id = newId;
		this.components = new Array();
		this.graphicsId = null;
		this.configureEntity( params );
	}

	Entity.prototype.configureEntity = function( params ){
		
	};

	Entity.prototype.update = function( time ){
		for( var i = 0; i < this.components.length; i++ ){
			this.components[i].update( time );
		}
	};


	return Entity;
}());