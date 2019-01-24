var Game = (function(){
    function Game( newFps, width, height ){
        //public

        this.width = width;
        this.height = height;
        this.sceneManager = new SceneManager( this );
        this.entityManager = new EntityManager( this );
        init( newFps );
    }

    Game.prototype.start = function(){
        startLoop();
    };

    Game.prototype.stop = function(){
        stopLoop();
    };

    Game.prototype.pause = function(){
        togglePause();
    };
    
    Game.prototype.changeFps = function( newFps ) {
        fps = newFps;
        calculateDelta();
    };

    //private
    var fps = null;

    var loopId = null;
    var onLoop = null;
    var paused = false;
    var lastTick = 0;

    var delta = null;
    var dobuleDelta = null;

    var inited = false;

    var init = function( newFps ){
        if( !inited ){
            fps = newFps;
            calculateDelta();
            inited = true;
        }else{
            console.log( "Game already inited." );
            return;
        }
    };

    var calculateDelta = function(){
        delta = 1000/fps;
        dobuleDelta = 2000/fps;
    };

    var startLoop = function(){
        if( loopId ) {
            console.log( "Game already started." );
            return;
        }

        loopId = window.setInterval(tick.bind(this), delta);
        onLoop = $.now();
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
        if( paused )
            paused = false;
        else
            paused = true;
    };

    var tick = function(){
        if ( paused ){
            return;
        }

        var time = $.now();
        var deltaTime = time - lastTick;
        if( deltaTime > dobuleDelta ) { // ~2*1000/fps;
            deltaTime = delta; // ~1000/fps;
        }

        update(delta);
        lastTick = time;
    };

    var update = function( time ){
        
    };

    return Game;
}());