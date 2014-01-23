PinterestClone.Views.Header = Backbone.View.extend({
	initialize: function() {
		this.collection.bind("reset", this.render, this);
	},

	events: {
		"click #new-pin": "newPin",
		"click #new-board": "newBoard",
		"keyup #search-form": "search"
	},

	template: JST["header"],

	render: function() {
		var renderedContent = this.template({ user: this.model });
		this.$el.html(renderedContent);
		return this;
	},

  newBoard: function() {
    event.preventDefault();
    var newBoard = new PinterestClone.Models.Board();    
    var view = new PinterestClone.Views.BoardForm({ model: newBoard });
    
    $(".modal-content").empty();
    $(".modal-content").append(view.render().$el);
    $("#modal").modal("toggle");
  },

  newPin: function() {
    event.preventDefault();
    var type = $(event.target).data("type");
    var newPin = new PinterestClone.Models.Pin();

    if(type === "web") {
      var view = new PinterestClone.Views.PinWeb({ model: newPin });
    } else if(type === "upload") {
      var view = new PinterestClone.Views.PinUpload({ model: newPin });
    }

    $(".modal-content").empty();
    $(".modal-content").append(view.render().$el);
    $("#modal").modal("toggle");
  },

  search: function(event) {
  	var letters = $("#search-form").val();
  	this.renderPins(this.collection.search(letters));
  },

  renderPins: function(pins) {
  	var view = new PinterestClone.Views.PinsIndex({ collection: pins });
  	$("#content").html(view.render().$el);
  }
});