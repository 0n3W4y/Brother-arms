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
	}

	GraphicsManager.prototype.draw = function( grid, width, height, sizeGrid ){
	    var gridSize = sizeGrid;
	    for( var i = 0; i < height; i++ ){
	        var tr = document.createElement("TR");

	        for( var j = 0; j < width; j++ ){
	            var td = document.createElement("TD");
	            td.style.width = gridSize + "px";
	            td.style.height = gridSize + "px";
	            var id = i*width + j;
	            td.id = id;
	            var color = doColor( grid[id] );
	            td.bgColor = color;
	            //var image = doImage( grid[id] ); // /images/dirt1.jpg;
	            //td.background = image;
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


	var init = function( newParent, images ){
		if( !inited ){
			parent = newParent;
			//backgroundMapImages = images.backgroundImages;
			//foregroundMapImages = images.foregroundImages;
			//effectMapImages = images.effectImages;
			//entityMapImages = images.entityImages;
			inited = true;
		}else{
			console.log( "GraphicsManager is already inited" );
		}
	};

	var doColor = function( tile ){
	    var tileType = tile.getParams( "type" );
	    var tileCover = tile.getParams( "cover" );
	    var color = "white";

	    if( tileType == 0 ){
	        if( tileCover == 0 ){
	            color = "42b9ed"; //blue;
	        }
	    }else if( tileType == 1 ){
	        if( tileCover == 1 ){
	            color = "238224"; //green
	        }else{
	        	color = "3d2a08" //brown
	        }
	    }else if( tileType == 3 ){
	        if( tileCover == 5 ){
	            color = "262626";
	        }
	    }else if( tileType == 4 ){
	        if( tileCover == 4 ){
	            color = "b2bab2";
	        }
	    }else if( tileType == 5 ){
	        if( tileCover == 6 ){
	            color = "c18100";
	        }
	    }else if( tileType == 6 ){
	        if( tileCover == 6 ){

	        }
	    }else if( tileType == 7 ){
	        if( tileCover == 6 ){
	            color = "7c5b1d";
	        }
	    }

	    return color;
	};
	
	return GraphicsManager;
}());