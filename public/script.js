var app = new Vue({
	el: '#app',
	data: {
	    items: [],
	    shapes: [],
	    randomShapesArray: [],
	    image: '',
	},
	created: function() {
	    this.addImages();
	},
	methods: {
	    getItems: function() {
		axios.get("/api/items").then(response => {
			return true;
		}).catch(err => {
		});
	    },
	    addImages: function() {
		this.shapes.push("http://138.68.26.70/photos/DinasourBones.png");
		this.shapes.push("http://138.68.26.70/photos/BlueBerry.png");
		this.shapes.push("http://138.68.26.70/photos/Iphone.png");
		this.shapes.push("http://138.68.26.70/photos/DiscoBall.png");
		this.shapes.push("http://138.68.26.70/photos/Ferry.png");
		this.shapes.push("http://138.68.26.70/photos/HorseJockey.png");
		this.shapes.push("http://138.68.26.70/photos/MountainLion.png");
		this.shapes.push("http://138.68.26.70/photos/Pineapple.png");
	    }
	    /*createGame: function() {
	      }*/
	},
    });