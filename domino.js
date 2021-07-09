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

	distrutePieces(quantity, arrr){
		let arr = this.createArray(), playerHand = [];

		for (var i = 0; i < quantity; i++) {
			playerHand.push(...arr.splice(Math.floor(Math.random() * (arr.length - 0) + 0), 1));
			document.write(arr.length + "<br>");
		}

		console.log(playerHand)
		console.log(arr)
	}
}

var test = new Domino();
console.log(test.createArray());
test.distrutePieces(7);
