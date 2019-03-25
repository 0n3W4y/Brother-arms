var newGame;
var images;
var entityParams;
var gameWidth = 1600;
var gameHeight = 900;
var fps = 30;
var gridHeight = 200;
var gridWidth = 200;
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
            "ground":{
                "tree": { "amount": 35 },
                "bush": { "amount": 10 },
                "metalList": { "amount": 0 }
            },
            "rock":{
                "rock": { "amount": 100 }
            },
            "water":{

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
                        "coordinates": [ { "x": 0, "y": 0 } ],
                        "tileSize": { "x": 0, "y": 0 }
                    }
                },
                "tundra":{
                    "grass" : {
                        "coordinates": [ { "x": 0, "y": 0 } ],
                        "tileSize": { "x": 0, "y": 0 }
                    },
                },
                "normal":{
                    "grass" : {
                        "coordinates": [ { "x": 0, "y": 0 } ],
                        "tileSize": { "x": 0, "y": 0 }
                    },
                },
                "tropics":{
                    "grass" : {
                        "coordinates": [ { "x": 0, "y": 0 } ],
                        "tileSize": { "x": 0, "y": 0 }
                    }
                },
                "sands":{
                    "sand" : {
                        "coordinates": [ { "x": 0, "y": 0 } ],
                        "tileSize": { "x": 0, "y": 0 }
                    }
                }  
            }
        },

        "foregroundObjectsTileSet": {
            "src": "images/foregroundTileSet.png",
            "foregroundObjectsTileData": {
                "tree" : {
                    "coordinates": [ { "x": 0, "y": 0 } ],
                    "tileSize": { "x": 0, "y": 0 }
                },
                "bush": {
                    "coordinates": [ { "x": 0, "y": 0 } ],
                    "tileSize": { "x": 0, "y": 0 }
                },
                "woodenDoor" : {
                    "coordinates": [ { "x": 0, "y": 0 } ],
                    "tileSize": { "x": 0, "y": 0 }
                }
            }
        },

        "effectsTileset": {
            "src": "images/effectsTileSet.png",
            "effectsTileData": {}
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
            "src": undefined,
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
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000 },
                            "position": {},
                            "graphics": {},
                            "health": { "torso": 100 }
                        },
                        "snowTree2":{ 
                            "name": { "name": "Snow Tree 2" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000 },
                            "position": {},
                            "graphics": {},
                            "health": { "torso": 100 }
                        },
                        "foodTree": { 
                            "name": { "name": "Snow Food Tree" },
                            "lifecycle": { "phases": 5, "changeNextPhase": 10, "maxDays": 36000 },
                            "position": {},
                            "graphics": {},
                            "health": { "torso": 100 } }                       
                    },
                    "tundra":{
                        "cedar":{ 
                            "name": { "name": "Сedar" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000 },
                            "position": {},
                            "graphics": {},
                            "health": { "torso": 100 }
                        }, // кедр tundra
                        "spruce":{  
                            "name": { "name": "Spruce" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000 },
                            "position": {},
                            "graphics": {},
                            "health": { "torso": 100 }
                        }, // ель tundra
                        "tundraTree":{  
                            "name": { "name": "Tundra tree" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000 },
                            "position": {},
                            "graphics": {},
                            "health": { "torso": 100 }
                        },
                        "yablonya": {  
                            "name": { "name": "Yablonya :D" },
                            "lifecycle": { "phases": 5, "changeNextPhase": 10, "maxDays": 36000 },
                            "position": {},
                            "graphics": {},
                            "health": { "torso": 100 }
                        },
                        "sliva": {  
                            "name": { "name": "Sliva :D" },
                            "lifecycle": { "phases": 5, "changeNextPhase": 10, "maxDays": 36000 },
                            "position": {},
                            "graphics": {},
                            "health": { "torso": 100 }
                        }
                    },
                    "normal":{
                        "oak":{  
                            "name": { "name": "Oak" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000 },
                            "position": {},
                            "graphics": {},
                            "health": { "torso": 100 }
                        }, // дуб normal
                        "hazel":{  
                            "name": { "name": "Hazel" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000 },
                            "position": {},
                            "graphics": {},
                            "health": { "torso": 100 }
                        }, //орешник normal
                        "foodTree":{  
                            "name": { "name": "Food tree" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000 },
                            "position": {},
                            "graphics": {},
                            "health": { "torso": 100 }
                        } //food
                    },
                    "tropics":{
                        "terminalia":{  
                            "name": { "name": "Terminalia" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000 },
                            "position": {},
                            "graphics": {},
                            "health": { "torso": 100 }
                        }, // терминалия tropics
                        "teak":{  
                            "name": { "name": "Teak" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000 },
                            "position": {},
                            "graphics": {},
                            "health": { "torso": 100 }
                        }, // дальбергия tropics
                        "tropicsTree": {  
                            "name": { "name": "Tropics tree" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000 },
                            "position": {},
                            "graphics": {},
                            "health": { "torso": 100 }
                        },
                        "foodTree1":{  
                            "name": { "name": "Food tree" },
                            "lifecycle": { "phases": 5, "changeNextPhase": 10, "maxDays": 36000 },
                            "position": {},
                            "graphics": {},
                            "health": { "torso": 100 }
                        } //food
                    },
                    "sands":{
                        "saxaul":{  
                            "name": { "name": "saxaul" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000 },
                            "position": {},
                            "graphics": {},
                            "health": { "torso": 100 }
                        }, // саксаул sands
                        "sandTree1": {  
                            "name": { "name": "sandTree1" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000 },
                            "position": {},
                            "graphics": {},
                            "health": { "torso": 100 }
                        },
                        "sandTree2": {  
                            "name": { "name": "sandTree2" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000 },
                            "position": {},
                            "graphics": {},
                            "health": { "torso": 100 }
                        },
                        "palm": {  
                            "name": { "name": "palm" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000 },
                            "position": {},
                            "graphics": {},
                            "health": { "torso": 100 }
                        }, // пальмы sands food
                        "foodTree": {  
                            "name": { "name": "foodTree" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000 },
                            "position": {},
                            "graphics": {},
                            "health": { "torso": 100 }
                        }
                    }
                },
                "bush":{
                    "snow":{
                        "bush1":{  
                            "name": { "name": "bush1" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000 },
                            "position": {},
                            "graphics": {},
                            "health": { "torso": 100 }
                        },
                        "bush2":{  
                            "name": { "name": "bush2" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000 },
                            "position": {},
                            "graphics": {},
                            "health": { "torso": 100 }
                        },
                        "foodBush": {  
                            "name": { "name": "foodBush" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000 },
                            "position": {},
                            "graphics": {},
                            "health": { "torso": 100 }
                        }
                    },
                    "tundra":{
                        "bush1":{  
                            "name": { "name": "bush1" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000 },
                            "position": {},
                            "graphics": {},
                            "health": { "torso": 100 }
                        },
                        "bush2":{  
                            "name": { "name": "bush2" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000 },
                            "position": {},
                            "graphics": {},
                            "health": { "torso": 100 }
                        },
                        "foodBush":{  
                            "name": { "name": "foodBush" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000 },
                            "position": {},
                            "graphics": {},
                            "health": { "torso": 100 }
                        }
                    },
                    "normal":{
                        "bush1":{  
                            "name": { "name": "bush1" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000 },
                            "position": {},
                            "graphics": {},
                            "health": { "torso": 100 }
                        },
                        "bush1":{  
                            "name": { "name": "bush1" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000 },
                            "position": {},
                            "graphics": {},
                            "health": { "torso": 100 }
                        },
                        "foodBush":{  
                            "name": { "name": "foodBush" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000 },
                            "position": {},
                            "graphics": {},
                            "health": { "torso": 100 }
                        }   
                    },
                    "tropics":{
                        "bush1": {  
                            "name": { "name": "bush1" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000 },
                            "position": {},
                            "graphics": {},
                            "health": { "torso": 100 }
                        }, //бамбук tropics
                        "bush2": {  
                            "name": { "name": "bush2" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000 },
                            "position": {},
                            "graphics": {},
                            "health": { "torso": 100 }
                        },
                        "foodBush":{  
                            "name": { "name": "foodBush" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000 },
                            "position": {},
                            "graphics": {},
                            "health": { "torso": 100 }
                        } 
                    },
                    "sands":{
                        "bush1":{  
                            "name": { "name": "bush1", "surname":"" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000, "canDie": false, "day":[ 1, 29 ] },
                            "position": {},
                            "graphics": {},
                            "health": { "torso": 100 }
                        }, //кактус sands
                        "bush2":{  
                            "name": { "name": "bush2" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000 },
                            "position": {},
                            "graphics": {},
                            "health": { "torso": 100 }
                        },
                        "foodBush":{  
                            "name": { "name": "foodBush" },
                            "lifecycle": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000 },
                            "position": {},
                            "graphics": {},
                            "health": { "torso": 100 }
                        }
                    }
                }
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
