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

	printSheets(arr, name){
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
					if (arr[i] == btn.value) {
						
						// call reverse function
						this.reverse(btn.value[0], btn.value[2]);

						// delete sheet from player hand
						arr.splice(i, 1);

						// print new player hand
						document.getElementById(name).innerHTML = "";
						this.printSheets(arr, name);

						// print new table game
						document.getElementById("game").innerHTML = "";
						this.printSheets(game, "game");

						myGlobal = [game[0][0], game[game.length - 1][1]];
						document.getElementById("myGlobal").innerHTML = myGlobal;

						this.nextTurn(turn);
					}
				}	
			};


			container.appendChild(btn);
		}

		console.log(count);

		if (count && turn == name) {
			pass.disabled = false;
		}

		pass.onclick = () => {
			this.nextTurn(turn);
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
var count = 0;

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

// print sheets
newGame.printSheets(playerOne, 'one');
newGame.printSheets(playerTwo, 'two');
newGame.printSheets(playerThree, 'three');
newGame.printSheets(playerFour, 'four');