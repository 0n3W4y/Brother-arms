var newGame;
var newTileMap;
var images;
var gameWidth = 1600;
var gameHeight = 900;
var fps = 30;
var mainTable = "mainMap";
var scriptPathArray = [ "source/Game.js", "source/level/level1.js", "source/Tile.js", "source/TileMap.js", "source/Scene.js", "source/SceneManager.js", "source/EntityManager.js", 
                        "source/Entity.js", "source/EntityComponents/Move.js", "source/EntityComponents/Health.js", "source/GraphicsManager.js" ];

importScripts();
//importImages();


function importScripts(){
    for( var i = 0; i < scriptPathArray.length; i++ ){
        var imported = document.createElement( 'script' );
        imported.src = scriptPathArray[i];
        document.head.appendChild( imported );
    }
};

function importImages(){
    //backgroundMapImages = images.backgroundImages;
    //foregroundMapImages = images.foregroundImages;
    //effectMapImages = images.effectImages;
    //entityMapImages = images.entityImages;
};

function prepareApplication(){
	//prepareCanvas(); //center;
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
    newGame = new Game( fps, gameWidth, gameHeight, mainTable, images );
    var newScene = newGame.sceneManager.createScene( "Unnamed", { 
        "width":40, 
        "height":40, 
        "gridSize":32,
    });
    newGame.sceneManager.doActiveScene( newScene );
    newGame.sceneManager.getActiveScene().createEntity( "alive", {
        "type": "human",
        "components": {

        },
    } );
};
