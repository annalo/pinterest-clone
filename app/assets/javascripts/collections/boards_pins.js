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
 
		var pattern = new RegExp(letters,"gi");
		return _(this.filter(function(data) {
		  	return pattern.test(data.get("name"));
		}));
	},

  name: "boardsPins"
});