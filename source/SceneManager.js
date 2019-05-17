var SceneManager = (function(){
	function SceneManager( newParent, entityParams ){
		//public
		this.entityManager = new EntityManager( this, entityParams );
		this.parent = newParent;
		this.activeScene = null;
		this.scenesArray = new Array();
		this.sceneNextId = 0;
		
	}

	SceneManager.prototype.createScene = function( type ){
		var id = this.createSceneId();
		var newScene = new Scene( this, id );
		this.scenesArray.push( newScene );
		return newScene;
	};

	SceneManager.prototype.doActiveScene = function( scene ){
		this.activeScene = scene;
	};

	SceneManager.prototype.drawActiveScene = function(){
		this.activeScene.firstDraw();
	}

	SceneManager.prototype.update = function( time ){
		if( this.activeScene ){
			this.activeScene.update( time );
		}
		
	};

	SceneManager.prototype.createSceneId = function(){
		return ++this.sceneNextId;
	};

	//private
	return SceneManager;
}());