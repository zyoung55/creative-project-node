var app = new Vue({
	el: '#app',
	data: {
	    items: [],
	    pictures: [],
	    randomizedPictures: [],
	    numberOfPictures: [],
	    numsAlreadyUsed: [],
	    numsRemaining: [],
	    randomNumber: 0,
	    firstChoice: '',
	    secondChoice: '',
	    image: '',
	    boardImage: 'http://138.68.26.70/photos/Plywood.png',
	    show: false,
	    numTimesUsed: 0,
	    gameSelected: false,
	},
	created: function() {
	    this.addImages();
	},
	methods: {
	    getItems: function() {
		axios.get("/api/items").then(response => { //
			this.pictures = this.response.data;
			console.log(this.pictures, "getItemsResponse");
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
	},
    });