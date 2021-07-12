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

	start(arr, name) {
		console.log(arr[0] + " yeas")
		for (var i = 0; i < arr.length; i++) {
			if(arr[i][0] == 6 && arr[i][1] == 6){
				console.log(name + " start 6");
				return true;				
			} else if(arr[i][0] == 5 && arr[i][1] == 5){
				console.log(name + " start 5");
				return true;
			} else if(arr[i][0] == 4 && arr[i][1] == 4){
				console.log(name + " start 4");
				return true;
			}else if(arr[i][0] == 3 && arr[i][1] == 3){
				console.log(name + " start 3");
				return true;
			}else if(arr[i][0] == 2 && arr[i][1] == 2){
				console.log(name + " start 2");
				return true;
			}else if(arr[i][0] == 1 && arr[i][1] == 1){
				console.log(name + " start 1");
				return true;
			}else if(arr[i][0] == 0 && arr[i][1] == 0){
				console.log(name + " start 0");
				return true;
			}
		}
	}
}


var game = [];


test = new Domino();
myDomino = test.createArray();
console.log(myDomino);
playerOne = test.distrutePieces(myDomino, 7);
playerTwo = test.distrutePieces(myDomino, 7);
test.start(playerOne, "one");
test.start(playerTwo, "two");


test.printSheets(playerOne, 'one');
document.write("<br>");
test.printSheets(playerTwo, 'two');
document.write("<br>");
test.printSheets(myDomino, 'pot');
document.write("<br>");

