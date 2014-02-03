PinterestClone.Collections.BoardsPins = Backbone.Collection.extend({
  model: PinterestClone.Models.BoardsPin,
  url: "/api/boards_pins",

  comparator: function(model) {
    return -model.get("updated_at");
  },

  currentStatus : function(status){
    return _(this.filter(function(data) {
        return data.get("completed") == status;
    }));
  },

  search : function(letters){
    if(letters == "") return this;

    var pattern = new RegExp(letters, "gi");

    var pins = _(this.filter(function(data) {
      var string = _.flatten(data.attributes);
      string = String(string.join());
      return pattern.test(string);
    }));

    return new PinterestClone.Collections.BoardsPins(pins["_wrapped"]);
  },

  name: "boardsPins"
});