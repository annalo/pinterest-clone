PinterestClone.Views.BoardsIndex = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, "change", this.render);
  },
  
  template: JST["boards/index"],
  
  events: {
    "click #board-edit": "edit"
  },  
  
  render: function() {
    var renderedContent = this.template({ boards: this.collection });
    this.$el.html(renderedContent);
    return this;
  },
  
  edit: function() {
    event.preventDefault();
    var board_id = $(event.target).attr("data-id");
    var board = this.collection.get(board_id);
    var view = new PinterestClone.Views.BoardForm({ model: board });
    
    $("#modal-body").empty();
    $("#modal-body").append(view.render().$el);
    $("#modal").modal("toggle");
  }
});