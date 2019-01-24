var newGame;
var newTileMap;
var gameWidth = 1600;
var gameHeight = 900;
var fps = 30;
var scriptPathArray = [ "source/Game.js", "source/level/level1.js", "source/Tile.js", "source/TileMap.js", "source/Scene.js", "source/SceneManager.js", "source/EntityManager.js", 
                        "source/Entity.js", "source/EntityComponents/Move.js", "source/EntityComponents/Health.js" ];

importScripts();


function importScripts(){
    for( var i = 0; i < scriptPathArray.length; i++ ){
        var imported = document.createElement( 'script' );
        imported.src = scriptPathArray[i];
        document.head.appendChild( imported );
    }
};

function prepareApplication(){
	//prepareCanvas();
    gameInit();
};

function prepareCanvas(){
    var width = window.innerWidth - gameWidth;
    var height = window.innerHeight - gameHeight;

    if( width <= 0 )
      width = 0;
    if( height <= 0 )
      height = 0;

    document.body.style.paddingLeft = width/2 + "px";
    document.body.style.paddingTop = height/2 + "px";
    document.body.style.overflow = "auto";
};

function gameInit(){
    newGame = new Game( fps, gameWidth, gameHeight );
    var newScene = newGame.sceneManager.createScene( "Some", { 
        "width":40, 
        "height":30, 
        "type":"forest", 
        "tableBlock":"test", 
       "gridSize":32 
    });
    newGame.sceneManager.doActiveScene( newScene );
};
