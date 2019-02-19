var TileMap = (function(){
	function TileMap( parent ){
		this.parent = parent;
		this.height = null;
		this.width = null;
		this.grid = new Array();
	}

	TileMap.prototype.generateGrid = function( params ){
		this.width = params.width;
		this.height = params.height;
	};

	TileMap.prototype.fillBiome = function( params ){

		//TODO: заполняем карту основным биомом, запускаем генеарцию других биомов, распологаем другие биомы скорее всего по углам
		//  относительно основного. Смешение биомов будет выполнять функция генерации биомов и их расположения на карте. В зависимости
		// от количество тайлов в карте будем делать биомы. В идеале можно сделать % заполнения биомом растений, каменной руды и прочих отдельных частей.
		
		// генерацию сделаю как в прошлых проектах - как озеро. Старался сделать так, что бы оно напоминало окружность.

		//type= 0 - water, 1 - earth, 2 - rock,
		//cover= 0 - nothing, 1 - waterGrass, 3 - earthGrass, 4 - sandGrass 5 - rock, 6 - wood, 7 - rockyRoad, 8 - stoneWall, 9 - woodenWall, 10 - door;

		//cause we have only 2 biomes, this property is primary proportion of 100%;
		//второй биом будет рисоваться в зависимости от его преобладания, это будет чуть дольше, но меньше геммороя,
		// по задумке заполняю сверху вниз, соотвественно, имя данные о том, где находится данная локация. я знаю какой биом
		// будет сверху, а какой снизу. ПО этому я сначал арисую первый биом и закрашиваю все тайлы им. Полсе я рисую второй биом поверх, измняя
		// тайлы под второй биом. и лишь соотношения биомов укажут мне с какого Y   мне рисовать. 
		// алгоритм рисования будет прост, просчитавать каждый Х, для поднятия или увелечения границы Y. Максимальная погрешность будет составлять 1 тайл
		// просто для красоты. Можно сделать и больше. Но думаю будет красиво наблюдатьь за волной.
		// алгоритм позволит находить на текущем Х и текущем Y точку начала, а дальше, волна может по лесенке спускаться вниз или вверх
		// для начала и без заморочек будет тупой рандом по 0 - 1, соотвественно при math.round он мне будет выдывать от 0 - 0.49 до 0.5 - 1
		// этого будет достаточно.

		// земля является оснвоным тайлом н алюбой сцене. Мы не будем делать условия, где магма вырывается наружу, где зыбучие пески и нельзя сделать постройки. 
		// мне кажетс яэто будет интересно для хардкорных игроков. но не для играбильности. с другой стороны. мы можем сделать сцены, где будет осуществляться вылозки
		// тогд атам не будет иметь смысла делать землю, там будет минимум построек - это разбить лагерь, создать укрепления - напасть на чье-то поселение. ограбить его,
		// взять в заложники, если нужно будет  и привезти домой. Думаю это будет офигенная тема.
		var tileParams = { "tileType" : undefined, "cover": "nothing", "effect": "nothing", "walkable": true, "speedRatio": 1 };
		var earthBiomeType = { "snow" : "tundraEarth", "tundra": "tundraEarth", "normal": "normalEarth", "tropics": "tropicsEath", "sands": "crackedEarth" };
		var priority = { "NS": { "snow": 0, "tundra": 1, "normal": 2, "tropics": 3, "sands": 4 },
						 "SN": { "snow": 4, "tundra": 3, "normal": 2, "tropics": 1, "sands": 0 } 
						};
		var primaryProp = params.biomes.proportion;
		var direction = params.biomes.direction;
		var primary = params.biomes.primary;
		var secondary = params.biomes.secondary;
		var currentPriority = proirity.direction;

		var firstBiom;
		var secondBiome;

		if( secondary == null ){
			firstBiom = primary;
		}else{
			var first = currentPriority.primary;
			var second = currentPriority.secondary;
			if( first && second ){
				console.log( "Error in TileMap.fillBiome, biomes are wrong: Primary - " + primary + "; Secondary - " + secondary );
				return;
			}

			if( first > second ){
				firstBiom = primary;
				secondBiome = secondary;
			}else{
				firstBiome = secondary;
				secondBiome = primary;
			}
			
		};

		var firstBiomTile = tileParams;
		// "tundraEarth", "normalEarth", "sandEarth";
		var secondBiomeTile = tileParams;



		//first step, fill primary;
		for( var i = 0; i < this.height; i++ ){
			for( var j = 0; j < this.width; j++ ){
				var id = i*this.height + j;
				var x = i*this.width;
				var y = j;
				var tile = new Tile ( id, x, y, tileParams );
				this.grid.push( tile );
			}
		}



		/*
		var randomNum;
		
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
		*/
	};

	TileMap.prototype.changeTileProp = function( id, params ){
		var tileToChange = this.grid[id];
		//TODO: update graphics, 
	};

	TileMap.prototype.getTile = function( id ){
		return this.grid[id];
	};

	TileMap.prototype.generateBiome = function( params ){

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