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
            "src": "images/backgroundTileSet.png",
            "backgroundTileData": {
                "earth" : [ { "x": 32, "y": 0 } ],
                "rockyGround" : [ { "x": 64, "y": 0 } ],
                "water" : [ { "x": 0, "y": 0 } ]
            }
        },

        "backgroundObjectsTileset": {
            "tileSeze": 32,
            "src": "images/backgroundTileSet.png",
            "backgroundObjectTileData": {
                "woodenDoor" : [ { "x": 64, "y": 32 } ],
                "rockyWall" : [ { "x": 0, "y": 64 } ],
                "woodenWall" : [ { "x": 32, "y": 64 } ],
                "grass" : [ { "x": 0, "y": 32 }, { "x": 32, "y": 32 } ]
            }
        },

        "effectsTileset": {
            "tileSize": undefined,
            "src": undefined,
            "effectsTileData": {

            }
        },  

        "charactersTileset": {
            "tilesize": 32,
            "src": "images/charactersTileSet.png",
            "charactersTileData": {
                "goblin" : [ { "x": 0, "y": 0}, { "x": 64, "y": 0 }, { "x": 32, "y": 32 }, { "x": 0, "y": 64 } ],
                "human" : [ { "x": 32, "y": 0 }, { "x": 0, "y": 32 }, { "x": 64, "y": 32 } ]
            }
        },

        "uiTileset":{
            "tileSize": undefined,
            "src": undefined,
            "": {
                
            }
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
    var gridHeight = 70;
    var gridWidth = 70;
    var gridTileSize = 32;
    document.getElementById( "main-block" ).style.width = gameWidth + "px";
    document.getElementById( "main-block" ).style.height = gameHeight + "px";
    //do canvas fullsize from tileMap;
    document.getElementById( "layer0" ).width = gridWidth * gridTileSize;
    document.getElementById( "layer0" ).height = gridHeight * gridTileSize;
    document.getElementById( "layer1" ).width = gridWidth * gridTileSize;
    document.getElementById( "layer1" ).height = gridHeight * gridTileSize;
    document.getElementById( "layer2" ).width = gridWidth * gridTileSize;
    document.getElementById( "layer2" ).height = gridHeight * gridTileSize;
    document.getElementById( "layer3" ).width = gridWidth * gridTileSize;
    document.getElementById( "layer3" ).height = gridHeight * gridTileSize;
    document.getElementById( "layer4" ).width = gridWidth * gridTileSize;
    document.getElementById( "layer4" ).height = gridHeight * gridTileSize;

    //TODO: so, prepare layers on canvases,
    //import images to this canvases,
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
    newGame.sceneManager.doActiveScene( newScene );

    /*newGame.sceneManager.getActiveScene().createEntity( "alive", {
        "type": "human",
        "components": {

        }
    } );
    */
    
};
