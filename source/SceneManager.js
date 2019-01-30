var SceneManager = (function(){
	function SceneManager( newParent ){
		//public
		this.entityManager = new EntityManager( this );
		this.parent = newParent;
		this.activeScene = null;
		this.scenesArray = new Array();
		this.sceneNextId = 0;
		
	}

	SceneManager.prototype.createScene = function( type, params ){
		var id = this.createSceneId();
		var newScene = new Scene( this, id );
		newScene.createTileMap( params );
		this.scenesArray.push( newScene );
		return newScene;
	};

	SceneManager.prototype.doActiveScene = function( scene ){
		this.activeScene = scene;
		this.activeScene.draw();
	};

	SceneManager.prototype.update = function( time ){
		this.entityManager.update( time );
	};

	SceneManager.prototype.createSceneId = function(){
		return ++this.sceneNextId;
	};

	//private
	return SceneManager;
}());