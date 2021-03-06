var newGame;
var images;
var entityParams;
var gameWidth = 1600;
var gameHeight = 900;
var fps = 30;
var gridHeight = 100;
var gridWidth = 100;
var gridTileSize = 64;
var canvasLayers;
var scriptPathArray = [ 
    "source/Game.js", 
    "source/Tile.js", 
    "source/TileMap.js", 
    "source/Scene.js", 
    "source/SceneManager.js", 
    "source/EntityManager.js", 
    "source/Entity.js", 
    "source/EntityComponents/Move.js", 
    "source/EntityComponents/Health.js",
    "source/EntityComponents/Lifecycle.js",
    "source/EntityComponents/Position.js",
    "source/EntityComponents/Graphics.js",
    "source/EntityComponents/Name.js",
    "source/GraphicsManager.js"
];


importScripts();
importImages();
importEntityParams();


function importScripts(){
    for( var i = 0; i < scriptPathArray.length; i++ ){
        var imported = document.createElement( 'script' );
        imported.src = scriptPathArray[i];
        document.head.appendChild( imported );
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
    document.getElementById( "layer5" ).width = gridWidth * gridTileSize;
    document.getElementById( "layer5" ).height = gridHeight * gridTileSize;

    document.getElementById( "layer5" ).addEventListener( "mousedown", onMouseDownOnCavas, false );
    document.getElementById( "layer5" ).addEventListener( "mouseup", onMouseUpOnCavas, false );
    document.getElementById( "layer5" ).addEventListener( "mousemove", onMouseMoveOnCanvas, false );

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
    document.getElementById( "layer5" ).style.marginTop = "0px";
    document.getElementById( "layer5" ).style.marginLeft = "0px";

    //TODO: so, prepare layers on canvases,
    //import images to this canvases,
    //type functions *onload*

    canvasLayers = {
        "backgroundLayer": document.getElementById( "layer0" ),
        "coverLayer": document.getElementById( "layer1" ),
        "foregroundObjectLayer": document.getElementById( "layer2" ),
        "effectsLayer": document.getElementById( "layer3" ),
        "charactersLayer": document.getElementById( "layer4" ),
        "uiLayer": document.getElementById( "layer5" )
        }


    
};
function gameInit(){
    newGame = new Game( fps, gameWidth, gameHeight, canvasLayers, images, gridTileSize, entityParams );
    var newScene = newGame.sceneManager.createScene( "Unnamed" );
    newScene.createTileMap( { "width": gridWidth, "height": gridHeight } );
    //i'll do only 2 biomes at once, cause in logical sands and snow... magically world :D
    //b.t.w we can do 3 biomes if our tile map can be HUUUUGE;
    newScene.generateBiome( {
        "biomes": {
            "primary": "normal",
            "secondary": "tropics",
            "proportion": 55, // 100% overall;
            "direction": "NS", //North to South;
            "cover": 75 // 75% of biome with grass\snow\sand effects on tile;
        },
        "ground": {
            "rock": { "amount": 15, "offset": 1 }, // 100% overall; total 50, half of playable zone;
            "water": { "amount": 5, "offset": 1 },
            "river": { "amount": 0, "offset": 1 }
        },
        "foreground": {
            "ground": {
                "tree": { "amount": 35 },
                "bush": { "amount": 10 },
                "metalList": { "amount": 0 }
            },
            "rock":{
                "silver": { "amount": 0 },
                "bronze": { "amount": 0 },
                "gold": { "amount": 0 },
                
            },
            "water": {

            }
        }
    } );
    newGame.sceneManager.doActiveScene( newScene );   
};

function importImages(){
    images = {
        "backgroundTileset": {
            "src": "images/backgroundTileSet.png",
            "backgroundTileData": {
                "snow":{
                    "earth" : {
                        "coordinates": [{ "x": 0, "y": 0 }],
                        "tileSize": { "x": 64, "y": 64 }
                    },
                    "water" : {
                        "coordinates": [ { "x": 64, "y": 0 } ],
                        "tileSize": { "x": 64, "y": 64 },
                    },
                    "rock" : {
                        "coordinates": [ { "x": 64, "y": 64 } ],
                        "tileSize": { "x": 64, "y": 64 }
                    }
                },
                "tundra":{
                    "earth" : {
                        "coordinates": [{ "x": 0, "y": 64}],
                        "tileSize": { "x": 64, "y": 64 }
                    },
                    "rock" : {
                        "coordinates": [ { "x": 64, "y": 64 } ],
                        "tileSize": { "x": 64, "y": 64 }
                    },
                    "water" : {
                        "coordinates": [ { "x": 64, "y": 128 } ],
                        "tileSize": { "x": 64, "y": 64 }
                    }
                },
                "normal": {
                    "earth" : {
                        "coordinates": [{ "x": 0, "y": 128 }],
                        "tileSize": { "x": 64, "y": 64 }
                    },
                    "water" : {
                        "coordinates": [ { "x": 64, "y": 128 } ],
                        "tileSize": { "x": 64, "y": 64 }
                    },
                    "rock" : {
                        "coordinates": [ { "x": 64, "y": 64 } ],
                        "tileSize": { "x": 64, "y": 64 }
                    } 
                },
                "tropics": {
                    "earth" : {
                        "coordinates": [{ "x": 0, "y": 192 }], 
                        "tileSize": { "x": 64, "y": 64 }
                    },
                    "water" : {
                        "coordinates": [ { "x": 64, "y": 192 } ],
                        "tileSize": { "x": 64, "y": 64 }
                    },
                    "rock" : {
                        "coordinates": [ { "x": 64, "y": 64 } ],
                        "tileSize": { "x": 64, "y": 64 }
                    }
                },
                "sands": {
                    "earth" : { 
                        "coordinates" : [{ "x": 0, "y": 256 }],
                        "tileSize": { "x": 64, "y": 64 }
                    },
                    "rock" : {
                        "coordinates":  [ { "x": 64, "y": 64 } ],
                        "tileSize": { "x": 64, "y": 64 }
                    },
                    "water" : {
                        "coordinates": [ { "x": 64, "y": 256 } ],
                        "tileSize": { "x": 64, "y": 64 }
                    }
                }   
            }
        },

        "coverTileset": {
            "src": "images/coverTileset.png",
            "coverTileData": {
                "snow":{
                    "snow" : {
                        "coordinates": [ { "x": 192, "y": 0 }, { "x": 192, "y": 64 } ],
                        "tileSize": { "x": 64, "y": 64 }
                    }
                },
                "tundra":{
                    "grass" : {
                        "coordinates": [{ "x": 0, "y": 0 }, { "x": 64, "y": 0 }, { "x": 128, "y": 0 } ],
                        "tileSize": { "x": 64, "y": 128 }
                    },
                },
                "normal":{
                    "grass" : {
                        "coordinates": [ { "x": 0, "y": 0 }, { "x": 64, "y": 0 }, { "x": 128, "y": 0 } ],
                        "tileSize": { "x": 64, "y": 128 }
                    },
                },
                "tropics":{
                    "grass" : {
                        "coordinates": [ { "x": 0, "y": 128 }, { "x": 64, "y": 128 }, { "x": 128, "y": 128 } ],
                        "tileSize": { "x": 64, "y": 128 }
                    }
                },
                "sands":{
                    "sand" : {
                        "coordinates": [ { "x": 192, "y": 128 },{ "x": 192, "y": 192 }  ],
                        "tileSize": { "x": 64, "y": 64 }
                    }
                }  
            }
        },

        "foregroundObjectsTileSet": {
            "src": "images/foregroundTileSet.png",
            "foregroundObjectsTileData": {
                "tree":{
                    "snow":{
                        "snowTree1":{ 
                            "coordinates": [ { "x": 576, "y": 0 }, { "x": 640, "y": 0 }, { "x": 704,"y": 0} ],
                            "tileSize": { "x": 64, "y": 128 }
                        },
                        "snowTree2":{ 
                            "coordinates": [ { "x": 576, "y": 128 }, { "x": 640, "y": 128 }, { "x": 704,"y": 128} ],
                            "tileSize": { "x": 64, "y": 128 }
                        },
                        "foodTree": { 
                            "coordinates": [ { "x": 0, "y": 256 }, { "x": 64, "y": 256 }, { "x": 128, "y": 256 }, { "x": 192, "y": 256 }, { "x": 256, "y": 256 } ],
                            "tileSize": { "x": 64, "y": 128 }
                        }                  
                    },
                    "tundra":{
                        "cedar":{ 
                            "coordinates": [ { "x": 384, "y": 0 }, { "x": 448, "y": 0 }, { "x": 512, "y": 0 } ],
                            "tileSize": { "x": 64, "y": 128 }
                        }, 
                        "spruce":{  
                            "coordinates": [ { "x": 576, "y": 128 }, { "x": 640, "y": 128 }, { "x": 704,"y": 128} ],
                            "tileSize": { "x": 64, "y": 128 }
                        },
                        "yablonya": { 
                            "coordinates": [ { "x": 0, "y": 256 }, { "x": 64, "y": 256 }, { "x": 128, "y": 256 }, { "x": 192, "y": 256 }, { "x": 256, "y": 256 } ],
                            "tileSize": { "x": 64, "y": 128 }
                        }
                    },
                    "normal":{
                        "oak":{  
                            "coordinates": [ { "x": 384, "y": 0 }, { "x": 448, "y": 0 }, { "x": 512, "y": 0 } ],
                            "tileSize": { "x": 64, "y": 128 }
                        }, 
                        "hazel":{  
                            "coordinates": [ { "x": 192, "y": 128 }, { "x": 256, "y": 128 }, { "x": 320, "y": 128 } ],
                            "tileSize": { "x": 64, "y": 128 }
                        }, 
                        "foodTree":{  
                            "coordinates": [ { "x": 0, "y": 384 }, { "x": 64, "y": 384 }, { "x": 128, "y": 384 }, { "x": 192, "y": 384 }, { "x": 256, "y": 384 } ],
                            "tileSize": { "x": 64, "y": 128 }
                        }
                    },
                    "tropics":{
                        "terminalia":{  
                            "coordinates": [ { "x": 384, "y": 128 }, { "x": 448, "y": 128 }, { "x": 512, "y": 128 } ],
                            "tileSize": { "x": 64, "y": 128 }
                        },
                        "teak":{  
                            "coordinates": [ { "x": 0, "y": 0 }, { "x": 64, "y": 0 }, { "x": 128, "y": 0 } ],
                            "tileSize": { "x": 64, "y": 128 }
                        },
                        "foodTree":{  
                            "coordinates": [ { "x": 0, "y": 384 }, { "x": 64, "y": 384 }, { "x": 128, "y": 384 }, { "x": 192, "y": 384 }, { "x": 256, "y": 384 } ],
                            "tileSize": { "x": 64, "y": 128 }
                        } 
                    },
                    "sands":{
                        "saxaul":{  
                            "coordinates": [ { "x": 0, "y": 128 }, { "x": 64, "y": 128 }, { "x": 128, "y": 128 } ],
                            "tileSize": { "x": 64, "y": 128 }
                        },
                        "palm": {  
                            "coordinates": [ { "x": 0, "y": 0 }, { "x": 64, "y": 0 }, { "x": 128, "y": 0 } ],
                            "tileSize": { "x": 64, "y": 128 }
                        },
                        "foodTree": {  
                            "coordinates": [ { "x": 0, "y": 384 }, { "x": 64, "y": 384 }, { "x": 128, "y": 384 }, { "x": 192, "y": 384 }, { "x": 256, "y": 384 } ],
                            "tileSize": { "x": 64, "y": 128 }
                        }
                    }
                },
                "bush":{
                    "snow":{
                        "bush1":{  
                            "coordinates": [ { "x": 320, "y": 384 }, { "x": 384, "y": 384 }, { "x": 448, "y": 384 } ],
                            "tileSize": { "x": 64, "y": 64 }
                        },
                        "bush2":{  
                            "coordinates": [ { "x": 320, "y": 448 }, { "x": 384, "y": 448 }, { "x": 448, "y": 448 } ],
                            "tileSize": { "x": 64, "y": 64 }
                        },
                        "foodBush": {  
                            "coordinates": [ { "x": 320, "y": 256 }, { "x": 384, "y": 256 }, { "x": 448, "y": 256 }, { "x": 512, "y": 256 }, { "x": 576, "y": 256 } ],
                            "tileSize": { "x": 64, "y": 64 }
                        }
                    },
                    "tundra":{
                        "bush1":{  
                            "coordinates": [ { "x": 320, "y": 384 }, { "x": 384, "y": 384 }, { "x": 448, "y": 384 } ],
                            "tileSize": { "x": 64, "y": 64 }
                        },
                        "bush2":{  
                            "coordinates": [ { "x": 320, "y": 448 }, { "x": 384, "y": 448 }, { "x": 448, "y": 448 } ],
                            "tileSize": { "x": 64, "y": 64 }
                        },
                        "foodBush":{  
                            "coordinates": [ { "x": 320, "y": 256 }, { "x": 384, "y": 256 }, { "x": 448, "y": 256 }, { "x": 512, "y": 256 }, { "x": 576, "y": 256 } ],
                            "tileSize": { "x": 64, "y": 64 }
                        }
                    },
                    "normal":{
                        "bush1":{  
                            "coordinates": [ { "x": 320, "y": 384 }, { "x": 384, "y": 384 }, { "x": 448, "y": 384 } ],
                            "tileSize": { "x": 64, "y": 64 }
                        },
                        "bush1":{  
                            "coordinates": [ { "x": 320, "y": 448 }, { "x": 384, "y": 448 }, { "x": 448, "y": 448 } ],
                            "tileSize": { "x": 64, "y": 64 }
                        },
                        "foodBush":{  
                           "coordinates": [ { "x": 320, "y": 320 }, { "x": 384, "y": 320 }, { "x": 448, "y": 320 }, { "x": 512, "y": 320 }, { "x": 576, "y": 320 } ],
                            "tileSize": { "x": 64, "y": 64 }
                        }   
                    },
                    "tropics":{
                        "bush1": {  
                            "coordinates": [ { "x": 320, "y": 384 }, { "x": 384, "y": 384 }, { "x": 448, "y": 384 } ],
                            "tileSize": { "x": 64, "y": 64 }
                        },
                        "bush2": {  
                            "coordinates": [ { "x": 320, "y": 448 }, { "x": 384, "y": 448 }, { "x": 448, "y": 448 } ],
                            "tileSize": { "x": 64, "y": 64 }
                        },
                        "foodBush":{  
                            "coordinates": [ { "x": 320, "y": 320 }, { "x": 384, "y": 320 }, { "x": 448, "y": 320 }, { "x": 512, "y": 320 }, { "x": 576, "y": 320 } ],
                            "tileSize": { "x": 64, "y": 64 }
                        } 
                    },
                    "sands":{
                        "bush1":{  
                            "coordinates": [ { "x": 320, "y": 384 }, { "x": 384, "y": 384 }, { "x": 448, "y": 384 } ],
                            "tileSize": { "x": 64, "y": 64 }
                        },
                        "bush2":{  
                            "coordinates": [ { "x": 320, "y": 448 }, { "x": 384, "y": 448 }, { "x": 448, "y": 448 } ],
                            "tileSize": { "x": 64, "y": 64 }
                        },
                        "foodBush":{  
                            "coordinates": [ { "x": 320, "y": 320 }, { "x": 384, "y": 320 }, { "x": 448, "y": 320 }, { "x": 512, "y": 320 }, { "x": 576, "y": 320 } ],
                            "tileSize": { "x": 64, "y": 64 }
                        }
                    }
                },
            }
        },

        "effectsTileset": {
            "src": "images/effectsTileSet.png",
            "effectsTileData": {

            }
        },  

        "charactersTileset": {
            "src": "images/charactersTileSet.png",
            "charactersTileData": {
                "goblin" : {
                    "coordinates":  [ { "x": 0, "y": 0}, { "x": 64, "y": 0 }, { "x": 32, "y": 32 }, { "x": 0, "y": 64 } ],
                    "tileSize": { "x": 32, "y": 32 }
                },
                "human" : {
                    "coordinates":  [ { "x": 32, "y": 0 }, { "x": 0, "y": 32 }, { "x": 64, "y": 32 } ],
                    "tileSize": { "x": 32, "y": 32 }
                }
            }
        },

        "uiTileset":{
            "src": "images/uiTileset.png",
            "uiTileData": {
                
            }
        }
    }
};

function importEntityParams(){
    entityParams = {
        "alive":{},
        "objects":{
            "resources":{
                "tree":{
                    "snow":{
                        "snowTree1":{ 
                            "name": { "name": "Snow Tree 1" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000, "canDie": false, "day":[ 1, 29 ] },
                            "position": { "x": 0, "y": 0 },
                            "graphics": {},
                            "health": { "torso": 100 }
                        },
                        "snowTree2":{ 
                            "name": { "name": "Snow Tree 2" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000, "canDie": false, "day":[ 1, 29 ] },
                            "position": { "x": 0, "y": 0 },
                            "graphics": {},
                            "health": { "torso": 100 }
                        },
                        "foodTree": { 
                            "name": { "name": "Snow Food Tree" },
                            "lifecycle": { "phases": 5, "changeNextPhase": 10, "maxDays": 36000, "canDie": false, "day":[ 1, 29 ] },
                            "position": { "x": 0, "y": 0 },
                            "graphics": {},
                            "health": { "torso": 100 }
                        }                  
                    },
                    "tundra":{
                        "cedar":{ 
                            "name": { "name": "Сedar" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000, "canDie": false, "day":[ 1, 29 ] },
                            "position": { "x": 0, "y": 0 },
                            "graphics": {},
                            "health": { "torso": 100 }
                        }, 
                        "spruce":{  
                            "name": { "name": "Spruce" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000, "canDie": false, "day":[ 1, 29 ] },
                            "position": { "x": 0, "y": 0 },
                            "graphics": {},
                            "health": { "torso": 100 }
                        },
                        "yablonya": {  
                            "name": { "name": "Yablonya :D" },
                            "lifecycle": { "phases": 5, "changeNextPhase": 10, "maxDays": 36000, "canDie": false, "day":[ 1, 29 ] },
                            "position": { "x": 0, "y": 0 },
                            "graphics": {},
                            "health": { "torso": 100 }
                        },
                    },
                    "normal":{
                        "oak":{  
                            "name": { "name": "Oak" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000, "canDie": false, "day":[ 1, 29 ] },
                            "position": { "x": 0, "y": 0 },
                            "graphics": {},
                            "health": { "torso": 100 }
                        }, 
                        "hazel":{  
                            "name": { "name": "Hazel" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000, "canDie": false, "day":[ 1, 29 ] },
                            "position": {"x": 0, "y": 0},
                            "graphics": {},
                            "health": { "torso": 100 }
                        },
                        "foodTree":{  
                            "name": { "name": "Food tree" },
                            "lifecycle": { "phases": 5, "changeNextPhase": 10, "maxDays": 36000, "canDie": false, "day":[ 1, 29 ] },
                            "position": {"x": 0, "y": 0},
                            "graphics": {},
                            "health": { "torso": 100 }
                        }
                    },
                    "tropics":{
                        "terminalia":{  
                            "name": { "name": "Terminalia" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000, "canDie": false, "day":[ 1, 29 ] },
                            "position": {"x": 0, "y": 0},
                            "graphics": {},
                            "health": { "torso": 100 }
                        }, 
                        "teak":{  
                            "name": { "name": "Teak" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000, "canDie": false, "day":[ 1, 29 ] },
                            "position": {"x": 0, "y": 0},
                            "graphics": {},
                            "health": { "torso": 100 }
                        },
                        "foodTree":{  
                            "name": { "name": "Food tree" },
                            "lifecycle": { "phases": 5, "changeNextPhase": 10, "maxDays": 36000, "canDie": false, "day":[ 1, 29 ] },
                            "position": {"x": 0, "y": 0},
                            "graphics": {},
                            "health": { "torso": 100 }
                        } 
                    },
                    "sands":{
                        "saxaul":{  
                            "name": { "name": "saxaul" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000, "canDie": false, "day":[ 1, 29 ] },
                            "position": {"x": 0, "y": 0},
                            "graphics": {},
                            "health": { "torso": 100 }
                        },
                        "palm": {  
                            "name": { "name": "palm" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000, "canDie": false, "day":[ 1, 29 ] },
                            "position": { "x": 0, "y": 0 },
                            "graphics": {},
                            "health": { "torso": 100 }
                        },
                        "foodTree": {  
                            "name": { "name": "Food tree" },
                            "lifecycle": { "phases": 5, "changeNextPhase": 10, "maxDays": 36000, "canDie": false, "day":[ 1, 29 ] },
                            "position": { "x": 0, "y": 0 },
                            "graphics": {},
                            "health": { "torso": 100 }
                        }
                    }
                },
                "bush":{
                    "snow":{
                        "bush1":{  
                            "name": { "name": "bush1" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000, "canDie": false, "day":[ 1, 29 ] },
                            "position": { "x": 0, "y": 0 },
                            "graphics": {},
                            "health": { "torso": 100 }
                        },
                        "bush2":{  
                            "name": { "name": "bush2" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000, "canDie": false, "day":[ 1, 29 ] },
                            "position": { "x": 0, "y": 0 },
                            "graphics": {},
                            "health": { "torso": 100 }
                        },
                        "foodBush": {  
                            "name": { "name": "foodBush" },
                            "lifecycle": { "phases": 5, "changeNextPhase": 10, "maxDays": 36000, "canDie": false, "day":[ 1, 29 ] },
                            "position": { "x": 0, "y": 0 },
                            "graphics": {},
                            "health": { "torso": 100 }
                        }
                    },
                    "tundra":{
                        "bush1":{  
                            "name": { "name": "bush1" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000, "canDie": false, "day":[ 1, 29 ] },
                            "position": { "x": 0, "y": 0 },
                            "graphics": {},
                            "health": { "torso": 100 }
                        },
                        "bush2":{  
                            "name": { "name": "bush2" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000, "canDie": false, "day":[ 1, 29 ] },
                            "position": { "x": 0, "y": 0 },
                            "graphics": {},
                            "health": { "torso": 100 }
                        },
                        "foodBush":{  
                            "name": { "name": "foodBush" },
                            "lifecycle": { "phases": 5, "changeNextPhase": 10, "maxDays": 36000, "canDie": false, "day":[ 1, 29 ] },
                            "position": { "x": 0, "y": 0 },
                            "graphics": {},
                            "health": { "torso": 100 }
                        }
                    },
                    "normal":{
                        "bush1":{  
                            "name": { "name": "bush1" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000, "canDie": false, "day":[ 1, 29 ] },
                            "position": { "x": 0, "y": 0 },
                            "graphics": {},
                            "health": { "torso": 100 }
                        },
                        "bush1":{  
                            "name": { "name": "bush1" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000, "canDie": false, "day":[ 1, 29 ] },
                            "position": { "x": 0, "y": 0 },
                            "graphics": {},
                            "health": { "torso": 100 }
                        },
                        "foodBush":{  
                            "name": { "name": "foodBush" },
                            "lifecycle": { "phases": 5, "changeNextPhase": 10, "maxDays": 36000, "canDie": false, "day":[ 1, 29 ] },
                            "position": { "x": 0, "y": 0 },
                            "graphics": {},
                            "health": { "torso": 100 }
                        }   
                    },
                    "tropics":{
                        "bush1": {  
                            "name": { "name": "bush1" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000, "canDie": false, "day":[ 1, 29 ] },
                            "position": { "x": 0, "y": 0 },
                            "graphics": {},
                            "health": { "torso": 100 }
                        },
                        "bush2": {  
                            "name": { "name": "bush2" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000, "canDie": false, "day":[ 1, 29 ] },
                            "position": { "x": 0, "y": 0 },
                            "graphics": {},
                            "health": { "torso": 100 }
                        },
                        "foodBush":{  
                            "name": { "name": "foodBush" },
                            "lifecycle": { "phases": 5, "changeNextPhase": 10, "maxDays": 36000, "canDie": false, "day":[ 1, 29 ] },
                            "position": { "x": 0, "y": 0 },
                            "graphics": {},
                            "health": { "torso": 100 }
                        } 
                    },
                    "sands":{
                        "bush1":{  
                            "name": { "name": "bush1", "surname":"" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000, "canDie": false, "day":[ 1, 29 ] },
                            "position": { "x": 0, "y": 0 },
                            "graphics": {},
                            "health": { "torso": 100 }
                        },
                        "bush2":{  
                            "name": { "name": "bush2" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000, "canDie": false, "day":[ 1, 29 ] },
                            "position": { "x": 0, "y": 0 },
                            "graphics": {},
                            "health": { "torso": 100 }
                        },
                        "foodBush":{  
                            "name": { "name": "foodBush" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000, "canDie": false, "day":[ 1, 29 ] },
                            "position": { "x": 0, "y": 0 },
                            "graphics": {},
                            "health": { "torso": 100 }
                        }
                    }
                },
                "rock":{},
                "silver":{},
                "gold":{},
                "bronze":{}
            }
        }
    }
};
//REMOVE THIS:
var mouseX;
var mouseY;
var timeToClick = 0;
var doScroll = false;
var doTimeEvent = false;
var differenceCanvasGameWidth;
var differenceCanvasGameHeight;
var currentScale = 0;

function zoomIn(){
    currentScale++;
    if( currentScale > 0 ){
        currentScale = 0;
        return;
    };
    document.getElementById( "layer0" ).getContext( "2d" ).clearRect(0, 0, document.getElementById( "layer0" ).width, document.getElementById( "layer0" ).height );
    document.getElementById( "layer0" ).getContext( "2d" ).scale(2, 2);
    newGame.graphicsManager.layer0NeedToUpdate = true;

    document.getElementById( "layer1" ).getContext( "2d" ).clearRect(0, 0, document.getElementById( "layer1" ).width, document.getElementById( "layer1" ).height );
    document.getElementById( "layer1" ).getContext( "2d" ).scale(2, 2);
    newGame.graphicsManager.layer1NeedToUpdate = true;

    //document.getElementById( "layer2" ).getContext( "2d" ).clearRect(0, 0, document.getElementById( "layer2" ).width, document.getElementById( "layer2" ).height );
    //document.getElementById( "layer2" ).getContext( "2d" ).scale(2, 2);
    //newGame.graphicsManager.layer2NeedToUpdate = true;

    //document.getElementById( "layer3" ).getContext( "2d" ).clearRect(0, 0, document.getElementById( "layer3" ).width, document.getElementById( "layer3" ).height );
    //document.getElementById( "layer3" ).getContext( "2d" ).scale(2, 2);
    //newGame.graphicsManager.layer3NeedToUpdate = true;

    //document.getElementById( "layer4" ).getContext( "2d" ).clearRect(0, 0, document.getElementById( "layer4" ).width, document.getElementById( "layer4" ).height );
    //document.getElementById( "layer4" ).getContext( "2d" ).scale(2, 2);
    //newGame.graphicsManager.layer4NeedToUpdate = true;
   //TODO: функция для прокрутки.
   
};

function zoomOut(){
    currentScale--;
    if( currentScale < -4 ){ // 4x zoom out;
        currentScale = -4;
        return;
    };
    document.getElementById( "layer0" ).getContext( "2d" ).clearRect(0, 0, document.getElementById( "layer0" ).width, document.getElementById( "layer0" ).height );
    document.getElementById( "layer0" ).getContext( "2d" ).scale(0.5, 0.5);
    newGame.graphicsManager.layer0NeedToUpdate = true;

    document.getElementById( "layer1" ).getContext( "2d" ).clearRect(0, 0, document.getElementById( "layer1" ).width, document.getElementById( "layer1" ).height );
    document.getElementById( "layer1" ).getContext( "2d" ).scale(0.5, 0.5);
    newGame.graphicsManager.layer1NeedToUpdate = true;

    //document.getElementById( "layer2" ).getContext( "2d" ).clearRect(0, 0, document.getElementById( "layer2" ).width, document.getElementById( "layer2" ).height );
    //document.getElementById( "layer2" ).getContext( "2d" ).scale(0.5, 0.5);
    //newGame.graphicsManager.layer2NeedToUpdate = true;

    //document.getElementById( "layer3" ).getContext( "2d" ).clearRect(0, 0, document.getElementById( "layer3" ).width, document.getElementById( "layer3" ).height );
    //document.getElementById( "layer3" ).getContext( "2d" ).scale(0.5, 0.5);
    //newGame.graphicsManager.layer3NeedToUpdate = true;

    //document.getElementById( "layer4" ).getContext( "2d" ).clearRect(0, 0, document.getElementById( "layer4" ).width, document.getElementById( "layer4" ).height );
    //document.getElementById( "layer4" ).getContext( "2d" ).scale(0.5, 0.5);
    //newGame.graphicsManager.layer4NeedToUpdate = true;
};

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
    var layer5 = document.getElementById( "layer5" );

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
        layer5.style.marginLeft = endNumLeft + "px";
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
        layer5.style.marginTop = endNumTop + "px";   
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