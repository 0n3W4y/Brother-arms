var TileMap = (function(){
	function TileMap( parent ){
		this.parent = parent;
		this.height = null;
		this.width = null;
		this.grid = new Array();
	}

	TileMap.prototype.generateGrid = function( params ){
		this.width = params.gridParams.width;
		this.height = params.gridParams.height;
		this.fillBiome( params.biomeParams );
	};

	TileMap.prototype.fillBiome = function( params ){
		//TODO: заполняем карту основным биомом, запускаем генеарцию других биомов, распологаем другие биомы скорее всего по углам
		//  относительно основного. Смешение биомов будет выполнять функция генерации биомов и их расположения на карте. В зависимости
		// от количество тайлов в карте будем делать биомы. В идеале можно сделать % заполнения биомом растений, каменной руды и прочих отдельных частей.
		
		// генерацию сделаю как в прошлых проектах - как озеро. Старался сделать так, что бы оно напоминало окружность.

		//type= 0 - water, 1 - oil , 2 - lava,  3 - earth, 4 - sand, 5 - rock,
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
	//private

	return TileMap;
}());