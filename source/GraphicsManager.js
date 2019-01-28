var GraphicsManager = (function(){
	function GraphicsManager( newParent, tableBlock, images ){
	//public
		this.tableBlock = document.getElementById( tableBlock )
		init( newParent, images );
	}

	GraphicsManager.prototype.changeGrid = function(){
		var table = this.tableBlock;
		if( gridShown ){			
			table.border = "0";
			gridShown = false;
		}else{
			table.border = "1";
			gridShown = true;
		}
	};

	GraphicsManager.prototype.drawTileMap = function( grid, size, tSize ){
	    var width = size.width;
	    var height = size.height;
	    var tileSize = tSize;
	    var tableWidth = tSize*width;
	    this.tableBlock.style.width = tableWidth + "px";
	    for( var i = 0; i < height; i++ ){
	        var tr = document.createElement("TR");

	        for( var j = 0; j < width; j++ ){
	            var td = document.createElement("TD");
	            td.style.width = tileSize + "px";
	            td.style.height = tileSize + "px";
	            var id = i*width + j;
	            td.id = id;
	            var image = doTileImage( grid[id] );
	            td.style.backgroundImage = "URL(" + image + ")";
	            tr.appendChild( td );
	        }

	        this.tableBlock.appendChild( tr );
	    }
	    //working !!!! :D
	    $("td").click(function(){
	    console.log( $(this)[0].id );
	    });
	};

	//private
	var parent = null;
	var inited = false;

	var gridShown = false;

	var backgroundMapImages = null;
	var entityMapImages = null;


	var init = function( newParent, images ){
		if( !inited ){
			parent = newParent;
			backgroundMapImages = images.backgroundImages;
			//foregroundMapImages = images.foregroundImages;
			//effectMapImages = images.effectImages;
			entityMapImages = images.entityImages;
			inited = true;
		}else{
			console.log( "GraphicsManager is already inited" );
		}
	};

	var doTileImage = function( tile ){
		var image = "images/earth.png"; //default;
		//type= 0 - water, 1 - oil , 2 - lava,  3 - earth, 4 - sand, 5 - rock,
		//cover= 0 - nothing, 1 - waterGrass, 3 - earthGrass, 4 - sandGrass 5 - rock, 6 - wood, 7 - rockyRoad, 8 - stoneWall, 9 - woodenWall, 10 - door;
	    return image;
	};
	
	return GraphicsManager;
}());