var newGame;
var images;
var entityParams;
var gameWidth = 1600;
var gameHeight = 900;
var fps = 30;
var gridHeight = 200;
var gridWidth = 200;
var gridTileSize = 32;
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

function importImages(){
    images = {
        "backgroundTileset": {
            "src": "images/backgroundTileSet.png",
            "backgroundTileData": {
                "crackedEarth" : { 
                    "coordinates" : [ { "x": 0, "y": 0 },{ "x": 32, "y": 0 }, { "x": 64, "y": 0 }, { "x": 96, "y": 0 } ],
                    "tileSize": { "x": 32, "y": 32 }
                },
                "snowEarth" : {
                    "coordinates": [ { "x": 0, "y": 32 },{ "x": 32, "y": 32 }, { "x": 64, "y": 32 }, { "x": 96, "y": 32 } ],
                    "tileSize": { "x": 32, "y": 32 }
                },
                "normalEarth" : {
                    "coordinates": [ { "x": 0, "y": 64 },{ "x": 32, "y": 64 }, { "x": 64, "y": 64 }, { "x": 96, "y": 64 } ],
                    "tileSize": { "x": 32, "y": 32 }
                }, 
                "tundraEarth" : {
                    "coordinates": [ { "x": 0, "y": 96 },{ "x": 32, "y": 96 }, { "x": 64, "y": 96 }, { "x": 96, "y": 96 } ],
                    "tileSize": { "x": 32, "y": 32 }
                }, 
                "tropicsEarth" : {
                    "coordinates": [ { "x": 0, "y": 128 },{ "x": 32, "y": 128 }, { "x": 64, "y": 128 }, { "x": 96, "y": 128 } ],
                    "tileSize": { "x": 32, "y": 32 }
                }, 
                "sandsWater" : {
                    "coordinates": [ { "x": 128, "y": 0 }, { "x": 160, "y": 0 }, { "x": 192, "y": 0 }, { "x": 224, "y": 0 } ],
                    "tileSize": { "x": 32, "y": 32 }
                }, 
                "snowWater" : {
                    "coordinates": [ { "x": 128, "y": 32 }, { "x": 160, "y": 32 }, { "x": 192, "y": 32 }, { "x": 224, "y": 32 } ],
                    "tileSize": { "x": 32, "y": 32 }
                }, 
                "normalWater" : {
                    "coordinates": [ { "x": 128, "y": 64 }, { "x": 160, "y": 64 }, { "x": 192, "y": 64 }, { "x": 224, "y": 64 } ],
                    "tileSize": { "x": 32, "y": 32 }
                }, 
                "tropicsWater" : {
                    "coordinates": [ { "x": 128, "y": 128 }, { "x": 160, "y": 128 }, { "x": 192, "y": 128 }, { "x": 224, "y": 128 } ],
                    "tileSize": { "x": 32, "y": 32 }
                }, 
                "snowRockyGround" : {
                    "coordinates": [ { "x": 128, "y": 96 }, { "x": 160, "y": 96 }, { "x": 192, "y": 96 }, { "x": 224, "y": 96 } ],
                    "tileSize": { "x": 32, "y": 32 }
                }, 
                "tundraRockyGround" : {
                    "coordinates": [ { "x": 128, "y": 96 }, { "x": 160, "y": 96 }, { "x": 192, "y": 96 }, { "x": 224, "y": 96 } ],
                    "tileSize": { "x": 32, "y": 32 }
                }, 
                "normalRockyGround" : {
                    "coordinates": [ { "x": 128, "y": 96 }, { "x": 160, "y": 96 }, { "x": 192, "y": 96 }, { "x": 224, "y": 96 } ],
                    "tileSize": { "x": 32, "y": 32 }
                }, 
                "tropicsRockyGround" : {
                    "coordinates": [ { "x": 128, "y": 96 }, { "x": 160, "y": 96 }, { "x": 192, "y": 96 }, { "x": 224, "y": 96 } ],
                    "tileSize": { "x": 32, "y": 32 }
                }, 
                "sandsRockyGround" : {
                    "coordinates":  [ { "x": 128, "y": 96 }, { "x": 160, "y": 96 }, { "x": 192, "y": 96 }, { "x": 224, "y": 96 } ],
                    "tileSize": { "x": 32, "y": 32 }
                }
            }
        },

        "backgroundObjectsTileset": {
            "src": "images/backgroundObjectsTileset.png",
            "backgroundObjectTileData": {
                "tree" : {
                    "coordinates": [ { "x": 0, "y": 0 } ],
                    "tileSize": { "x": 0, "y": 0 }
                },
                "snow" : {
                    "coordinates": [ { "x": 0, "y": 0 } ],
                    "tileSize": { "x": 0, "y": 0 }
                },
                "sand" : {
                    "coordinates": [ { "x": 0, "y": 0 } ],
                    "tileSize": { "x": 0, "y": 0 }
                },
                "tundraGrass" : {
                    "coordinates": [ { "x": 0, "y": 0 } ],
                    "tileSize": { "x": 0, "y": 0 }
                },
                "normalGrass" : {
                    "coordinates": [ { "x": 0, "y": 0 } ],
                    "tileSize": { "x": 0, "y": 0 }
                },
                "tropicsGrass" : {
                    "coordinates": [ { "x": 0, "y": 0 } ],
                    "tileSize": { "x": 0, "y": 0 }
                }
            }
        },

        "foregroundObjectsTileSet": {
            "src": "images/foregroundTileSet.png",
            "backgroundObjectTileData": {
                "woodenDoor" : {
                    "coordinates": [ { "x": 0, "y": 0 } ],
                    "tileSize": { "x": 0, "y": 0 }
                }
            }
        },

        "effectsTileset": {
            "src": "images/effectsTileSet.png",
            "effectsTileData": {
                "snow": {
                    "coordinates": [ { "x": 0, "y": 0 } ],
                    "tileSize": { "x": 32, "y": 32 } 
                },
                "grass": {
                    "coordinates": [ { "x": 0, "y": 0 } ],
                    "tileSize": { "x": 32, "y": 32 } 
                },
                "sand": {
                    "coordinates": [ { "x": 0, "y": 0 } ],
                    "tileSize": { "x": 32, "y": 32 } 
                }
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
                        "simple": {
                            "snowTree1":{ "phases": 1 },
                            "snowTree2":{ "phases": 1 }
                        },
                        "food": {

                        }                        
                    },
                    "tundra":{
                        "simple": {
                            "cedar":{ "phases": 3, "changeNextPhase": 10, "maxDays": 36000 }, // кедр tundra
                            "spruce":{ "phases": 3, "changeNextPhase": 10, "maxDays": 36000 }, // ель tundra
                            "tundraTree":{ "phases": 3, "changeNextPhase": 10, "maxDays": 36000 }
                        },
                        "food": {
                            "yablonya": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000 },
                            "sliva": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000 }
                        }
                    },
                    "normal":{
                        "simple": {
                            "oak":{ "phases": 3, "changeNextPhase": 10, "maxDays": 36000 }, // дуб normal
                            "hazel":{ "phases": 3, "changeNextPhase": 10, "maxDays": 36000 } //орешник normal
                        },
                        "food": {
                            "normalFoodTree":{ "phases": 3, "changeNextPhase": 10, "maxDays": 36000 }, //food
                            "normalFoodTree":{ "phases": 3, "changeNextPhase": 10, "maxDays": 36000 } //food
                        }
                    },
                    "tropics":{
                        "simple": {
                            "terminalia":{ "phases": 3, "changeNextPhase": 10, "maxDays": 36000 }, // терминалия tropics
                            "teak":{ "phases": 3, "changeNextPhase": 10, "maxDays": 36000 }, // дальбергия tropics
                            "tropicsTree": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000 }
                        },
                        "food": {
                            "tropicsFoodTree1":{ "phases": 3, "changeNextPhase": 10, "maxDays": 36000 }, //food
                            "tropicsFoodTree2":{ "phases": 3, "changeNextPhase": 10, "maxDays": 36000 } //food
                        }
                    },
                    "sands":{
                        "simple":{
                            "saxaul":{ "phases": 3, "changeNextPhase": 10, "maxDays": 36000 }, // саксаул sands
                            "sandTree1": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000 },
                            "sandTree2": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000 }
                        },
                        "food": {
                            "palm": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000 }, // пальмы sands food
                            "sandsFoodTree": { "phases": 3, "changeNextPhase": 10, "maxDays": 36000 }
                        }   
                    }
                },
                "bush":{
                    "snow":{
                        "simple": {
                            "snowBush1":{ "phases": 1, "changeNextPhase": 10, "maxDays": 36000 },
                            "snowBush2":{ "phases": 1, "changeNextPhase": 10, "maxDays": 36000 }
                        },
                        "food":{

                        }
                    },
                    "tundra":{
                        "simple": {
                            "tundraBush1":{ "phases": 1, "changeNextPhase": 10, "maxDays": 36000 },
                            "tundraBush2":{ "phases": 1, "changeNextPhase": 10, "maxDays": 36000 },
                        },
                        "food":{
                            "tundraFoodBush1":{ "phases": 3, "changeNextPhase": 10, "maxDays": 36000 },
                            "tundraFoodBush2":{ "phases": 3, "changeNextPhase": 10, "maxDays": 36000 }
                        }
                    },
                    "normal":{
                        "simple": {
                            "normalBush1":{ "phases": 1, "changeNextPhase": 10, "maxDays": 36000 },
                            "normalBush2":{ "phases": 1, "changeNextPhase": 10, "maxDays": 36000 },
                        },
                        "food":{
                            "normalFoodBush1":{ "phases": 3, "changeNextPhase": 10, "maxDays": 36000 },
                            "normalFoodBush2":{ "phases": 3, "changeNextPhase": 10, "maxDays": 36000 }
                        }    
                    },
                    "tropics":{
                        "simple": {
                            "bamboo": { "phases": 1, "changeNextPhase": 10, "maxDays": 36000 }, //бамбук tropics
                            "tropicsBush": { "phases": 1, "changeNextPhase": 10, "maxDays": 36000 }
                        },
                        "food":{
                            "tropicsFoodBush":{ "phases": 3, "changeNextPhase": 10, "maxDays": 36000 },
                            "tropicsFoodBush":{ "phases": 3, "changeNextPhase": 10, "maxDays": 36000 }
                        }  
                    },
                    "sands":{
                        "simple": {
                            "cactus":{ "phases": 1, "changeNextPhase": 10, "maxDays": 36000 }, //кактус sands
                            "sandsBush":{ "phases": 1, "changeNextPhase": 10, "maxDays": 36000 } 
                        },
                        "food":{
                            "sandsFoodBush":{ "phases": 3, "changeNextPhase": 10, "maxDays": 36000 }
                        }
                    }
                }
            }
        }
    }
}

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
        "backgroundObjectLayer": document.getElementById( "layer1" ),
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
            "river": { "amount": 0, "offset": 2 }
        },
        "foreground": {
            "ground":{
                "tree": { "amount": 35 },
                "bush": { "amount": 10 }
            },
            "rock":{
                
            }
            
        }

    } );
    newGame.sceneManager.doActiveScene( newScene );

    var newEntity = newGame.sceneManager.activeScene.createEntity( {
            "type": "tree",
            "graphicsId": 0,
            "components": {
                "lifecycle" :{ "phases": 2, "changeNextPhase": 1, "pointToChangeDay": 1000, "maxDays": 2 },
                "position" : { "x": 0, "y": 0 }
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
