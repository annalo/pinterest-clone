PinterestClone.Views.PinShow = Backbone.View.extend({
  initialize: function(options) {
    this.type = options.type;
    this.listenTo(this.model, "change", this.render)
  },

  events: {
    "click #pin-add-button": "add",
    "click #add-icon": "add",
    "click #pin-edit-button": "edit",
    "click #edit-icon": "edit"
  },

  template: JST["pins/show"],

  render: function() {
    if(this.type === "edit") {
      this.edit();
    } else if(this.type === "delete") {
      this.delete();
    } else {
      var renderedContent = this.template({ pin: this.model });
      this.$el.html(renderedContent);
    }

    return this;
  },

  add: function(event) {
    event.preventDefault();

    var boardsPin = new PinterestClone.Models.BoardsPin({
      pin_id: this.model.get("pin_id"),
      description: this.model.get("description")
    });

    var view = new PinterestClone.Views.PinForm({
      model: boardsPin,
      type: "new"
    });

    $(".modal-content").empty();
    $(".modal-content").append(view.render().$el);
    $("#modal").modal("show");
  },

  edit: function(event) {
    event.preventDefault();
    var formView = new PinterestClone.Views.PinForm({
      model: this.model,
      type: "edit"
    });

    $(".modal-content").empty();
    $(".modal-content").append(formView.render().$el);
    $("#modal").modal("show");
  }
});