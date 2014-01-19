PinterestClone.Models.Pin = Backbone.Model.extend({
  urlRoot: "/api/pins",
  
  parse: function(pin) {
    var user = pin.user;
    pin.user = new PinterestClone.Models.User(user, { parse: true });
    return pin;
  }
});