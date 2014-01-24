PinterestClone.Views.PinWebShow = Backbone.View.extend({
	initialize: function(options) {
		this.images = options.images
	},

	events: {
	  "click a": "submit"
	},

	template: JST["pins/show_web"],

	render: function() {
    var renderedContent = this.template({ 
        pin: this.model,
        images: this.images 
    });
    this.$el.html(renderedContent);
    return this;
	},

  submit: function(event) {
    event.preventDefault();
    var img = $(event.currentTarget).data("url");
    this.model.set({ img: img });

    // render 
    var formView = new PinterestClone.Views.PinForm({ 
    	model: this.model,
    	type: "new"
    });

    $(".modal-content").html(formView.render().$el);
    $("#modal").modal("show");
  }
});