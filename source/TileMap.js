var TileMap = (function(){
	function TileMap( parent ){
		this.parent = parent;
		this.height = null;
		this.width = null;
		this.grid = new Array();
	}

	TileMap.prototype.generate = function( params ){
		this.width = params.width;
		this.height = params.height;
		this.fillBiome( params.biomeParams );
	};

	TileMap.prototype.fillBiome = function( params ){
		/*
		"biomes": {
        "snow": 0,
        "tundra": 0,
        "normal": 100,
        "tropics": 0,
        "sands": 0
        },
        "ground": {
        "earth": 50,
        "rock": 35,
        "water": 15
        },
        "resources": {

        }
		*/
		//TODO: заполняем карту основным биомом, запускаем генеарцию других биомов, распологаем другие биомы скорее всего по углам
		//  относительно основного. Смешение биомов будет выполнять функция генерации биомов и их расположения на карте. В зависимости
		// от количество тайлов в карте будем делать биомы. В идеале можно сделать % заполнения биомом растений, каменной руды и прочих отдельных частей.
		
		// генерацию сделаю как в прошлых проектах - как озеро. Старался сделать так, что бы оно напоминало окружность.

		//type= 0 - water, 1 - oil , 2 - earth, 3 - sand, 4 - rock,
		//cover= 0 - nothing, 1 - waterGrass, 3 - earthGrass, 4 - sandGrass 5 - rock, 6 - wood, 7 - rockyRoad, 8 - stoneWall, 9 - woodenWall, 10 - door;
		var randomNum;
		var tileParams = { "tileType" : undefined, "cover": "nothing", "effect": "nothing", "walkable": true, "speedRatio": 1 };

		for( var i = 0; i < this.height; i++ ){
			for( var j = 0; j < this.width; j++ ){
				randomNum = Math.floor( Math.random() * 10 );
				if ( randomNum < 6 ){
					tileParams.tileType = "earth";
					tileParams.walkable = true;
					tileParams.speedRatio = 0.9;
				}else if( randomNum > 5 && randomNum < 7 ){
					tileParams.tileType = "water";
					tileParams.walkable = false;
					tileParams.speedRatio = 0;
				}else{
					tileParams.tileType = "rockyGround";
					tileParams.walkable = true;
					tileParams.speedRatio = 0.95;
				}

				var id = i*this.height + j;
				var x = i*this.width;
				var y = j;
				var tile = new Tile ( id, x, y, tileParams );
				this.grid.push( tile );
			}
		}
	};

	TileMap.prototype.changeTileProp = function( id, params ){
		var tileToChange = this.grid[id];
		//TODO: update graphics, 
	};

	TileMap.prototype.getTile = function( id ){
		return this.grid[id];
	};

	TileMap.prototype.generateBiomes = function( params ){

		//mix biomes; cause i do global biomes, i can't mix over 2 biomes in logical and phisical world;
		// but if we have a @magicalWorld, we can mix all biomes into 1 grid map;
		//so, right now i mix only 2 biomes who stay near the main;
       
	};
	/*
	Tilemap.prototype.generateTileMapObject = function( kind, height, width, minimumLakeWidth, maximumLakeOffset ){
		var currentCoverType = kind;
		var lakeHeight = height;
		var lakeWidth = width;
		var minLakeWidth = minimumLakeWidth;
		var lakeOffset = maximumLakeOffset;
		var coverType = 2;

		// lava and water;
		if (kind == "Water"){
			currentCoverType = "Shallow";
			coverType = 0;
		}else if ( kind == "Lava"){
			currentCoverType = "Magma";
			coverType = 1;
		}

		if (height == 0 || width == 0){
			lakeHeight = Math.round(_rows / (value*4)); // 25% of all map - is max;
			lakeWidth = Math.round(_cols / (value*4)); 
		}

		for ( i in 0...value){
			var leftPoint = Math.floor(Math.random()*(_cols - lakeWidth/2)); // если озеро уйдет за пределы сетки. то хотя бы половина останется.
			var topPoint = Math.floor(Math.random()*(_rows - lakeHeight/2));
			var lastLakeWidth = 0;

			for (j in 0...lakeHeight){
				var currentLakeOffset:Int = Math.floor(Math.random()*(lakeOffset + 1));
				var directionLakeOffset:Int = Math.floor(-1 + Math.random()*3); // -1 - left, 0 - center, 1 - right;
				var currentLakeWidth:Int = Math.floor(lastLakeWidth + Math.random()*(lakeWidth - lastLakeWidth + 1));

				if (j != 0){
					var difWidth:Int = Math.round(lastLakeWidth/2 - currentLakeWidth/2);
					leftPoint += difWidth;
					leftPoint += currentLakeOffset*directionLakeOffset;
					topPoint++;
				}

				lastLakeWidth = currentLakeWidth;

				for (k in 0...currentLakeWidth)
				{
					var x:Int = leftPoint + k;
					var y:Int = topPoint;

					if (y >= _rows)
					{
						topPoint = 0;
						y = 0;
					}

					if ( x < 0 )
					{
						x = _cols + k;
					}

					if (x >= _cols && topPoint == _rows - 1)
					{
						y = 0;
						x = x - _cols;
					}
					
					var tile:GameTile = new GameTile( new Coordinates(x, y), kind, 5);

					var tileCover:Int = tile.coverType;
					var randomNum:Int = Math.floor(Math.random()*(2 + 1)); //0, 1, 2 - cause we have 3 variants of each ground type;
					var tileIndex:Array<Int> = _groundTileIndexes[tileCover];
					var tilePic:Int = tileIndex[randomNum];

					tile.groundTile = tilePic;
					_gridTileMap[y*_rows + x] = tile;

					createFloorAroundTile(tile, currentCoverType);

				}
			}
		}

	};
	*/
	return TileMap;
}());