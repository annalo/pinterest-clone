PinterestClone.Views.BoardsIndex = Backbone.View.extend({
  template0: JST["boards/index"],
  template1: JST["boards/all"],

  initialize: function(options) {
    this.type = options.type;

    // determines which template to render
    if(this.type === "user") {
      this.template = this['template0'];
    } else {
      this.template = this['template1'];
    }

    this.listenTo(this.collection, "change add remove", this.render);
  },
  
  events: {
    "click #board-edit-button": "edit",
    "click #new-board": "new"
  },  
  
  render: function() {
    var renderedContent = this.template({ boards: this.collection });
    this.$el.html(renderedContent);
    return this;
  },
  
  edit: function(event) {
    event.preventDefault();
    var board_id = $(event.target).attr("data-id");
    var board = this.collection.get(board_id);
    var view = new PinterestClone.Views.BoardForm({ model: board });
    
    $(".modal-content").empty();
    $(".modal-content").append(view.render().$el);
    $("#modal").modal("toggle");
  },

  new: function(event) {
    event.preventDefault();
    var newBoard = new PinterestClone.Models.Board();    
    var view = new PinterestClone.Views.BoardForm({ model: newBoard });
    
    $(".modal-content").empty();
    $(".modal-content").append(view.render().$el);
    $("#modal").modal("toggle");
  },
});