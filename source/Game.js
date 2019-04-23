var Game = (function(){
    function Game( newFps, width, height, canvasLayers, images, gridTileSize, entityParams ){
        //public
        this.width = width;
        this.height = height;
        this.sceneManager = new SceneManager( this, entityParams );
        this.graphicsManager = new GraphicsManager( this, canvasLayers, images, gridTileSize );
        this.fps = newFps;
        this.loopId = null;
        this.onLoop = null;
        this.paused = false;
        this.lastTick = 0;
        this.delta = null;
        this.doubleDelta = null;
        this.currentScale = 1;
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
        this.sceneManager.drawActiveScene();
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

    Game.prototype.tick = function(){
        if ( this.paused ){
            return;
        }

        var time = $.now();
        var deltaTime = ( time - this.lastTick ) * this.currentScale;
        if( deltaTime > this.doubleDelta ) { // ~2*1000/fps;
            deltaTime = this.delta * this.currentScale; // ~1000/fps;
        }

        this.lastTick = time;
        this.update( deltaTime );
        
    };

    Game.prototype.update = function( time ){
        this.sceneManager.update( time );
        this.graphicsManager.update( time );
    };

    Game.prototype.calculateDelta = function(){
        this.delta = 1000/fps;
        this.doubleDelta = 2000/fps;
    };

    Game.prototype.increaseSpeed = function(){
        this.currentScale = Math.floor( this.currentScale * 2 );
        if( this.currentScale > 16 ){
            this.currentScale = 16;
        };
        console.log( "curent speed is " + this.currentScale );
    };

    Game.prototype.decreaseSpeed = function(){
        this.currentScale = Math.floor( this.currentScale / 2 );
        if( this.currentScale < 0.25 ){
            this.currentScale = 0.25;
        };
        console.log( "curent speed is " + this.currentScale );
    };

    //private

    return Game;
}());