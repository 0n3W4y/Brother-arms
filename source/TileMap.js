var TileMap = (function(){
	function TileMap( parent, params ){
		this.parent = parent;
		this.height = null;
		this.width = null;
		this.grid = new Array();
		this.generateGrid( params );
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
		this.rockyGroundBiomeType = { 
			"snow": { "tileType" : "snowRockyGround", "cover": "nothing", "effect": "nothing", "walkable": true, "speedRatio": 0.95 },
			"tundra": { "tileType" : "tundraRockyGround", "cover": "nothing", "effect": "nothing", "walkable": true, "speedRatio": 0.95 },
			"normal": { "tileType" : "normalRockyGround", "cover": "nothing", "effect": "nothing", "walkable": true, "speedRatio": 0.95 },
			"tropics": { "tileType" : "tropicsRockyGround", "cover": "nothing", "effect": "nothing", "walkable": true, "speedRatio": 0.95 },
			"sands": { "tileType" : "sandsRockyGround", "cover": "nothing", "effect": "nothing", "walkable": true, "speedRatio": 0.95 }
		};

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
		this.generateSolid( params.ground.water, "water" );
		//generate river if need
		this.generateRiver( params.ground.river, "water" );
		// fill rocks;	rocks rebuild water;
		this.generateSolid( params.ground.rock, "rock" );
	};

	TileMap.prototype.generateSolid = function( params, tileName ){
		//TODO: generate rocks and resources in rocks;
		//First - generate rocks
		//Second spread resources in it;
		// при столкновении воды и камня, нужно будет создать параметр, который поможет заполнить мне объект * камень, на поверхности воды.
		var minHeight = params.minHeight || 5; //default;
		var minWidth = params.minWidth || 5; //default;
		var maxWidthVar = params.maxWidthVar || 1; //default;
		var offset = params.offset || 1; //default;
		var maxParticles = params.maxParticles || 10; //default;
		var amount = params.amount;
		if( amount == 0 ){ return; };
		var minSize = minHeight * minWidth ;
		var averageSize = ( this.height * this.width * amount / 100 ); //average tiles.
		var averageWidth = Math.round( Math.sqrt( averageSize ) );
		var averageHeight = averageWidth; // S of square;
		var leftoverTiles = 0;
		var rockArray = new Array();

		for( var h = 0; h < maxParticles; h++ ){ //protect from infinite loop;
			if( averageSize <= minSize ){
				// end;
				break;
			};

			var currentHeight = Math.floor( minHeight + Math.random() * ( averageHeight - minHeight + 1 ) );
			var currentWidth = Math.floor( minWidth + Math.random() * ( averageWidth - minWidth + 1 ) );

			if( h == maxParticles - 1 ){
				currentWidth = Math.round( Math.sqrt( averageSize ) );
				currentHeight = currentWidth;
			}

			//find startup point
			var leftPoint = Math.floor( Math.random() * ( this.width - ( currentWidth / 2 ) ) ); // если уйдет за пределы сетки. то хотя бы половина останется.
			var topPoint = Math.floor( Math.random() * ( this.height - ( currentHeight / 2 ) ) );
			var curWidth = Math.floor( minWidth + Math.random() * ( currentWidth - minWidth + 1 ) );
			var lastLakeWidth = curWidth;
			// найти к какому биому принадлежит вода , если на разделении биомов выбрать биом, в котором height озера находится больше половины.
			var splittedLake = false;
			var tileConfig;

			if( topPoint + currentHeight >= this.height ){
			//choose function for each tile;
			splittedLake = true;
			}else{
				if( tileName == "water" ){
					tileConfig = this.findTileConfigForWater( leftPoint, topPoint, currentHeight );
				};				
			};			
			for( var i = 0; i < currentHeight; i++ ){
				curWidth = Math.floor( ( lastLakeWidth - maxWidthVar ) + Math.random() * ( maxWidthVar*2  + 1 ) ); // by default -1, 0, +1;
				
				if( i == 0 ){
					curWidth = Math.floor( curWidth / 2 );
				}else if( i == 1 ){
					curWidth = Math.floor( curWidth * 1.5 );
				}else if( i == currentHeight - 2 ){
					curWidth = Math.floor( curWidth / 1.5 );
				}else if( i == currentHeight - 1 ){
					curWidth = Math.floor( curWidth / 1.5 );
				}

				if( curWidth < minWidth ){
					curWidth = minWidth + 1;
				}

				lastLakeWidth = curWidth;

				var y = topPoint + i;
				if( y >= this.height ){ //protect of over height;
					y -= this.height;
				};
				var currentOffset = Math.floor( -offset + Math.random() * ( offset*2 + 1 ) ); // [-1; 1];
				leftPoint += currentOffset;

				for( var j = 0; j < curWidth; j++ ){
					//do offset;
					var x = leftPoint + j;
					if( x >= this.width ){ //protect of over width;
						x -= this.width;
					}else if( x < 0 ){
						x += this.width;
					};

					var id = y * this.height + x;
					if( splittedLake ){
						tileConfig = this.findTileConfigOnTile( tileName, id );
					};

					var oldTileType = this.grid[ id ].tileType;
					if( tileName == "rock" ){
							tileConfig = this.findTileConfigOnTile( tileName, id );
							
							if( oldTileType == "tropicsWater" || oldTileType == "snowWater" || oldTileType == "sandsWater" || oldTileType == "normalWater" ){
								tileConfig = this.findTileConfigOnTile( "water", id );
							};
							
					};

					this.grid[ id ] = new Tile( id, x, y, tileConfig );
					if( oldTileType != tileConfig.tileType ){
						averageSize--;
						if( tileName == "rock" ){
							rockArray.push( this.grid[ id ] );
						};
					};
					
				};
			};
			console.log( "Current width: " + curWidth + "; Average size: " + averageSize + "; H:" + h + "; Left point: " + leftPoint + "; Top point: " + topPoint + "; size: " + currentHeight);
		};

		if( tileName == "rock" ){
		//spreadResources;
		this.spreadResources( params.resources, rockArray );
		}
	};

	TileMap.prototype.generateRiver = function( params ){ //tileType from fillBiome;
		// сделать брод, гед можно будет перейти реку, может быть в разных местах. Брод будет рандомно выбран из участков, где река достигает минимума
		// соберу в аррей с начальными координатами, и в зависимости от карты решу сколько делать бродов в реки. Брод будет 1-ым слоем.
		if( !params.amount ){ // river doesn't generated;
			return;
		}
		
	};

	TileMap.prototype.findTileConfigForWater = function( x, y, height ){
		var config;
		var primaryNum = 0;
		var secondaryNum = 0;
		var primaryBiome;
		var secondaryBiome;
		var primaryTileType;
		for( var i = 0; i < height; i++ ){
			var id = ( y + i ) * this.height + x;
			var tileType = this.grid[ id ].tileType;
			if( !primaryBiome ){
				primaryBiome = this.findTileConfigOnTile( "water", id );
				primaryTileType = tileType;
			};

			if( primaryTileType != tileType ){
				secondaryNum++;
				if( !secondaryBiome ){
					secondaryBiome = this.findTileConfigOnTile( "water", id );
				};
			}else{
				primaryNum++;
			};
		};

		if( primaryNum >= secondaryNum ){
			config = primaryBiome;
		}else{
			config = secondaryBiome;
		};

		return config;
	};

	TileMap.prototype.findTileConfigOnTile = function( biome, tileId ){
		var config;
		var newTileType;
		var oldTileType = this.grid[ tileId ].tileType;

		for( var key in this.earthBiomeType ){
			if( this.earthBiomeType[ key ].tileType == oldTileType ){
				newTileType = key;
				break;
			};

			if( this.waterBiomeType[ key ].tileType == oldTileType ){
				newTileType = key;
				break;
			};

			if( this.rockyGroundBiomeType[ key ].tileType == oldTileType ){
				newTileType = key;
				break;
			};
		};

		//remove
		if( !newTileType ){
			console.log( "Error in TileMap.findTileConfigOnTile, can't find TileType: " + oldTileType  + " on id: " + tileId + "; Biome: " + biome );
		}

		if( biome == "water" ){
			config = this.waterBiomeType[ newTileType ];
		}else if( biome == "earth" ){
			config = this.earthBiomeType[ newTileType ];
		}else if( biome == "rock" ){
			config = this.rockyGroundBiomeType[ newTileType ];
		}else{
			console.log( "Error in TileMap.findTileConfigOnTile, tile can't be: " + biome );
		}

		return config;
	};

	TileMap.prototype.spreadResources = function( params, array ){
		//TODO: расрпделение всех типов ресурсов. Пока по ресурсам это камни, металлы, древесина, еда ( ягоды, плоды с деревьев, лесные звери )
		// FIRST STEP: Создадим объекты в виде камня, а внутри камня сделаем породу, золото, серебро. медь, латунь, железо и прочее.
		// SECOND STEP: Создадим Древесину, полодоносные деревья, кусты.
		// THIRD STEP: Создадим зверей травоядных и хищников. 
		console.log( array.length );
	};

	return TileMap;
}());