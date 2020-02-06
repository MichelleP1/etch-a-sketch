const grid = document.querySelector('.grid');
const buttons = document.querySelectorAll('button');

const reset = document.querySelector('#reset');
const randomColor = document.querySelector('#randomColor');
const greyScale = document.querySelector('#greyScale');
const solid = document.querySelector('#solid');

const black = document.querySelector('#black');
const red = document.querySelector('#red');
const blue = document.querySelector('#blue');
const yellow = document.querySelector('#yellow');
const orange = document.querySelector('#orange');
const purple = document.querySelector('#purple');
const green = document.querySelector('#green');

let row = [];
let square = [];
let squareId = 0;
let size = 16;

let draw = false;
let useSolid = true;
let useGreyScale = false;
let useRandomColor = false;
let penColor = 'black';
let isColored = [];
let lightPercent = [];
let saturationPercent = 0;
let hue = 0;


function createGrid (size) {

	// Creates the rows
	for (let j = 0; j < size; j++) {
		row[j] = document.createElement('div');
		row[j].classList.add('row');
		grid.appendChild(row[j]);

		// Creates the squares within the rows
		for (let i = 0; i < size; i++) {
			squareId = i + (j * size);
			square[squareId] = document.createElement('div');
			square[squareId].classList.add('square');
			square[squareId].style.backgroundColor = 'white';
			row[j].appendChild(square[squareId]);
		}
	}
}

function changeColor() {

	// Sets event listeners to each square
	for (let i = 0; i < (size * size); i++) {
		square[i].addEventListener('mouseover', color);

		function color() {
			if (useRandomColor) {
				let color = Math.floor(Math.random() * 16777216).toString(16);
				penColor = ('#000000'.slice(0, -color.length) + color).toString();
			}

			// Darkens square by 10% if already colored
			if (useGreyScale) {
				if (!isColored[i]) {
					lightPercent[i] = 90;
					penColor = `hsl(${hue}, ${saturationPercent}%, ${lightPercent[i]}%)`;
				}
				if (isColored[i]) {
					lightPercent[i] -= 10;
					penColor = `hsl(${hue}, ${saturationPercent}%, ${lightPercent[i]}%)`;
				}
			}

			if (draw) {
				square[i].style.backgroundColor = penColor;
				
				if (useGreyScale) {
					isColored[i] = true;
				}
			}
		}
	}
}

function promptGridSize() {

	// Resets grid
	for (let j = 0; j < size; j++) {
		grid.removeChild(row[j]);

		for (let i = 0; i < size; i++) {

			squareId = i + (j * size);
			row[j].removeChild(square[squareId]);
		}
	}

	// Resets shading
	for (let k = 0; k < size * size; k++) {
		isColored[k] = false;
		lightPercent[k] = 90;
	}

	do {
		size = prompt('Choose size for grid creation', '16');	
	}
	while (isNaN(size) || size > 200);

	createGrid(size);
	changeColor();
}


grid.addEventListener('mousedown', e => {
    if (e) {
        draw = true;
    }
});

grid.addEventListener('mouseup', e => {
    if (e) {
        draw = false;
    }
});


randomColor.addEventListener('click', e => {
	useRandomColor = true;
	useGreyScale = false;
	useSolid = false;
	randomColor.style.backgroundColor = 'grey';
	greyScale.style.backgroundColor = 'white';
	solid.style.backgroundColor = 'white';

	buttons.forEach((button) => {
		console.log(button.id); 
		button.style.border = '0px solid white';   
	});
});

greyScale.addEventListener('click', e => {
	useGreyScale = true;
	useRandomColor = false;
	useSolid = false;	
	greyScale.style.backgroundColor = 'grey';
	randomColor.style.backgroundColor = 'white';
	solid.style.backgroundColor = 'white';
});

solid.addEventListener('click', e => {
	useSolid = true;
	useGreyScale = false;
	useRandomColor = false;	
	solid.style.backgroundColor = 'grey';
	greyScale.style.backgroundColor = 'white';
	randomColor.style.backgroundColor = 'white';
});


black.addEventListener('click', e => {
	penColor = 'black';
	saturationPercent = 0;
	hue = 0;

	buttons.forEach((button) => {
		console.log(button.id); 
		button.style.border = '0px solid white';   
	});

	black.style.border = '2px solid white';
});

red.addEventListener('click', e => {
	penColor = 'red';
	saturationPercent = 100;
	hue = 0;

	buttons.forEach((button) => {
		console.log(button.id); 
		button.style.border = '0px solid white';   
	});

	red.style.border = '2px solid white';
});

blue.addEventListener('click', e => {
	penColor = 'blue';
	saturationPercent = 100;
	hue = 240;

	buttons.forEach((button) => {
		console.log(button.id); 
		button.style.border = '0px solid white';   
	});

	blue.style.border = '2px solid white';
});

yellow.addEventListener('click', e => {
	penColor = 'yellow';
	saturationPercent = 100;
	hue = 60;

	buttons.forEach((button) => {
		console.log(button.id); 
		button.style.border = '0px solid white';   
	});

	yellow.style.border = '2px solid white';
});

orange.addEventListener('click', e => {
	penColor = 'orange';
	saturationPercent = 100;
	hue = 39;

	buttons.forEach((button) => {
		console.log(button.id); 
		button.style.border = '0px solid white';   
	});

	orange.style.border = '2px solid white';
});

purple.addEventListener('click', e => {
	penColor = 'purple';
	saturationPercent = 100;
	hue = 300;

	buttons.forEach((button) => {
		console.log(button.id); 
		button.style.border = '0px solid white';   
	});

	purple.style.border = '2px solid white';
});

green.addEventListener('click', e => {
	penColor = 'green';
	saturationPercent = 100;
	hue = 120;

	buttons.forEach((button) => {
		console.log(button.id); 
		button.style.border = '0px solid white';   
	});

	green.style.border = '2px solid white';
});

solid.style.backgroundColor = 'grey';
black.style.border = '2px solid white';

reset.addEventListener('click', promptGridSize);

createGrid(size);
changeColor();

