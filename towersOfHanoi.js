$( document ).ready(function() {
	var Tower = function( initialDiscs ) {
		this.discs = [];

		if ( typeof initialDiscs === "number" ) {
			for ( var i = initialDiscs - 1; i >= 0; i -= 1 ) {
				this.discs.push( i );
			}
		}
	};

	Tower.prototype = {
		constructor: Tower,
		top : function() {							// what is the topmost disc?
			return ( this.discs[ this.discs.length - 1 ] );
		},
		pop : function() {							// pull off topmost disc
			var last = this.discs.pop();
			return last;
		},
		push : function( h ) {
			this.discs.push( h );
			return this.discs.length;
		},
		height: function() {
			return this.discs.length;
		},
		inspect: function() {
			var result = "";
			for (var i = 0; i < this.discs.length; i += 1 ) {
				result += this.discs[i] + " ";
			}
			console.log( result );
		}
	};


	var TowersOfHanoi = function() {
		var towers = [];

		var move = function( from, to, howMany ) {
			var toHeight = towers[to].height;
			var theOtherTower;

			if ( from + to === 1 ) {
				theOtherTower = 2;
			} else if ( from + to === 2 ) {
				theOtherTower = 1;
			} else
				theOtherTower = 0;


			if ( howMany === 1 ) {
				towers[to].push( towers[from].pop() );
			} else {
				move( from, theOtherTower, howMany - 1 );
				move( from, to, 1 );
				move( theOtherTower, to, howMany - 1);
			}
			show();
		};

		var show = function() {
			for ( var i = 0; i < towers.length; i += 1) {
				towers[i].inspect();
			}
			console.log('--------------------');
		};

		var start = function( h ) {
			towers[0] = new Tower( h );
			towers[1] = new Tower();
			towers[2] = new Tower();

			solve(h);
		};

		var solve = function ( h ) {
			show();
			move( 0 , 2, h ); // move from 0 to 2
		};

		return {
			start : start,
			move : move,
			show : show,
			solve : solve
		};

	};

});



$( document ).ready(function() {

	var towersArray = [[5, 4, 3,2,1], [], []];

	var $pole1 = $('#pole1');
	var $pole2 = $('#pole2');
	var $pole3 = $('#pole3');

	var $poles = $('.pole');

	var height = 7;
	var moveFlag = false;
	var poleFrom;
	var poleTo;
	var discToMove;

	function init() {
		for ( var i = 0;  i < height; i += 1 ) {
			$pole1.append('<div class="disc"></div>');
		}
		for ( i = 0;  i < height; i += 1 ) {
			$pole2.append('<div class="disc"></div>');
		}
		for ( i = 0;  i < height; i += 1 ) {
			// $pole3.append('<div class="disc" style="width:' + (i+1)*20 +'px"></div>');
			$pole3.append('<div class="disc"></div>');
		}  
	}



	function update() {
		var m = 25;

		var clearPole = function(which) {
			for ( var i = 0; i < height; i += 1) {
				which.find( 'div:nth-child(' + (i+1) + ')' ).css( 'width', '0px' );
			}
		};

		var fillPole = function(idx, which) {
			for (var i = 0 ; i < towersArray[idx].length; i += 1 ) {
				which.find( 'div:nth-child(' + ( height  - i ) + ')' ).css("width", (towersArray[idx][i]*m).toString() +"px" );				
			}
		};

		clearPole($pole1);
		clearPole($pole2);
		clearPole($pole3);

		fillPole(0, $pole1);
		fillPole(1, $pole2);
		fillPole(2, $pole3);

	}
	
	var poleToId, poleFromId;

	$poles.click(function() {
		if ( moveFlag ) {						    // pole getting moved to 
			moveFlag = false;
			poleTo = $(this).attr("id");
			updateArray(poleFrom, poleTo);
			
		} else {									// pole getting moved from 
			moveFlag = true;
			poleFrom = $(this).attr("id");
		}
	});


	function updateArray(from, to) {
		var x = parseInt(from[from.length-1]) - 1;
		var y = parseInt(to[to.length-1]) - 1;

		towersArray[y].push(towersArray[x].pop());

		update();
	}


/*
click handler 1
keep track of the moveFlag
 if first click = from is 1
 if secon click = to is 
 	do themove (x, 1)

 	click handler 2
keep track of the moveFlag
if first click = from is 2
 if secon click = to is 2
 	doTheMove(x, 2)




doTheMove(from, to) {
	//validates
	pops from from pole
	pushes to the to Pole
}

*/






	init();
	update();


});