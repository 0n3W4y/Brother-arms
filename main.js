var newGame;
var images;
var gameWidth = 1600;
var gameHeight = 900;
var fps = 30;
var gridHeight = 100;
var gridWidth = 100;
var gridTileSize = 32;
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
                "crackedEarth" : [ { "x": 0, "y": 0 },{ "x": 32, "y": 0 }, { "x": 64, "y": 0 }, { "x": 96, "y": 0 } ],
                "snowEarth" : [ { "x": 0, "y": 32 },{ "x": 32, "y": 32 }, { "x": 64, "y": 32 }, { "x": 96, "y": 32 } ],
                "normalEarth" : [ { "x": 0, "y": 64 },{ "x": 32, "y": 64 }, { "x": 64, "y": 64 }, { "x": 96, "y": 64 } ],
                "tundraEarth" : [ { "x": 0, "y": 96 },{ "x": 32, "y": 96 }, { "x": 64, "y": 96 }, { "x": 96, "y": 96 } ],
                "tropicsEarth" : [ { "x": 0, "y": 128 },{ "x": 32, "y": 128 }, { "x": 64, "y": 128 }, { "x": 96, "y": 128 } ],
                "rockyGround" : [ { "x": 128, "y": 96 }, { "x": 160, "y": 96 }, { "x": 196, "y": 96 }, { "x": 228, "y": 96 } ],
                "sandsWater" : [ { "x": 128, "y": 0 }, { "x": 160, "y": 0 }, { "x": 196, "y": 0 }, { "x": 228, "y": 0 } ],
                "snowWater" : [ { "x": 128, "y": 32 }, { "x": 160, "y": 32 }, { "x": 196, "y": 32 }, { "x": 228, "y": 32 } ],
                "normalWater" : [ { "x": 128, "y": 64 }, { "x": 160, "y": 64 }, { "x": 196, "y": 64 }, { "x": 228, "y": 64 } ],
                "tropicsWater" : [ { "x": 128, "y": 128 }, { "x": 160, "y": 128 }, { "x": 196, "y": 128 }, { "x": 228, "y": 128 } ]
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
            "uiTileData": {
                
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

    document.getElementById( "layer4" ).addEventListener( "mousedown", onMouseDownOnCavas, false );
    document.getElementById( "layer4" ).addEventListener( "mouseup", onMouseUpOnCavas, false );
    document.getElementById( "layer4" ).addEventListener( "mousemove", onMouseMoveOnCanvas, false );

    differenceCanvasGameWidth = document.getElementById( "layer0" ).width - gameWidth;
    differenceCanvasGameHeight = document.getElementById( "layer0" ).height - gameHeight;

    document.getElementById( "layer0" ).style.marginTop = "0px";
    document.getElementById( "layer0" ).style.marginLeft = "0px";
    document.getElementById( "layer1" ).style.marginTop = "0px";
    document.getElementById( "layer1" ).style.marginLeft = "0px";
    document.getElementById( "layer2" ).style.marginTop = "0px";
    document.getElementById( "layer2" ).style.marginLeft = "0px";
    document.getElementById( "layer3" ).style.marginTop = "0px";
    document.getElementById( "layer3" ).style.marginLeft = "0px";
    document.getElementById( "layer4" ).style.marginTop = "0px";
    document.getElementById( "layer4" ).style.marginLeft = "0px";

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
    var newScene = newGame.sceneManager.createScene( "Unnamed" );
    newScene.createTileMap( { "width": gridWidth, "height": gridHeight } );
    //i'll do only 2 biomes at once, cause in logical sands and snow... magically world :D
    //b.t.w we can do 3 biomes if our tile map can be HUUUUGE;
    newScene.generateBiome( {
        "biomes": {
            "primary": "tundra",
            "secondary": "snow",
            "proportion": 55, // 100% overall;
            "direction": "NS" //North to South;
        },
        "ground": {
            "rock": { "amount": 350, "maxHeight": null, "minHeight": null, "maxWidth": null, "minWidth": null, "offset": null }, // 100% overall; total 500, half of playable zone;
            "water": { "amount": 150, "maxHeight": , "minHeight": , "maxWidth": , "minWidth": , "offset": , "river": {} }
        },
        "resources": {

        }

    } );
    newGame.sceneManager.doActiveScene( newScene );

    var newEntity = newGame.sceneManager.activeScene.createEntity( {
            "type": "human",
            "components": {
                "move" :{ "x": 0, "y": 0 },

            }
        } 
    );
    
};

//REMOVE THIS:
var mouseX;
var mouseY;
var timeToClick = 0;
var doScroll = false;
var doTimeEvent = false;
var differenceCanvasGameWidth;
var differenceCanvasGameHeight;

function onMouseDownOnCavas( e ){
    mouseX = e.clientX;
    mouseY = e.clientY;
    doTimeEvent = true;
    
};

function onMouseMoveOnCanvas( e ){
    if( !doTimeEvent ){
        return;
    }
    if( timeToClick <= 3 ){
        timeToClick++;
        return;
    }else{
        doScroll = true;
    }

    if( !doScroll ){
        return;
    }
    var x = e.clientX;
    var y = e.clientY;
    var difX = mouseX - x;
    var difY = mouseY - y;
    mouseX = x;
    mouseY = y;

    var layer0 = document.getElementById( "layer0" );
    var layer1 = document.getElementById( "layer1" );
    var layer2 = document.getElementById( "layer2" );
    var layer3 = document.getElementById( "layer3" );
    var layer4 = document.getElementById( "layer4" );

    var numLeft = parseFloat( layer0.style.marginLeft );
    var numTop = parseFloat( layer0.style.marginTop );
    
    var endNumLeft = numLeft - difX;
    var endNumTop = numTop - difY;

    var absNumLeft = Math.abs( endNumLeft );
    var absNumTop = Math.abs( endNumTop );

    if( differenceCanvasGameWidth - absNumLeft >= 0 ){
        if( endNumLeft > 0 ){
            endNumLeft = 0;
        }
        layer0.style.marginLeft = endNumLeft + "px";
        layer1.style.marginLeft = endNumLeft + "px";
        layer2.style.marginLeft = endNumLeft + "px";
        layer3.style.marginLeft = endNumLeft + "px";
        layer4.style.marginLeft = endNumLeft + "px";
    }

    if( differenceCanvasGameHeight - absNumTop >= 0 ){
        if( endNumTop > 0 ){
            endNumTop = 0;
        }
        layer0.style.marginTop = endNumTop + "px";
        layer1.style.marginTop = endNumTop + "px";
        layer2.style.marginTop = endNumTop + "px";
        layer3.style.marginTop = endNumTop + "px";
        layer4.style.marginTop = endNumTop + "px";    
    }

};

function onMouseUpOnCavas( e ){
    if( !doScroll ){
        var x = e.x;
        var y = e.y;

        console.log( "x: " + x + "; y: " + y );
    }
    doScroll = false;
    doTimeEvent = false;
    timeToClick = 0;
};
