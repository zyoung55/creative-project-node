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

app.get('/api/items', (req, res) => {
	res.send(items);
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
	id = id + 1;
	items.push({id: id, image:req.body.image, show: req.body.show});
	res.send(items);
    });


app.listen(3000, () => console.log('server listening on port 3000!'));