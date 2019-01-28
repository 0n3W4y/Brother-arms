var Entity = (function(){
	function Entity( newId, newParent, params ){
	//public
		init( newId, newParent );
		this.configureEntity( params );
	}

	Entity.prototype.getComponents = function(){
		return components;
	};

	Entity.prototype.getParent = function(){
		return parent;
	};

	Entity.prototype.getId = function(){
		return id;
	};

	Entity.prototype.getGraphicsId = function(){
		return graphicsId;
	};

	Entity.prototype.changeGraphicsId = function( newId ){
		graphicsId = newId;
	};

	Entity.prototype.configureEntity = function( params ){
		
	};

	Entity.prototype.update = function( time ){
		for( var i = 0; i < components.length; i++ ){
			components[i].update( time );
		}
	};

	//private
	var id = null;
	var parent = null;
	var inited = false;
	var components = null;
	var graphicsId = null;

	var init = function( newId, newParent ){
		if( !inited ){
			id = newId;
			parent = newParent;
			components = new Array();
			inited = true;
		}else{
		};		
	};

	return Entity;
}());