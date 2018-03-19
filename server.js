const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'))

let items = [];
let boardImage;
let id = 0;
let indexToChange;
let show;
let arrayWithBoard = [];

app.get('/api/items', (req, res) => {
	console.log(items);
	res.send(items);
    });

app.put('/api/boardandItems', (req, res) => {
	let identificationToChange = req.body.indexToChange + 1;
        if (id === 16) {
            id = 0;
        }
	if (arrayWithBoard.length < 16) {
	    id = id + 1;
	    arrayWithBoard.push({id: id, image: req.body.image, show: req.body.show});
	}
	else if (arrayWithBoard.length === 16) {
	    id = id + 1;
	    arrayWithBoard.splice(id - 1, 1, {id: id, image:req.body.image, show: req.body.show});
	}
      res.send(arrayWithBoard);
    });

app.post('/api/items', (req, res) => {
	id = id + 1;
	items.push({id: id, image: req.body.image, show: req.body.show});
	res.send(items);
    });

app.post('/api/picture/boardImage', (req, res) => {
        boardImage = req.body.boardImage;
	res.send(boardImage);
    });

app.put('/api/items', (req, res) => {
	let identificationToChange = req.body.indexToChange + 1;
	if (id === 16) {
	    id = 0;
	}
	id = id + 1;
	items.splice(id - 1, 1, {id: id, image:req.body.image, show: req.body.show});
	res.send(items);
    });


app.listen(3000, () => console.log('server listening on port 3000!'));