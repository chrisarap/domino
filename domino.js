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

	distrutePieces(arr, quantity){
		let playerHand = [];

		for (var i = 0; i < quantity; i++) {
			playerHand.push(...arr.splice(Math.floor(Math.random() * (arr.length - 0) + 0), 1));
		}

		return playerHand;
	}

	printSheets(arr, name){
		for (var i = 0; i < arr.length; i++) {
			let btn = document.createElement('input');
			btn.type = 'submit';
			btn.className = 'sheet';
			btn.name = arr[i];
			btn.value = arr[i];
			btn.onclick = () => {
					
					this.start(arr);

					for (var i = 0; i < arr.length; i++) {
						if (arr[i] == btn.value) {
							console.log(i + " " + arr);
							
							game.push(btn.value);
							arr.splice(i, 1);
							console.log(arr + " " + name );

							document.getElementById(name).innerHTML = "";
							this.printSheets(arr, name);

							document.getElementById("game").innerHTML = "";
							this.printSheets(game, "game");
						}
					}
		
			};

			var container = document.getElementById(name);
			container.appendChild(btn);	
		}
	}

	start(name, ...arr) {
		
		
		var res = [];

		for (var i = 0; i < arr.length; i++) {
			for (var j = 0; j < arr[i].length; j++) {

				if(arr[i][j][0] == arr[i][j][1]) {
					res.push([arr[i][j][0], name[i]])
				}
			}
		}

		return res.sort()[res.length - 1];		
	}	
}


var game = [];


test = new Domino();
myDomino = test.createArray();
console.log(myDomino);
playerOne = test.distrutePieces(myDomino, 7);
playerTwo = test.distrutePieces(myDomino, 7);
playerThree = test.distrutePieces(myDomino, 7);
playerFour = test.distrutePieces(myDomino, 7);

document.getElementById("turn").innerHTML = "turn: " + test.start(["one", "two", "three", 'four'], playerOne, playerTwo, playerThree, playerFour);




test.printSheets(playerOne, 'one');
document.write("<br>");
test.printSheets(playerTwo, 'two');
document.write("<br>");
test.printSheets(playerThree, 'three');
document.write("<br>");
test.printSheets(playerFour, 'four');
document.write("<br>");

test.printSheets(myDomino, 'pot');
document.write("<br>");

