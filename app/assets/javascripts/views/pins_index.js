PinterestClone.Views.PinsIndex = Backbone.View.extend({
  initialize: function() {
  },
  
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
  
  edit: function(event) {
    event.preventDefault();
    var pin_id = $(event.target).attr("data-id");
    var pin = this.collection.get(pin_id);
    
    var view = new PinterestClone.Views.PinForm({ 
      model: pin,
      type: "edit"
    });
    
    $("#modal-body").empty();
    $("#modal-body").append(view.render().$el);
    $("#modal").modal("show");
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