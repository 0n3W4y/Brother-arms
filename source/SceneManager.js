var SceneManager = (function(){
	function SceneManager( newParent ){
		//public
		this.entityManager = new EntityManager( this );
		init( newParent );
	}
	SceneManager.prototype.getParent = function(){
		return parent;
	};

	SceneManager.prototype.getActiveScene = function(){
		return activeScene;
	};

	SceneManager.prototype.getScenesArray = function(){
		return scenesArray;
	};

	SceneManager.prototype.createScene = function( type, params ){
		var newScene;
		var id = createSceneId();
		newScene = new Scene( this, id );
		newScene.createTileMap( params );
		scenesArray.push( newScene );
		return newScene;
	};

	SceneManager.prototype.doActiveScene = function( scene ){
		activeScene = scene;
		activeScene.draw();
	};

	SceneManager.prototype.update = function( time ){
		this.entityManager.update( time );
	};


	//private
	var parent = null;
	var inited = false;

	var activeScene = null;
	var scenesArray = null;

	var sceneNextId = 0;

	var init = function( newParent ){
		if( !inited ){
			parent = newParent;
			scenesArray = new Array();
			inited = true;
		}else{
			console.log( "SceneManager already inited." );
			return;
		}
		
	};

	var createSceneId = function(){
		return ++sceneNextId;
	};

	return SceneManager;
}());