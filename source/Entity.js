var Entity = (function(){
	function Entity( newId, newParent, params ){
	//public
		this.move = null;
		this.health = null;
		init( newId, newParent );
		this.configureEntity( params );
	}

	Entity.prototype.getParent = function(){
		return parent;
	};

	Entity.prototype.getId = function(){
		return id;
	};

	Entity.prototype.configureEntity = function( params ){
		if( params.move != undefined ){
			this.move = new Move( this, params.move );
		}
	};

	//private
	var id = null;
	var parent = null;
	var inited = false;

	var init = function( newId, newParent ){
		if( !inited ){
			id = newId;
			parent = newParent;
			inited = true;
		}else{
			console.log( "This entity with id: " + id + " has been inited." );
			return;
		}
		
	}
	return Entity;
}());