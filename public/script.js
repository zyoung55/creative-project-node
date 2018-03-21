var app = new Vue({
	el: '#app',
	data: {
	    items: [],
	    pictures: [],
	    randomizedPictures: [],
	    numberOfPictures: [],
	    numsAlreadyUsed: [],
	    numsRemaining: [],
	    tempArrrayWithBoard: [],
	    arrayWithBoard: [],
	    randomNumber: 0,
	    firstChoice: 0,
	    secondChoice: 0,
	    image: '',
	    boardImage: 'http://138.68.26.70/photos/Plywood.png',
	    show: false,
	    numTimesUsed: 0,
	    gameSelected: false,
	    showNewBoard: false,
	},
	created: function() {
	    this.addImages();
	},
	computed: {
	    filteredArray: function(item) {
		 if (item.show === false) {
		      return boardImage;
		 }
		 if (item.show === true) {
		      return item.image;
		 }
	    }, //watch out
	},
	methods: {
	    getItems: function() {
		axios.get("/api/items").then(response => { //
			this.items = response.data; //fixme
			console.log(response.data, "response");
			console.log(this.items, "get items response");
			console.log("Gotcha!!!!!!!");
			return true;
		}).catch(err => {
			console.log("error", err.response.data);
		});
	    },
	    getArrayWithBoard: function() {
		axios.get("/api/boardAndItems").then(response => {
			this.items = response.data;
			console.log("Woah new array bro", this.items);
			return true;
		    }).catch(err => {
			});
	    },
	    addImages: function() {
		this.pictures.push("http://138.68.26.70/photos/DinasourBones.png");
		this.pictures.push("http://138.68.26.70/photos/BlueBerry.png");
		this.pictures.push("http://138.68.26.70/photos/Iphone.png");
		this.pictures.push("http://138.68.26.70/photos/DiscoBall.png");
		this.pictures.push("http://138.68.26.70/photos/Ferry.png");
		this.pictures.push("http://138.68.26.70/photos/HorseJockey.png");
		this.pictures.push("http://138.68.26.70/photos/MountainLion.png");
		this.pictures.push("http://138.68.26.70/photos/Pineapple.png");
		this.pictures.push("http://138.68.26.70/photos/DinasourBones.png");
                this.pictures.push("http://138.68.26.70/photos/BlueBerry.png");
                this.pictures.push("http://138.68.26.70/photos/Iphone.png");
                this.pictures.push("http://138.68.26.70/photos/DiscoBall.png");
                this.pictures.push("http://138.68.26.70/photos/Ferry.png");
                this.pictures.push("http://138.68.26.70/photos/HorseJockey.png");
                this.pictures.push("http://138.68.26.70/photos/MountainLion.png");
                this.pictures.push("http://138.68.26.70/photos/Pineapple.png");
		for (var i = 0; i < this.pictures.length; ++i) {
		   axios.post("/api/items", {
		       image: this.pictures[i],
		       show: this.show,
		   }).then(response => {
		        this.getItems();
		   }).catch(err => {
		   })
		}
		axios.post("/api/picture/boardImage", {
			boardImage: this.boardImage,
		    }).then(response => {
			this.getItems();
		    }).catch(err => {
	       })

	    },	
	    fillNumberOfPictures: function() {
		for (var i = 0; i < this.pictures.length; ++i) {                                                                                                                  
                    this.numberOfPictures.push(i); 
		    console.log(this.numberOfPictures[i]);    
		 }
	    },
	    fillNumsRemaining: function() {
                for (var i = 0; i < this.pictures.length; ++i) {
                    this.numsRemaining.push(i);
                    console.log(this.numberOfPictures[i]);
		}
            },
	    clearNumberOfPictures: function() {
		var numPicturesCurrently = this.numberOfPictures.length;
		for (var i = 0; i < numPicturesCurrently; ++i) {
		    this.numberOfPictures.pop();
		    console.log(this.numberOfPictures, "Real number of Pictures");
		}
	    },
	    clearNumsRemaining: function() {
		var numsRemainingCurrently = this.numsRemaining.length;
		for (var i = 0; i < numsRemainingCurrently; ++i) {
		    this.numsRemaining.pop();
		}
	    },
	    clearNumsAlreadyUsed: function() {
		var numsAlreadyUsedCurrently = this.numsAlreadyUsed.length;
		for (var i = 0; i < numsAlreadyUsedCurrently; ++i) {
		    this.numsAlreadyUsed.pop();
		}
	    },
	    clearArrayWithBoard() {
		var originalSizeOfArray = this.arrayWithBoard.length;
		for (var i = 0; i < originalSizeOfArray; ++i) {
		    this.arrayWithBoard.pop();
		    console.log("finished clear", this.arrayWithBoard);
		}
	    },
	    changePannels: function() {
		var tempObject;
		this.getItems();
		console.log(this.firstChoice, "firstChoice", this.secondChoice, "second CHoice");
		console.log(this.items, "Items in change pannel")
		this.items[this.firstChoice].show = true;
		this.items[this.secondChoice].show = true;
		for (var i = 0; i < this.items.length; ++i) {
		    if (this.items[i].show === false) {
			tempObject = {id: i + 1, image: this.boardImage, show: false};
			this.items[i] = tempObject;
		    }
		    axios.post('/api/boardAndItems', {
		        image: this.items[i].image,
			show: this.items[i].show,
		    }).then(response => {
		       this.getArrayWithBoard(); //watch out                                                                                                                
		    }).catch(err => {
		    })
		 }
	    },
	    createGame: function() {	    
		var foundNumAlreadyUsed = false;
		var numberUsed = 0;
		this.numsAlreadyUsed.push(155);
		console.log(this.numsAlreadyUsed[0]);
		this.fillNumberOfPictures();
		this.fillNumsRemaining();
		var highestIndexOfNumberArray = this.numberOfPictures.length - 1;
		for (var i = 0; i < this.pictures.length; ++i) {
		    this.randomNumber =  Math.floor(Math.random() * 16);
		    for (var j = 0; j < this.numsAlreadyUsed.length; ++j) {
			console.log(this.randomNumber, this.numsAlreadyUsed[j], "random number and numAlready used");
			if (this.randomNumber === this.numsAlreadyUsed[j]) {
			    console.log("made it");
			    console.log(this.numsRemaining[this.numsRemaining.length - 1], this.randomNumber, "Last index numsRemaining", "random number");
			    this.randomNumber = this.numsRemaining[this.numsRemaining.length - 1];
			    this.numsRemaining.pop();
			    --highestIndexOfNumberArray;
			    this.numberOfPictures.pop();
			    foundNumAlreadyUsed = true;
			}
		    }
		    for (var k = 0; k < this.numsRemaining.length; ++k) {
			if (this.randomNumber === this.numsRemaining[k]) {
			    this.numsRemaining.splice(k, 1);
			    console.log(this.numsRemaining);
			}
		    }
		    this.getItems();
		    console.log("Random Number", this.randomNumber);  
		    this.numsAlreadyUsed.push(this.randomNumber);
		    foundNumAlreadUsed = false;
		    this.randomizedPictures[i] = this.pictures[this.randomNumber];
		    axios.put('/api/items', {
		       indexToChange: i, 
		       image: this.randomizedPictures[i],
		       show: this.show,
		    }).then(response => {
		       this.getItems(); //watch out
		    }).catch(err => {
		    })
	       }
		this.clearNumberOfPictures();
		this.clearNumsRemaining();
		this.clearNumsAlreadyUsed();
		console.log(this.numberOfPictures, "number of pictures");
		this.gameSelected = true;
	    },
	    createArrayWithBoard: function() { //May have problem with this function.
		this.changePannels();
		var tempObject;
		this.gameSelected = false; //watchout
		this.showNewBoard = true;
		console.log(this.items, "items yo");
                for (var i = 0; i < this.items.length; ++i) {
		    this.arrayWithBoard[i] = this.items[i];
		    console.log(this.arrayWithBoard[i], "Woah Array with Board");
		}
		console.log(this.arrayWithBoard);
		this.clearArrayWithBoard();
		/*console.log("made it");
		console.log(this.arrayWithBoard, "ArrayWithBoard");
		console.log(this.items);
		console.log(this.items.length, "items.length");
		for (var i = 0; i < this.items.length; ++i) {
		    console.log(i, "i");
		    console.log("winky face");
		    if (this.items[i].show === false) {
			tempObject = {id: i + 1, image: this.boardImage, show: false};
			this.arrayWithBoard.push(tempObject);
			axios.post('/api/boardAndItems', {
			     image: this.boardImage,
			     show: false,
			}).then(response => {
				this.getArrayWithBoard(); //watch out
                        }).catch(err => {
			})
		    }
		    else if (this.items[i].show === true) {
			this.arrayWithBoard[i] = this.items[i];
			axios.post('/api/boardAndItems', {
			     image: this.arrayWithBoard[i],
			     show: true,
			}).then(response => {
			     this.getArrayWithBoard(); //watch out 
			}).catch(err => {
			})
		   }
		}
		console.log(this.arrayWithBoard, "Array with board yo");*/
		
	    },
	},
    });