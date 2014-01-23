PinterestClone.Views.PinsIndex = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, "change save", this.render);
  },
  
  template: JST["pins/index"],
  
  events: {
    "click #pin-add-button": "add",
    "click #add-icon": "add",
    "click #pin-edit-button": "edit",
    "click #edit-icon": "edit",
    "click #pin-board": "submit"
  },  
  
  render: function() {
    var renderedContent = this.template({ pins: this.collection });
    this.$el.html(renderedContent);
    return this;
  },

  add: function(event) {
    event.preventDefault();
    var pinId = $(event.currentTarget).attr("data-id");
    var pin = this.collection.get(pinId);

    var boardsPin = new PinterestClone.Models.BoardsPin({
      pin_id: pin.get("pin_id"),
      description: pin.get("description")
    });

    var view = new PinterestClone.Views.PinForm({
      model: boardsPin,
      type: "new"
    });

    $("#modal-body").empty();
    $("#modal-body").append(view.render().$el);
    $("#modal").modal("show");
  },
  
  edit: function(event) {
    event.preventDefault();
    var pinId = $(event.target).data("id");
    var pin = this.collection.get(pinId);
    
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
    var pin_id = $(event.target).data("id");
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