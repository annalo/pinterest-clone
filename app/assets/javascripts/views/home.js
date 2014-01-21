PinterestClone.Views.Home = Backbone.View.extend({
  events: {
    "click #pin-add-button": "add"
  },
  
  template: JST["home"],
  
  render: function() {
    var renderedContent = this.template({ pins: this.collection });
    this.$el.html(renderedContent);
    return this;
  },
  
  add: function(event) {
    event.preventDefault();
    var pin_id = $(event.currentTarget).val();
    var pin = this.collection.get(pin_id);
    var attrs = pin.attributes

    var newPin = new PinterestClone.Models.Pin(attrs);
    newPin.unset("board_id", { silent: true });
    newPin.unset("id", { silent: true });

    var view = new PinterestClone.Views.PinForm({
      model: newPin,
      type: "new"
    });

    $("#modal-body").empty();
    $("#modal-body").append(view.render().$el);
    $("#modal").modal("show");
  }
});