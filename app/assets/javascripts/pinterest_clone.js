window.PinterestClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    console.log("Initializing!");
    var users = new PinterestClone.Collections.Users();
    var $rootEl = $("#content");
    
    users.fetch({
      success: function() {
        new PinterestClone.Routers.Router(users, $rootEl);
        Backbone.history.start();
      },
      
      error: function() { console.log("No user logged in/fetch failed.") }
    });
  }
};

$(document).ready(function(){
  PinterestClone.initialize();
  
  $("#pin-container li").wookmark({
    autoResize: true,
    container: $("#pin-container"),
    offset: 2,
    itemWidth: 210
  });
});
