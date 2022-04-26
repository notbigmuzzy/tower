$(document).ready(function(){

	//VARIABLES
	let theMap = $('the-map'),
		numberOfTIles = 100,
		floorTileButton = '',
		playerPixel = '<player-pixel></player-pixel>',
		startPlayerPosition = Math.floor(generateRandomFloatInRange(0, 99));

	//INDEX
	setupFloor();

	//INTERACTION
	$(document).on('click','.floor-tile',function() {
		let clickedFloorTile = $(this),
			allFloorTilesAreCleared = !$('.floor-tile').is(":disabled"),
			clickedOnStartingFloorTile = clickedFloorTile.hasClass('start-dungeon');

		if (allFloorTilesAreCleared && clickedOnStartingFloorTile) {
			destroyFloor();
			setupFloor();
		} else {
			movePlayerPixel(clickedFloorTile);
			revealFloorTile(clickedFloorTile);
		}
	})

	//FUNCTIONS
	function generateRandomFloatInRange(min, max) {
		return (Math.random() * (max - min + 1)) + min;
	}

	function destroyFloor() {
		$('the-map').find('the-floor').remove();
	}

	function setupFloor() {
		let floorTile = '<the-floor></the-floor>';
		theMap.append(floorTile);
		let theFloor = $('the-floor');
		philFloorWithTiles(theFloor);
	}

	function philFloorWithTiles(element) {
		for (let i = 0; i < numberOfTIles; i++) {
			if (i == startPlayerPosition) {
				//START PLAYER POSITION
				floorTileButton = '<button style="height:10%;width:10%;" class="floor-tile start-dungeon" data-index="' + i + '" data-row="' + (Math.floor(i / 10)) + '">' + playerPixel + '</button>';
			} else {
				//DEFAULT EMPTY FLOOT TILE
				floorTileButton = '<button style="height:10%;width:10%;" disabled class="floor-tile" data-index="' + i + '" data-row="' + (Math.floor(i / 10)) + '"></button>';
			}
			element.append(floorTileButton);
		}
	}

	function movePlayerPixel(clickedFloorTile) {
		$('.has-player').removeClass('has-player').find('player-pixel').detach().appendTo(clickedFloorTile);
		clickedFloorTile.addClass('has-player');
	}

	function revealFloorTile(clickedFloorTile) {
		let clickedFloorIndex = clickedFloorTile.attr('data-index'),
			clickedFloorRow = clickedFloorTile.attr('data-row'),
			clickedNextFloorIndex = clickedFloorTile.next().attr('data-index'),
			clickedNextFloorRow = clickedFloorTile.next().attr('data-row'),
			clickedPrevFloorIndex = clickedFloorTile.prev().attr('data-index'),
			clickedPrevFloorRow = clickedFloorTile.prev().attr('data-row')

		clickedFloorTile.removeAttr('disabled');
		clickedFloorTile.prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().removeAttr('disabled');
		clickedFloorTile.next().next().next().next().next().next().next().next().next().next().removeAttr('disabled');
		clickedFloorRow == clickedNextFloorRow ? clickedFloorTile.next().removeAttr('disabled'):false;
		clickedFloorRow == clickedPrevFloorRow ? clickedFloorTile.prev().removeAttr('disabled'):false;
	}
});