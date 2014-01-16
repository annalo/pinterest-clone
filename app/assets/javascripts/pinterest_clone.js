window.PinterestClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    console.log("Initializing!");
    var boards = new PinterestClone.Collections.Boards();
    var $rootEl = $("#content");
    
    boards.fetch({
      success: function() {
        new PinterestClone.Routers.Router(boards, $rootEl);
        Backbone.history.start();
      },
      
      error: function() { console.log("No user logged in.") }
    });
  }
};

$(document).ready(function(){
  PinterestClone.initialize();
});
