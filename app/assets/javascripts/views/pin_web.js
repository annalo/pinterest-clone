PinterestClone.Views.PinWeb = Backbone.View.extend({
  initialize: function(options) {
    this.type = options.type;
  },

  events: {
    "submit form#web-pin-form": "extractImgs"
  },

  template: JST["pins/web"],

  render: function() {
    var renderedContent = this.template({});
    this.$el.html(renderedContent);
    return this;
  },

  extractImgs: function(event) {
    event.preventDefault();
    $(".modal-content").html(JST["loading"]);

    var that = this;
    var attrs = $(event.currentTarget).serializeJSON()
    this.model.set({ url: attrs.url });

    // embedly api call for images
    $.embedly.defaults.key = "04c61e496d6f4659a1a6225c29e745d8";
    $.embedly.extract(attrs.url).progress(function(data) {
      $("#modal").modal("hide");
      $(".modal-backdrop").remove();
      var images = data.images;

      // render view with images for selection
      var showView = new PinterestClone.Views.PinWebShow({
        model: that.model,
        images: images
      });
      $("#content").html(showView.render().$el);
    });
  }


});