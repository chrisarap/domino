class Domino {

	create_array(){
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
}

var test = new Domino();
console.log(test.create_array());