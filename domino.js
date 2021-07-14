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
		let	pass 	= document.createElement('input');
		pass.type = 'submit';
		pass.className = 'sheet pass';
		pass.disabled = true;
		pass.value = 'pass';
		pass.name = 'pass'
		
		var container = document.getElementById(name);


		for (var i = 0; i < arr.length; i++) {
			let btn 	= document.createElement('input');			
			btn.type = 'submit';
			btn.className = 'sheet ' + name;
			btn.name = name;
			btn.value = arr[i];
			btn.disabled = true;


			// disable btns
			if (btn.value == [6,6] && arr.map(key => (key[0] == 6 && key[1] == 6) ? true : false).indexOf(true) > -1) {
				btn.disabled = false;
			//} else if (name == turn && arr.map(key => (key[0] == 6 && key[1] == 6) ? true : false).indexOf(true) == -1) {
				/* condition
				turn
				enable only start and last
				*/

			} else if (btn.value[1] == myGlobal[1] || btn.value[0] == myGlobal[1]) {
				console.log("exist one value");
			}



			/*else if(){
				arr.map(key=>console.log((key[0] == myGlobal[0]) || (key[1] == myGlobal[0]))) ;
				btn.disabled = false;
				//pass.disabled = false;
			}

*/

			btn.onclick = () => {
					
				for (var i = 0; i < arr.length; i++) {
					if (arr[i] == btn.value) {
						
						// add to game array
						game.push(btn.value);

						// delete sheet from player hand
						arr.splice(i, 1);

						// print new player hand
						document.getElementById(name).innerHTML = "";
						this.printSheets(arr, name);

						// print new table game
						document.getElementById("game").innerHTML = "";
						this.printSheets(game, "game");

						myGlobal = [game[0][0], game[game.length - 1][2]];
						document.getElementById("myGlobal").innerHTML = myGlobal;

						this.nextTurn(turn);
					}
				}	
			};

			container.appendChild(btn);
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