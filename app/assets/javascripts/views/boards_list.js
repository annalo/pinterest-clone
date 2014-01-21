PinterestClone.Views.BoardsList = Backbone.View.extend({
	initialize: function() {
	    this.boards = new PinterestClone.Collections.Boards();
	},

	events: {
		"click #create-new-board": "createBoard",
		"click #new-board-button": "submit",
		"click #go-back-list": "reRender" // re-render list
	},

	template: JST["boards/list"],

	render: function() {
		var that = this;
	    this.boards.fetch({
	    	success: function() {
				var renderedContent = that.template({ boards: that.boards });
				that.$el.html(renderedContent);
    	}
    });
		return this;
	},

	createBoard: function(event) {
		event.preventDefault();
		var newBoard = new PinterestClone.Models.Board();
		var renderedContent = JST["boards/list_new"]({ board: newBoard });
		this.$el.html(renderedContent);
	},

	reRender: function() {
		var that = this;
		this.boards.fetch({
			success: function() {
				var renderedContent = that.template({ boards: that.boards });
				that.$el.html(renderedContent);
			}
		});
	},

	submit: function(event) {
		event.preventDefault();
		var name = $("#board_name").val();
		this.boards.create({ name: name });
		debugger;

		this.reRender();
	}
});