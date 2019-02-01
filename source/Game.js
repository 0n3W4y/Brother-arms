var Game = (function(){
    function Game( newFps, width, height, canvasLayers, images ){
        //public
        this.width = width;
        this.height = height;
        this.sceneManager = new SceneManager( this );
        this.graphicsManager = new GraphicsManager( this, canvasLayers, images );
        this.fps = newFps;
        this.loopId = null;
        this.onLoop = null;
        this.paused = false;
        this.lastTick = 0;
        this.delta = null;
        this.doubleDelta = null;
        this.calculateDelta();
    }

    Game.prototype.start = function(){
        if( this.loopId ) {
            console.log( "Game already started." );
            return;
        }

        //prepare graphics, and put images to canvas;
        //TODO: from graphicsManager do draw images to canvas.

        this.loopId = window.setInterval(this.tick.bind( this ), this.delta);
        this.onLoop = $.now();
        console.log( "Game started" );
    };

    Game.prototype.stop = function(){
        if ( this.loopId ) {
            clearInterval( this.loopId );
            this.loopId = null;
            console.log( "Game stopped." );
        }else{
             console.log( "Game are not started yet." );
            return;
        }
    };

    Game.prototype.pause = function(){
        if( this.paused ){
            this.paused = false;
            console.log( "Unpaused" );
        }else{
            this.paused = true;
            console.log( "Paused" );
        }
    };
    
    Game.prototype.changeFps = function( newFps ) {
        this.stop();
        this.fps = newFps;
        this.calculateDelta();
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

    Game.prototype.tick = function(){
        if ( this.paused ){
            return;
        }

        var time = $.now();
        var deltaTime = time - this.lastTick;
        if( deltaTime > this.doubleDelta ) { // ~2*1000/fps;
            deltaTime = this.delta; // ~1000/fps;
        }

        this.lastTick = time;
        this.update( deltaTime );
        
    };

    Game.prototype.update = function( time ){
        this.sceneManager.update( time );
    };

    Game.prototype.calculateDelta = function(){
        this.delta = 1000/fps;
        this.doubleDelta = 2000/fps;
    };   

    //private

    return Game;
}());