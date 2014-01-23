PinterestClone.Views.Home = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, "change", this.render)
  },

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
    var pinId = $(event.currentTarget).val();
    var pin = this.collection.get(pinId);
    var attrs = pin.attributes

    var boardsPin = new PinterestClone.Models.BoardsPin({
      pin_id: pinId,
      description: attrs.description
    });

    var view = new PinterestClone.Views.PinForm({
      model: pin,
      boardsPin: boardsPin,
      type: "new"
    });

    $("#modal-body").empty();
    $("#modal-body").append(view.render().$el);
    $("#modal").modal("show");
  }
});