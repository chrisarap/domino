class Domino {

	createArray(){
		let arr = [];

		for (var i = 0; i <= 6; i++) {
			for (var j = 0; j <= 6; j++) {

				var flag = 0;

				arr.filter(piece => piece[0] == Math.min(i, j) && piece[1] == Math.max(i, j) ? flag++ : true);

				if (flag == 0 ) {
					arr.push([Math.min(i, j), Math.max(i, j)]);
				}
			} 
		}

		return arr;		
	}

	distrutePieces(arr){
		let playerHand = [];

		for (var i = 0; i < 7; i++) {
			playerHand.push(...arr.splice(Math.floor(Math.random() * (arr.length - 0) + 0), 1));
		}

		return playerHand;
	}

	printSheets(arr, name, recursion=''){
		//console.log("playerHand "+ name + ": "+ arr.length + " re: " + recursion);

		let count = 0;
		let	pass 	= document.createElement('input');
		pass.type = 'submit';
		pass.className = 'sheet pass';
		pass.disabled = true;
		pass.value = 'pass';
		pass.name = 'pass';
		
		var container = document.getElementById(name);

		for (var i = 0; i < arr.length; i++) {
			let btn 	= document.createElement('input');			
			btn.type = 'submit';
			btn.className = 'sheet ' + name;
			btn.name = name;
			btn.value = arr[i];
			btn.disabled = true;

			count += this.disable(btn, name, btn.value[0], btn.value[2]);
			

			btn.onclick = () => {
				
				for (var i = 0; i < arr.length; i++) {
					console.log("inside click");
					if (arr[i] == btn.value) {
						
						// call reverse function
						this.reverse(btn.value[0], btn.value[2]);

						// delete sheet from player hand
						arr.splice(i, 1);

						// print new player hand
						document.getElementById(name).innerHTML = "";
						this.printSheets(arr, name, 'yes');

						// print new table game
						document.getElementById("game").innerHTML = "";
						this.printSheets(game, "game", 'yes');

						myGlobal = [game[0][0], game[game.length - 1][1]];
						document.getElementById("myGlobal").innerHTML = myGlobal;

						this.nextTurn(turn);

						truncate = 0;
						document.getElementById('truncate').innerHTML = 'truncate: ' + truncate;

						if (arr.length == 0) {
							console.log("the player " + name + " win");
							winner = name;
							this.calculateScore([playerOne, playerThree], [playerTwo, playerFour]);

						}
					}
				}			
			};

			container.appendChild(btn);			
		}

		if (count && turn == name) {
			pass.disabled = false;
		}

		pass.onclick = () => {
			this.nextTurn(turn);
			truncate++;
			document.getElementById('truncate').innerHTML = 'truncate: ' + truncate;

			if (truncate == 4) {
				//console.log("the player " + name + " win");
				winner = 'truncate';
				this.calculateScore([playerOne, playerThree], [playerTwo, playerFour]);
			}
		}
		
		if (name != 'game') {
			container.appendChild(pass);
		}

		
		
	}

	start(name, ...arr) {			
		var res = [], position = ['one', 'two', 'three', 'four'];

		for (var i = 0; i < arr.length; i++) {
			for (var j = 0; j < arr[i].length; j++) {

				if(arr[i][j][0] == arr[i][j][1]) {
					res.push([arr[i][j], name[i]]);
				}
			}
		}
		
		return res.sort()[res.length - 1][1];

	}

	reverse(...value){
		if (myGlobal[0] == value[1]) {
			game.unshift(value);
		} else if (myGlobal[0] == value[0]) {
			game.unshift(value.reverse());
		} else if (myGlobal[1] == value[1]) {
			game.push(value.reverse());
		}else if (myGlobal[1] == value[1]) {
			game.push(value);
		}else {
			game.push(value)
		}	
	}

	disable(btn, name, ...value){
		
		// parse every value from string to number
		var numOne = parseInt(value[0]), numTwo = parseInt(value[1]);
		var globalOne = parseInt(myGlobal[0]), globalTwo = parseInt(myGlobal[1]);
		
		// start with [6|6]
		if (myGlobal.length == 0 && numOne == 6 && numTwo == 6) {
			btn.disabled = false;
		} else if (globalOne == numOne || globalOne == numTwo || globalTwo == numOne || globalTwo == numTwo ) {
			if (name == turn) {
				btn.disabled = false;
			}
		} else {
			return 1;
		}
	}

	calculateScore(mine, pc){
		let arr1 = [], arr2 = [];

		mine[0].map(value => arr1.push(value[0], value[1]));
		mine[1].map(value => arr1.push(value[0], value[1]));

		pc[0].map(value => arr2.push(value[0], value[1]));
		pc[1].map(value => arr2.push(value[0], value[1]));

		
		if (winner == 'one' || winner == 'three') {
			
			console.log(arr1.reduce((sum, value) => sum += value));
			myScore += arr2.reduce((sum, value) => sum += value);
			document.getElementById('myScore').innerHTML = "myScore: " + myScore;

		} else if (winner == 'two' || winner == 'four') {} {
			
			console.log(arr2.reduce((sum, value) => sum += value));	
			pcScore += arr1.reduce((sum, value) => sum += value);
			document.getElementById('pcScore').innerHTML = "pcScore: " + pcScore;

		} else if (winner == 'truncate') {
			
		}
	}

	nextTurn(test){
		if (test == 'one') {
			turn = 'two';
			document.getElementById('turn').innerHTML = 'turn: ' + turn;

			document.getElementById('one').innerHTML = "";
			newGame.printSheets(playerOne, 'one');

			document.getElementById('two').innerHTML = "";
			newGame.printSheets(playerTwo, 'two');
		}

		if (test == 'two') {
			turn = 'three';
			document.getElementById('turn').innerHTML = 'turn: ' + turn;

			document.getElementById('two').innerHTML = "";
			newGame.printSheets(playerTwo, 'two');

			document.getElementById('three').innerHTML = "";
			newGame.printSheets(playerThree, 'three');
		}

		if (test == 'three') {
			turn = 'four';
			document.getElementById('turn').innerHTML = 'turn: ' + turn;

			document.getElementById('three').innerHTML = "";
			newGame.printSheets(playerThree, 'three');

			document.getElementById('four').innerHTML = "";
			newGame.printSheets(playerFour, 'four');
		}

		if (test == 'four') {
			turn = 'one';
			document.getElementById('turn').innerHTML = 'turn: ' + turn;

			document.getElementById('four').innerHTML = "";
			newGame.printSheets(playerFour, 'four');

			document.getElementById('one').innerHTML = "";
			newGame.printSheets(playerOne, 'one');
		}
	}

} // end class

var game = [], myGlobal = [];
var count = 0, truncate = 0, pcScore = 0, myScore = 0, winner = '';


document.getElementById('myScore').innerHTML = "myScore: " + myScore;
document.getElementById('pcScore').innerHTML = "pcScore: " + pcScore;

// create object
var newGame = new Domino();
// create pieces
var domino = newGame.createArray();

// players's hands
var playerOne 	= newGame.distrutePieces(domino);
var playerTwo 	= newGame.distrutePieces(domino);
var playerThree = newGame.distrutePieces(domino);
var playerFour 	= newGame.distrutePieces(domino);

//knowing who start
var turn = newGame.start(['one', 'two', 'three', 'four'], playerOne, playerTwo, playerThree, playerFour);
document.getElementById('turn').innerHTML = 'turn: ' + turn;
document.getElementById('truncate').innerHTML = 'truncate: ' + truncate;

// print sheets
newGame.printSheets(playerOne, 'one');
newGame.printSheets(playerTwo, 'two');
newGame.printSheets(playerThree, 'three');
newGame.printSheets(playerFour, 'four');


//newGame.calculateScore([playerOne, playerThree], [playerTwo, playerFour]);