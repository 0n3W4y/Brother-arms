var newGame;
var images;
var gameWidth = 1600;
var gameHeight = 900;
var fps = 30;
var mainTable = "mainMap";
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
        "backgroundImages": {
            "earth" : "images/earth.png",
            "rockyground" : "images/rockyground.png",
            "water" : "images/water.png"
        },

        "foregroundImages": {

        },

        "effectImages": {

        },

        "entityImages": {
            "grass1" : "images/grass-1.png",
            "grass2" : "images/grass-2.png",
            "rockroad" : "images/rockroad.png",
            "wallRock1" : "images/wall-rock-1.png",
            "wallWood1" : "images/wall-wood-1.png",
            "door1" : "images/door-1.png",
            "char1" : "images/char-1.png",
            "char2" : "images/char-2.png",
            "char3" : "images/char-3.png",
            "char4" : "images/char-4.png",
            "char5" : "images/char-5.png",
            "char6" : "images/char-6.png",
            "char7" : "images/char-7.png"      
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
    var mainBlock = document.getElementById("main-block");
    mainBlock.style.width = gameWidth + "px";
    mainBlock.style.height = gameHeight + "px";
    
};

function gameInit(){
    newGame = new Game( fps, gameWidth, gameHeight, mainTable, images );
    var newScene = newGame.sceneManager.createScene( "Unnamed",
        { 
            "gridParams": {
                "width":70, 
                "height":70, 
                "tileSize":32
            },
            "biomeParams": {
                
            }
        }
    );
    newGame.sceneManager.doActiveScene( newScene );
    newGame.sceneManager.getActiveScene().createEntity( "alive", {
        "type": "human",
        "components": {

        },
    } );
};
