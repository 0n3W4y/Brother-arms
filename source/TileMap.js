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
			"snow": { "tileType" : "snowWater", "cover": "nothing", "effect": "nothing", "walkable": true, "speedRatio": 0.75 },
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
		};

		//first step, fill primary biome;
		for( var i = 0; i < this.height; i++ ){
			for( var j = 0; j < this.width; j++ ){
				var id = i*this.height + j;
				var x = j;
				var y = i*this.width;
				var tile = new Tile ( id, x, y, firstBiomTileParams );
				this.grid.push( tile );
			};
		};

		if( doSecond ){
			//second step, fill second biome;
			var coordY = Math.round( this.height *  primaryProp / 100 ); // Y coord to start new biome;
			if( ( direction == "NS" && placeSecondBiome > 0 ) || ( direction == "SN" && placeSecondBiome < 0 ) ){
				// second do up;
				coordY = 100 - coordY;
				for( var g = 0; g < this.width; g++ ){ //x;
					//var waveDirection = Math.floor( -1 + Math.random() * 3 ); // [ -1 : 1 ] ;
					// для более плавного перехода можно использовтаь эту функцию.
					var waveDirection = 0;
					var randomWaveNum = Math.floor( Math.random() * 2 );
					if( randomWaveNum == 1 ){
						waveDirection = Math.floor( Math.random() * 2 );
						if( waveDirection == 0){
							waveDirection = -1;
						};
					};
					coordY += waveDirection;
					for( var h = coordY; h >= 0; h-- ){ //y;
						var x = g;
						var y = h*this.height;
						var id = x + y;
						var tile = new Tile ( id, x, y, secondBiomeTileParams );
						this.grid[id] = tile;		
					};
				};
			}else{
				//second do down;
				for( var k = 0; k < this.width; k++ ){ //x;
					//var waveDirection = Math.floor( -1 + Math.random() * 3 ); // [ -1 : 1 ] ;
					// для более плавного перехода можно использовтаь эту функцию.
					var waveDirection = 0;
					var randomWaveNum = Math.floor( Math.random() * 2 );
					if( randomWaveNum == 1 ){
						waveDirection = Math.floor( Math.random() * 2 );
						if( waveDirection == 0){
							waveDirection = -1;
						};
					};
					coordY += waveDirection;
					for( var l = coordY; l < this.height; l++ ){ //y;
						var x = k;
						var y = l*this.height;
						var id = x + y;
						var tile = new Tile ( id, x, y, secondBiomeTileParams );
						this.grid[id] = tile;		
					};
				};
			};
		};
	};

	TileMap.prototype.changeTileProp = function( id, params ){
		var tileToChange = this.grid[id];
		//TODO: update graphics.
	};

	TileMap.prototype.getTile = function( id ){
		return this.grid[id];
	};

	TileMap.prototype.generateBiome = function( params ){
		this.fillBiome( params ); 
		// fill water;
		this.generateWaterAndRocks( params.ground.water, "water" );
		//generate river if need
		this.generateRiver( params.ground.river, "rock" );
		// fill rocks;	rocks rebuild water;
		//this.generateWaterAndRocks( params.ground.rock );
	};

	TileMap.prototype.generateWaterAndRocks = function( params, tileName ){
		//TODO: generate rocks and resources in rocks;
		//First - generate rocks
		//Second spread resources in it;
		// при столкновении воды и камня, нужно будет создать параметр, который поможет заполнить мне объект * камень, на поверхности воды.
		var minHeight = params.minHeight || 5; //default;
		var minWidth = params.minWidth || 1; //default;
		var maxWidthVar = params.maxWidthVar || 1; //default;
		var offset = params.offset || 1; //default;
		var amount = params.amount;
		var averageSize = ( this.height * this.width * amount / 100 ); //average tiles.
		var maxWidth = Math.round( Math.sqrt( averageSize) ); 
		var maxHeight = maxWidth; // S of square;
		var leftoverTiles = 0;
				
		for( var h = 0; h < 10; h++ ){ //protect from infinite loop;
			var currentHeight = Math.floor( minHeight + Math.random() * ( maxHeight + leftoverTiles - minHeight + 1 ) ); 
			var currentWidth = Math.floor( minWidth + Math.random() * ( maxWidth + leftoverTiles - minWidth + 1 ) );
			var leftoverHeight = maxHeight - currentHeight;
			var leftoverWidth = maxWidth - currentWidth;
			leftoverTiles = 0;

			if( leftoverWidth <= minWidth || leftoverHeight <= minHeight ){
				h = 10; // do max , then break;
				currentHeight = maxHeight;
				currentWidth = maxWidth;
			}else{
				maxHeight = leftoverHeight;
				maxWidth = leftoverWidth;
			};

			//find startup point
			var leftPoint = Math.floor( Math.random() * ( this.width - ( currentWidth / 2 ) ) ); // если озеро уйдет за пределы сетки. то хотя бы половина останется.
			var topPoint = Math.floor( Math.random() * ( this.height - ( currentHeight / 2 ) ) );
			var curWidth = Math.floor( minWidth + Math.random() * ( currentWidth - minWidth + 1 ) );
			var lastLakeWidth = curWidth;
			// найти к какому биому принадлежит вода , если на разделении биомов выбрать биом, в котором height озера находится больше половины.
			var tileConfigArray = this.findtTileConfigForWater( leftPoint, topPoint, currentHeight );
			var tileConfig;
			var splittedLake = false;
			//choose if lake takeover height;
			if( tileConfigArray.length == 2 ){
				//choose function for each tile;
				splittedLake = true;
			}else{
				tileConfig = tileConfigArray[ 1 ];
			};

			for( var i = 0; i < currentHeight; i++ ){
				curWidth = Math.floor( ( lastLakeWidth - maxWidthVar ) + Math.random() * ( maxWidthVar*2  + 1 ) ); // by default -1, 0, +1;
				if( curWidth < minWidth ){
					curWidth = minWidth + 1;
				}

				lastLakeWidth = curWidth;
				leftoverTiles += maxWidth - curWidth; // собираем остатки тайлов, что бы уложится в % заполнения. ну хотя бы погрешность убрать к минимуму.

				var y = topPoint + i;
				if( y >= this.height ){ //protect of over height;
					y -= this.height;
				};
				var currentOffset = Math.floor( -offset + Math.random() * ( offset*2 + 1 ) ); // [-1; 1];
				console.log( currentOffset );
				leftPoint += currentOffset;

				for( var j = 0; j < curWidth; j++ ){
					//do offset;
					var x = leftPoint + j;
					if( x >= this.width ){ //protect of over width;
						x -= this.width;
					};
					var id = y * this.height + x;
					if( splittedLake ){
						tileConfig = this.findTileConfigOnTile( tileName, id );
					}					
					this.grid[id] = new Tile( id, x, y, tileConfig );

				};
			};
		};
	};

	TileMap.prototype.generateRiver = function( params ){ //tileType from fillBiome;
		// сделать брод, гед можно будет перейти реку, может быть в разных местах. Брод будет рандомно выбран из участков, где река достигает минимума
		// соберу в аррей с начальными координатами, и в зависимости от карты решу сколько делать бродов в реки. Брод будет 1-ым слоем.
		if( !params.amount ){
			return;
		}
		
	};

	TileMap.prototype.findtTileConfigForWater = function( x, y, height ){
		if( y + height > this.width - 1 ){
			//there is split lake;
		}
		var config = new Array();
		var primaryNum;
		var secondaryNum;
		var primaryBiome;
		for( var i = 0; i < height; i++ ){
			
		}
		return config;
	};

	TileMap.prototype.findTileConfigOnTile = function( biome, tileId ){
		var config;
		var newTileType;
		var oldTileType = this.grid[tileId].tileType;

		for( var key in this.earthBiomeType ){
			if( this.earthBiomeType[ key ].tileType == oldTileType ){
				newTileType = key;
				break;
			};
		};

		for( var obj in this.waterBiomeType ){
			if( this.waterBiomeType[ obj ].tileType == oldTileType ){
				newTileType = obj;
				break;
			};
		};

		//remove
		if( !newTileType ){
			console.log("Error in TileMap.findTileConfigOnTile, can't find TileType: " + oldTileType  + " on id: " + tileId  );
		}

		if( biome == "water" ){
			config = this.waterBiomeType[ newTileType ];
		}else if( biome == "earth" ){
			config = this.earthBiomeType[ newTileType ];
		}else{
			console.log("Error in TileMap.findTileConfigOnTile, biome can't be: " + biome );
		}

		return config;
	};

	return TileMap;
}());