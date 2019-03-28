var TileMap = (function(){
	function TileMap( parent, params ){
		this.parent = parent;
		this.height = null;
		this.width = null;
		this.grid = new Array();
		this.totalTiles = null;
		this.generateGrid( params );
		this.tileConfig = { 
			"snow":{
				"earth": { "biome": "snow", "tileType" : "earth", "tileCover": "nothing", "tileEffect": "nothing", "walkable": true, "speedRatio": 0.9 },
				"water": { "biome": "snow", "tileType" : "water", "tileCover": "nothing", "tileEffect": "nothing", "walkable": true, "speedRatio": 0.75 },
				"rock": { "biome": "snow", "tileType" : "rock", "tileCover": "nothing", "tileEffect": "nothing", "walkable": true, "speedRatio": 0.95 }
			}, 
			"tundra":{
				"earth": { "biome": "tundra", "tileType" : "earth", "tileCover": "nothing", "tileEffect": "nothing", "walkable": true, "speedRatio": 0.9 },
				"water": { "biome": "tundra", "tileType" : "water", "tileCover": "nothing", "tileEffect": "nothing", "walkable": false, "speedRatio": 0 },
				"rock": { "biome": "tundra", "tileType" : "rock", "tileCover": "nothing", "tileEffect": "nothing", "walkable": true, "speedRatio": 0.95 }
			}, 
			"normal":{
				"earth": { "biome": "normal", "tileType" : "earth", "tileCover": "nothing", "tileEffect": "nothing", "walkable": true, "speedRatio": 0.85 },
				"water": { "biome": "normal", "tileType" : "water", "tileCover": "nothing", "tileEffect": "nothing", "walkable": false, "speedRatio": 0 },
				"rock": { "biome": "normal", "tileType" : "rock", "tileCover": "nothing", "tileEffect": "nothing", "walkable": true, "speedRatio": 0.95 }
			}, 
			"tropics":{
				"earth": { "biome": "tropics", "tileType" : "earth", "tileCover": "nothing", "tileEffect": "nothing", "walkable": true, "speedRatio": 0.8 },
				"water": { "biome": "tropics", "tileType" : "water", "tileCover": "nothing", "tileEffect": "nothing", "walkable": false, "speedRatio": 0 },
				"rock":{ "biome": "tropics", "tileType" : "rock", "tileCover": "nothing", "tileEffect": "nothing", "walkable": true, "speedRatio": 0.95 },
			}, 
			"sands":{
				"earth": { "biome": "sands", "tileType" : "earth", "tileCover": "nothing", "tileEffect": "nothing", "walkable": true, "speedRatio": 0.9 },
				"water": { "biome": "sands", "tileType" : "water", "tileCover": "nothing", "tileEffect": "nothing", "walkable": false, "speedRatio": 0 },
				"rock": { "biome": "sands", "tileType" : "rock", "tileCover": "nothing", "tileEffect": "nothing", "walkable": true, "speedRatio": 0.95 }
			}
		};
	};

	TileMap.prototype.generateGrid = function( params ){
		this.width = params.width;
		this.height = params.height;
		this.totalTiles = this.width * this.height;
	};

	TileMap.prototype.generateBiome = function( params ){
		this.fillBiome( params );
		//generate river if need
		this.generateRiver( params.ground.river, "water" );
		// fill water;
		this.generateSolid( params.ground.water, "water" );	
		// fill rocks;	rocks rebuild water;
		this.generateSolid( params.ground.rock, "rock" );
		//spread resources to ground and rock tiles;
		this.generateResources( params.foreground );
		//
		this.findGraphicsForTiles();
		
	};

	TileMap.prototype.fillBiome = function( params ){
		
		// земля является оснвоным тайлом на любой сцене. Мы не будем делать условия, где магма вырывается наружу, где cыпучие пески и нельзя сделать постройки. 
		// мне кажетс яэто будет интересно для хардкорных игроков. но не для играбильности. с другой стороны. мы можем сделать сцены, где будет осуществляться вылозки
		// тогд атам не будет иметь смысла делать землю, там будет минимум построек - это разбить лагерь, создать укрепления - напасть на чье-то поселение. ограбить его,
		// взять в заложники, если нужно будет  и привезти домой. Думаю это будет офигенная тема.

		var maxWaveDifference = 1; // максимальное количество тайлов для +- от предыдущей точки. что бы получилось волна перехода биома.

		var priority = { 
			"NS": { "snow": 0, "tundra": 1, "normal": 2, "tropics": 3, "sands": 4 },
			"SN": { "snow": 4, "tundra": 3, "normal": 2, "tropics": 1, "sands": 0 } 
		};
		var primaryProp = params.biomes.proportion; // Primary biome % of all tileMap;
		var direction = params.biomes.direction; // "North to South" or "South to North"
		var primary = params.biomes.primary; // "snow";
		var secondary = params.biomes.secondary; // "tundra";

		var coverPercentage = params.biomes.cover;

		var firstBiomTileParams = this.tileConfig[ primary ].earth;
		var doSecond = false;

		if( secondary ){
			// if > 0 we take second biome at top of tileMap, else ( < 0 ) we take second biome at bottom of tileMap;
			var placeSecondBiome = priority[ direction ][ primary ] - priority[ direction ][ secondary ];
			var secondBiomeTileParams = this.tileConfig[ secondary ].earth;
			doSecond = true;
		};

		//first step, fill primary biome;
		for( var i = 0; i < this.height; i++ ){
			for( var j = 0; j < this.width; j++ ){
				var x = j;
				var y = i;
				var id = y*this.height + x;
				var tile = new Tile ( id, x, y, firstBiomTileParams );
				//сразу генерируем cover в виде травы, цветочков, камешков, и прочей лабуды для красоты пейзажа
				//генерация происходит на земле сразу же.
				this.generateCoverForEarthTile( tile, coverPercentage );
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
						var y = h;
						var id = x + y*this.height;
						var tile = new Tile ( id, x, y, secondBiomeTileParams );
						this.generateCoverForEarthTile( tile, coverPercentage );
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
						var y = l;
						var id = x + y*this.height;
						var tile = new Tile ( id, x, y, secondBiomeTileParams );
						this.generateCoverForEarthTile( tile, coverPercentage );
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

	TileMap.prototype.getTileFromCoords = function( x, y ){
		var id = this.height*y + x;
		return this.grid[ id ];
	};

	TileMap.prototype.generateSolid = function( params, tileName ){
		//TODO: generate rocks and resources in rocks;
		//First - generate rocks
		//Second spread resources in it;
		// можно создать водные красивости - в виде кувшинок , камыша и прочего - при необходимости. 
		// так же можно будет сделать мель* как cover для озера.
		if( params.amount == 0 ){ return; };
		var minHeight = params.minHeight || 5; //default;
		var minWidth = params.minWidth || 5; //default;
		var maxWidthVar = params.maxWidthVar || 1; //default;
		var offset = params.offset || 1; //default;
		var maxParticles = params.maxParticles || 10; //default;
		var amount = params.amount;
		var minSize = minHeight * minWidth ;
		var averageSize = ( this.totalTiles * amount / 100 ); //average tiles.
		var newTileType = tileName;
		
		var averageWidth = Math.round( Math.sqrt( averageSize ) );
		var averageHeight = averageWidth; // S of square;
		var leftoverTiles = 0;

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
					var oldTileType = this.grid[ id ].tileType;
					var tileBiome = this.grid[ id ].tileBiome
					var newTileConfig = this.tileConfig[ tileBiome ][ newTileType ];
					if( oldTileType == "water" && newTileType == "rock" ){
						this.grid[ id ].tileCover = "rock";
					}else{
						this.grid[ id ].changeParams( newTileConfig );
					};					

					if( oldTileType != newTileType ){
						averageSize--;
					};		
				};
			};
		};		
	};

	TileMap.prototype.generateRiver = function( params ){ //tileType from fillBiome;
		// сделать брод, гед можно будет перейти реку, может быть в разных местах. Брод будет рандомно выбран из участков, где река достигает минимума
		// соберу в аррей с начальными координатами, и в зависимости от карты решу сколько делать бродов в реки. Брод будет 1-ым слоем.
		// необходимо создать cover , организуйщий мне *мель*. Который изменит isWalking на true  и позволит переходить реку в этом месте.
		
		if( !params.amount ){ // river doesn't generated;
			return;
		}
		var riverOffset = params.offset || 1;
		var riverMinWidth = params.minWidth || 2;
		var riverMaxWidth = params.maxWidth || riverMinWidth * 2; //default;
		var riverStep = params.step || 1; //default step + 1 or - 1 or 0 to curent Width
		var riverType = params.type; // 0 - hor , 1 - ver;
		if ( riverType === undefined ){
			riverType = Math.floor( Math.random() * 2 );
		};
		var riverCurrentWidth = Math.flood( riverMinWidth + Marh.random() * ( riverMaxWidth - riverMinWidth + 1 ) );
		var topLeftPoint = Math.floor( Math.random() * ( this.width - riverMaxWidth ) );
		var topUpPoint = Math.floor( math.random() * ( this.height - riverMaxWidth ) );

		if( riverType ){
			for( var i = 0; i < this.height; i++ ){
				topUpPoint += Math.floor( -riverOffset + Math.random() * ( riverOffset * 2 + 1 ) );
				riverCurrentWidth += Math.floor( -riverStep + Math.random() * ( riverStep * 2 + 1 ) );
				if( riverCurrentWidth >= riverMaxWidth ){
					riverCurrentWidth = riverMaxWidth;
				}else if( riverCurrentWidth <= riverMinWidth ){
					riverCurrentWidth = riverMinWidth;
				};

				for( var j = 0; j < riverCurrentWidth ; j++ ){
					var y = topUpPoint + j;
					if( !( y >= this.height || y < 0 ) ){
						var x = i;
						var id = y * this.height + x;
						var tileBiome = this.grid[ id ].tileBiome;
						this.grid[ id ].changeParams( this.tileConfig[ tileBiome ].water );
					};
				};
			};
		}else{
			for( var i = 0; i < this.height; i++ ){
				topLeftPoint += Math.floor( -riverOffset + Math.random() * ( riverOffset * 2 + 1 ) );
				riverCurrentWidth += Math.floor( -riverStep + Math.random() * ( riverStep * 2 + 1 ) );
				if( riverCurrentWidth >= riverMaxWidth ){
					riverCurrentWidth = riverMaxWidth;
				}else if( riverCurrentWidth <= riverMinWidth ){
					riverCurrentWidth = riverMinWidth;
				};

				for( var j = 0; j < riverCurrentWidth ; j++ ){
					var x = topLeftPoint + j;
					if( !( x >= this.width || x < 0 ) ){
						var y = i;
						var id = i * this.height + x;
						var tileBiome = this.grid[ id ].tileBiome;
						this.grid[ id ].changeParams( this.tileConfig[ tileBiome ].water );
					};
				};
			};
		};	
	};

	TileMap.prototype.generateCoverForEarthTile = function ( tile, percentage ){
		// функцию можно развить до такого момента, что она сможет в cover присваивать массивы значений,
		// допустим мы сможем разместить на 1 тайле и камень и траву и песок одновременно.
		// в рахных биомах можно совместить несовместимое, например на землю, куда не попал песок. можно разместить траву , свойственную для пустыни.

		var object = "nothing";
		var objectConfig = { // по идее, cover сможет состоять из нескольких grass, rocks, flowers к примеру.
			"snow": "snow",
			"tundra": "grass",
			"normal": "grass",
			"tropics": "grass",
			"sands": "sand"
		}
		var randomNum = Math.floor( Math.random() * 100 );
		var percentageNum = percentage;
		var tileBiome = tile.tileBiome;
		if( randomNum < percentageNum ){ // 0.43 < 0.75;
			object = objectConfig[ tileBiome ];
		}
		tile.tileCover = object;
	};

	TileMap.prototype.generateResources = function( params ){
		//TODO: расрпделение всех типов ресурсов. Пока по ресурсам это камни, металлы, древесина, еда ( ягоды, плоды с деревьев, лесные звери )
		// FIRST STEP: Создадим объекты в виде камня, а внутри камня сделаем породу, золото, серебро. медь, латунь, железо и прочее.
		var groundResources = params.ground; // tree. bush, oldMetal etc.
		var rockResources = params.rock;
		var waterResources = params.water;
		var currentTilesLeft = 0;
		var earthArray = []; //array.splice( index, 1 );
		var rockArray = [];
		var waterArray = [];
		// find all earth tiles in grid and stock them into array
		for( var i = 0; i < this.grid.length; i++ ){
			var tile = this.grid[ i ];
			if( tile.tileType == "earth" ){
				earthArray.push( tile );
			}else if( tile.tileType == "rock" || tile.cover == "rock" ){
				rockArray.push( tile );
			}else{
				waterArray.push( tile );
			};
		};

		for( var key in groundResources ){
			if( earthArray.length <= 1 ){
					console.log( "Break from TileMap.spreadResources, current key = " + key + "; current tiles left = " + currentTilesLeft + "; k = " + k );
					break;
			};
			currentTilesLeft = 0;
			var resourceAmount = groundResources[ key ].amount;
			currentTilesLeft = Math.round( earthArray.length * resourceAmount / 100 );
			for( var k = 0; k < currentTilesLeft; k++ ){
				var randomIndex = Math.floor( Math.random() * earthArray.length );
				var tile = earthArray[ randomIndex ];
				var newEntity = this.parent.createEntity( "objects", key, { 
					"biome" : tile.tileBiome, 
					"components": { 
						"position": {
							"x": tile.x, 
							"y": tile.y
						}
					}
				} );
				earthArray.splice( randomIndex, 1 );
				if( earthArray.length <= 1 ){
					console.log( "Break from TileMap.spreadResources, current key = " + key + "; current tiles left = " + currentTilesLeft + "; k = " + k );
					break;
				};
			};
		};
		for( var key in rockResources ){
			if( rockArray.length <= 1 ){
					console.log( "Break from TileMap.spreadResources, current key = " + key + "; current tiles left = " + currentTilesLeft + "; j = " + j );
					break;
			};
			currentTilesLeft = 0;
			var resourceAmount = rockResources[ key ].amount;
			currentTilesLeft = Math.round( rockArray.length * resourceAmount / 100 );
			for( var j = 0; j < currentTilesLeft; j++ ){
				var randomIndex = Math.floor( Math.random() * rockArray.length );
				var tile = rockArray[ randomIndex ];
				var newEntity = this.parent.createEntity( "objects", key, {
					"biome" : tile.tileBiome, 
					"components": { 
						"position": {
							"x": tile.x,
							"y": tile.y
						}
					}
				} );
				rockArray.splice( randomIndex, 1 );
				if( rockArray.length <= 1 ){
					console.log( "Break from TileMap.spreadResources, current key = " + key + "; current tiles left = " + currentTilesLeft + "; j = " + j );
					break;
				};
			};
		};

		// we can create and add water resources.
	};

	TileMap.prototype.findGraphicsForTiles = function(){
		for( var i = 0; i < this.grid.length; i++ ){
			var tile = this.grid[ i ];
			this.parent.parent.parent.graphicsManager.getConfigForBackgroundTile( tile );
		};		
	};

	return TileMap;
}());