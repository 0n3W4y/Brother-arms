var newGame;
var images;
var gameWidth = 1600;
var gameHeight = 900;
var fps = 30;
var canvasLayers;
var scriptPathArray = [ "source/Game.js", "source/level/level1.js", "source/Tile.js", "source/TileMap.js", "source/Scene.js", "source/SceneManager.js", "source/EntityManager.js", 
                        "source/Entity.js", "source/EntityComponents/Move.js", "source/EntityComponents/Health.js", "source/GraphicsManager.js" ];

importScripts();
importImages();


function importScripts(){
    for( var i = 0; i < scriptPathArray.length; i++ ){
        var imported = document.createElement( 'script' );
        imported.src = scriptPathArray[i];
        document.head.appendChild( imported );
    }
};

function importImages(){
    images = {
        "backgroundTileset": {
            "tileSize": 32,
            "src": "images/backgroundTileSet.png"
        },
        "backgroundObjetcsTileset": {
            "tileSeze": undefined,
            "src": undefined
        },
        "effectsTileset": {
            "tileSize": undefined,
            "src": undefined
        },
        "charactersTileset": {
            "tilesize": 32,
            "src": "images/charactersTileSet.png"
        },
        "uiTileset":{
            "tileSize": undefined,
            "src": undefined
        }
    }
};

function prepareApplication(){
	prepareCanvas(); //center;
    gameInit();
};

function prepareCanvas(){
    //for modal window, catch center of screen;
    /*var width = window.innerWidth - gameWidth;
    var height = window.innerHeight - gameHeight;
    
    if( width <= 0 )
      width = 0;
    if( height <= 0 )
      height = 0;

    document.body.style.paddingLeft = width/2 + "px";
    document.body.style.paddingTop = height/2 + "px";
    document.body.style.overflow = "auto";
    */
    var mainBlock = document.getElementById( "main-block" );
    mainBlock.style.width = gameWidth + "px";
    mainBlock.style.height = gameHeight + "px";

    //TODO: so, prepare layers on canvases,
    //import images to this vanvases,
    //type functions *onload*

    canvasLayers = {
        "backgroundLayer": document.getElementById( "layer0" ),
        "backgroundObjectsLayer": document.getElementById( "layer1" ),
        "effectsLayer": document.getElementById( "layer2" ),
        "charactersLayer": document.getElementById( "layer3" ),
        "uiLayer": document.getElementById( "layer4" )
        }


    
};

function gameInit(){
    newGame = new Game( fps, gameWidth, gameHeight, canvasLayers, images );
    var newScene = newGame.sceneManager.createScene( "Unnamed",
        { 
            "gridParams": {
                "width":70, 
                "height":70, 
            },
            "biomeParams": {
                
            }
        }
    );
    //newGame.sceneManager.doActiveScene( newScene );
    /*newGame.sceneManager.getActiveScene().createEntity( "alive", {
        "type": "human",
        "components": {

        }
    } );
    */
    
};
