var GraphicsManager = (function(){
	function GraphicsManager( newParent, mainCanvas, images ){
	//public
		this.canvas = document.getElementById( mainCanvas );
		this.parent = newParent;
		this.backgroundTileset = new Image();
		this.prepareGraphics( images );
	}

	GraphicsManager.prototype.prepareGraphics = function( images ){
		this.ctx = this.canvas.getContext("2d");
		this.backgroundTileset.src = images.backgroundTileset.src;
		this.backgroundTilesetTileSize = images.backgroundTileset.tileSize;
		this.backgroundTileset.onload = function() {
    		this.ctx.drawImage(imageObj, 0, 0);
    		var tilesX = imageWidth / tileWidth;
		    var tilesY = imageHeight / tileHeight;
		    var totalTiles = tilesX * tilesY;        
		    var tileData = new Array();
		    for(var i=0; i<tilesY; i++)
		    {
		      for(var j=0; j<tilesX; j++)
		      {           
		        // Store the image data of each tile in the array.
		        tileData.push(ctx.getImageData(j*tileWidth, i*tileHeight, tileWidth, tileHeight));
		      }
		    }
		    //From here you should be able to draw your images back into a canvas like so:
		    //ctx.putImageData(tileData[0], x, y);
		}
	};
		
	return GraphicsManager;
}());