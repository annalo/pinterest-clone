PinterestClone.Views.UserEdit = Backbone.View.extend({
  events: {
    "submit form#edit-user-form": "editUser",
    "click #cancel": "back"
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
  },

  back: function(event) {
    event.preventDefault();
    window.history.back()
  }
});