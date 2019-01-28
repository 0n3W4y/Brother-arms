var Game = (function(){
    function Game( newFps, width, height, tableBlock, images ){
        //public
        this.width = width;
        this.height = height;
        this.sceneManager = new SceneManager( this );
        this.graphicsManager = new GraphicsManager( this, tableBlock, images );
        var gameThis = this;
        init( newFps, gameThis);
    }

    Game.prototype.start = function(){
        startLoop( this );
    };

    Game.prototype.stop = function(){
        stopLoop();
    };

    Game.prototype.pause = function(){
        togglePause();
    };
    
    Game.prototype.changeFps = function( newFps ) {
        this.stop();
        fps = newFps;
        calculateDelta();
        this.start();
    };

    Game.prototype.getManager = function( manager ){
        if( manager == "graphics" ){
            return this.graphicsManager;
        }else if( manager == "scene" ){
            return this.sceneManager;
        }else{
            console.log( "Error in Game.getManager, unknown manager: " + manager );
        }
    };

    Game.prototype.changeGrid = function(){
        this.graphicsManager.changeGrid();
    };

    //private
    var thisGame = null;
    var fps = null;

    var loopId = null;
    var onLoop = null;
    var paused = false;
    var lastTick = 0;

    var delta = null;
    var doubleDelta = null;

    var inited = false;

    var init = function( newFps, gameThis ){
        if( !inited ){
            fps = newFps;
            thisGame = gameThis;
            calculateDelta();
            inited = true;
        }else{
            console.log( "Game already inited." );
            return;
        }
    };

    var calculateDelta = function(){
        delta = 1000/fps;
        doubleDelta = 2000/fps;
    };

    var startLoop = function( gameThis ){
        if( loopId ) {
            console.log( "Game already started." );
            return;
        }

        loopId = window.setInterval(tick.bind( gameThis ), delta);
        onLoop = $.now();
        console.log( "Game started" );
    };

    var stopLoop = function(){
            if ( loopId ) {
                clearInterval( loopId );
                loopId = null;
                console.log( "Game stopped." );
            }else{
                console.log( "Game are not started yet." );
                return;
            }
    };

    var togglePause = function() {
        if( paused ){
            paused = false;
            console.log( "Unpaused" );
        }else{
            paused = true;
            console.log( "Paused" );
        }
    };

    var tick = function(){
        if ( paused ){
            return;
        }

        var time = $.now();
        var deltaTime = time - lastTick;
        if( deltaTime > doubleDelta ) { // ~2*1000/fps;
            deltaTime = delta; // ~1000/fps;
        }

        update( delta );
        lastTick = time;
    };

    var update = function( time ){
        thisGame.sceneManager.update( time );
    };

    return Game;
}());