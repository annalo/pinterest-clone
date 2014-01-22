PinterestClone.Views.UserEdit = Backbone.View.extend({
	tagName: "form",

	events: {
		"submit form": "submit"
	},

	template: JST["users/edit"],

	render: function() {
		var renderedContent = this.template({ user: this.model });
		this.$el.html(renderedContent);
		return this;
	},

	submit: function(event) {
		event.preventDefault();
		var attr = this.$el.serializeJSON();


		debugger;


		this.model.set(attr);
		this.model.save({}, {
			success: function() {
				console.log("User settings saved.");
				window.history.back();
			}
		});
	}
});