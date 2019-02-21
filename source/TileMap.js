var TileMap = (function(){
	function TileMap( parent ){
		this.parent = parent;
		this.height = null;
		this.width = null;
		this.grid = new Array();
		this.earthBiomeType = { 
			"snow": { "tileType" : "snowEarth", "cover": "nothing", "effect": "nothing", "walkable": true, "speedRatio": 0.9 },
			"tundra": { "tileType" : "tundraEarth", "cover": "nothing", "effect": "nothing", "walkable": true, "speedRatio": 0.9 },
			"normal": { "tileType" : "normalEarth", "cover": "nothing", "effect": "nothing", "walkable": true, "speedRatio": 0.85 },
			"tropics": { "tileType" : "tropicsEarth", "cover": "nothing", "effect": "nothing", "walkable": true, "speedRatio": 0.8 },
			"sands": { "tileType" : "crackedEarth", "cover": "nothing", "effect": "nothing", "walkable": true, "speedRatio": 0.9 }
		};
		this.waterBiomeType = { 
			"snow": { "tileType" : "snowWater", "cover": "nothing", "effect": "nothing", "walkable": false, "speedRatio": 0 },
			"tundra": { "tileType" : "normalWater", "cover": "nothing", "effect": "nothing", "walkable": false, "speedRatio": 0 },
			"normal": { "tileType" : "normalWater", "cover": "nothing", "effect": "nothing", "walkable": false, "speedRatio": 0 },
			"tropics": { "tileType" : "tropicsWater", "cover": "nothing", "effect": "nothing", "walkable": false, "speedRatio": 0 },
			"sands": { "tileType" : "sandsWater", "cover": "nothing", "effect": "nothing", "walkable": false, "speedRatio": 0 }
		};
		this.rockyGroundBiomeType = { "tileType" : "rockyGround", "cover": "nothing", "effect": "nothing", "walkable": true, "speedRatio": 0.95 };

	};

	TileMap.prototype.generateGrid = function( params ){
		this.width = params.width;
		this.height = params.height;
	};

	TileMap.prototype.fillBiome = function( params ){
		
		//type= 0 - water, 1 - earth, 2 - rock,
		//cover= 0 - nothing, 1 - waterGrass, 3 - earthGrass, 4 - sandGrass 5 - rock, 6 - wood, 7 - rockyRoad, 8 - stoneWall, 9 - woodenWall, 10 - door;


		// земля является оснвоным тайлом на любой сцене. Мы не будем делать условия, где магма вырывается наружу, где cыпучие пески и нельзя сделать постройки. 
		// мне кажетс яэто будет интересно для хардкорных игроков. но не для играбильности. с другой стороны. мы можем сделать сцены, где будет осуществляться вылозки
		// тогд атам не будет иметь смысла делать землю, там будет минимум построек - это разбить лагерь, создать укрепления - напасть на чье-то поселение. ограбить его,
		// взять в заложники, если нужно будет  и привезти домой. Думаю это будет офигенная тема.

		var maxWaveDifference = 1; // максимальное количество тайлов для +- от предыдущей тчоки. что бы получилось волна перехода биома.

		var priority = { 
			"NS": { "snow": 0, "tundra": 1, "normal": 2, "tropics": 3, "sands": 4 },
			"SN": { "snow": 4, "tundra": 3, "normal": 2, "tropics": 1, "sands": 0 } 
		};
		var primaryProp = params.biomes.proportion; // Primary biome % of all tileMap;
		var direction = params.biomes.direction; // "North to South" or "South to North"
		var primary = params.biomes.primary; // "snow";
		var secondary = params.biomes.secondary; // "tundra";

		var firstBiomTileParams = this.earthBiomeType[primary];
		var doSecond = false;

		if( secondary ){
			// if > 0 we take second biome at top of tileMap, else ( < 0 ) we take second biome at bottom of tileMap;
			var placeSecondBiome = priority[direction][primary] - priority[direction][secondary];
			var secondBiomeTileParams = this.earthBiomeType[secondary];
			doSecond = true;
		}else{
			
		};

		//first step, fill primary biome;
		for( var i = 0; i < this.height; i++ ){
			for( var j = 0; j < this.width; j++ ){
				var id = i*this.height + j;
				var x = j;
				var y = i*this.width;
				var tile = new Tile ( id, x, y, firstBiomTileParams );
				this.grid.push( tile );
			}
		};

		if( doSecond ){
			//second step, fill second biome;
			var coordY = Math.round( this.height *  primaryProp / 100 ); // Y coords to start new biome;
			if( ( direction == "NS" && placeSecondBiome > 0 ) || ( direction == "SN" && placeSecondBiome < 0 ) ){
				// second do up;
				coordY = 100 - coordY;
				for( var g = 0; g < this.width; g++ ){ // x;
					//var waveDirection = Math.floor( -1 + Math.random() * 3 ); // [ -1 : 1 ] ;
					// для более плавного перехода можно использовтаь эту функцию.
					var waveDirection = 0;
					var randomWaveNum = Math.floor( Math.random() * 2 );
					if( randomWaveNum == 1 ){
						waveDirection = Math.floor( Math.random() * 2 );
						if( waveDirection == 0){
							waveDirection = -1;
						}
					}
					coordY += waveDirection;
					for( var h = coordY; h >= 0; h-- ){ //y;
						var id = h*this.height + g;
						var x = g;
						var y = h*this.height;
						var tile = new Tile ( id, x, y, secondBiomeTileParams );
						this.grid[id] = tile;		
					}
				}
			}else{
				//second do down;
				for( var k = 0; k < this.width; k++ ){ // x;
					//var waveDirection = Math.floor( -1 + Math.random() * 3 ); // [ -1 : 1 ] ;
					// для более плавного перехода можно использовтаь эту функцию.
					var waveDirection = 0;
					var randomWaveNum = Math.floor( Math.random() * 2 );
					if( randomWaveNum == 1 ){
						waveDirection = Math.floor( Math.random() * 2 );
						if( waveDirection == 0){
							waveDirection = -1;
						}
					}
					coordY += waveDirection;
					for( var l = coordY; l < this.height; l++ ){ //y;
						var id = l*this.height + k;
						var x = k;
						var y = l*this.height;
						var tile = new Tile ( id, x, y, secondBiomeTileParams );
						this.grid[id] = tile;		
					}
				}
			}
		}

		// fill water;
		this.generateLake( params.ground.water );
		// fill rocks;	
		this.generateRocks( params.ground.rock );

	};

	TileMap.prototype.changeTileProp = function( id, params ){
		var tileToChange = this.grid[id];
		//TODO: update graphics, 
	};

	TileMap.prototype.getTile = function( id ){
		return this.grid[id];
	};

	TileMap.prototype.generateBiome = function( params ){
		this.fillBiome( params );       
	};

	TileMap.prototype.generateLake = function( params ){
		//надо посчитать параметры. которые задаются в начае, сейчас задано 150, из 1000 возможных, нужно сделать функцию, подсчета приблизительного количества
		// воды в % соотношении от всей поверхности.
		var maxHeight = params.maxHeight;
		var maxWidth = params.maxWidth;
		var minHeight = params.minHeight;
		var minWidth = params.minWidth;
		var offset = params.offset;

		//find startup point
		var leftPoint = Math.floor( Math.random() * ( this.width - maxWidth/2 ) ); // если озеро уйдет за пределы сетки. то хотя бы половина останется.
		var topPoint = Math.floor( Math.random() * ( this.height - maxHeight/2 ) );
		var lastLakeWidth = minWidth;
		var averageHeight = Math.floor( minHeight + Math.random() * ( maxHeight - minHeight + 1 ) );
		// start at minimum width
		for( var i = 0; i < )

	};

	TileMap.prototype.generateRocks = function( params ){
		//TODO: generate rocks and resources in rocks;
		//First - generate rocks
		//Second spread resources in it;

	};

	TileMap.prototype.generateRiver = function( tileType, params ){ //tileType from fillBiome;
		// сделать брод, гед можно будет перейти реку, может быть в разных местах. Брод будет рандомно выбран из участков, где река достигает минимума
		// соберу в аррей с начальными координатами, и в зависимости от карты решу сколько делать бродов в реки. Брод будет 1-ым слоем.
		
	};

	TileMap.prototype.generateSolid = function( tileType, params ){ //tileType from fillBiome;

	};

	TileMap.prototype.findTileTypeForTile = function( biome, tile ){
		var tileType;

		return tileType;
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