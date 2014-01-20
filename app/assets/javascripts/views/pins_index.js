PinterestClone.Views.PinsIndex = Backbone.View.extend({
  template: JST["pins/index"],
  
  events: {
    "click #pin-edit-button": "edit",
    "click #edit-icon": "edit",
    "click #pin-board": "submit"
  },  
  
  render: function() {
    var renderedContent = this.template({ pins: this.collection });
    this.$el.html(renderedContent);
    return this;
  },
  
  // change edit to pins modal
  edit: function(event) {
    event.preventDefault();
    var pin_id = $(event.target).attr("data-id");
    var pin = this.collection.get(pin_id);
    var boards = this.model.get("boards");
    
    var view = new PinterestClone.Views.PinEdit({ 
      model: pin,
      collection: boards
    });
    
    $("#modal-body").empty();
    $("#modal-body").append(view.render().$el);
    $("#modal").modal("toggle");
  },
  
  // change submit
  submit: function(event) {
    event.preventDefault();
    var pin_id = $(event.target).attr("data-id");
    var pin = this.collection.get(pin_id);
    var attrs = $("form").serializeJSON();
    
    model.set(attrs);
    
    model.save({}, {
      success: function(model) {
        Backbone.history.navigate("#/users/" + model.get("user_id"), { trigger: true });
      }
    });
  }
});