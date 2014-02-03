PinterestClone.Views.PinForm = Backbone.View.extend({
  template0: JST["pins/form"],
  template1: JST["pins/edit_upload"],
  template2: JST["pins/edit_web"],

  initialize: function(options) {
    this.type = options.type;

    // determines which template to render
    if(this.type === "new") {
      this.template = this['template0'];
    } else {
      var url = this.model.get("url")
      if(url === null || url === "") {
        this.template = this['template1'];
      } else {
        this.template = this['template2'];
      }
    }
  },

  tagName: "form",

  events: {
    "click #cancel": "closeModal",
    "click #delete-pin": "delete",
    "click #create-board": "createBoard",
    "click #submit-pin-button": "submit"
  },

  render: function() {
    var renderedContent = this.template({ pin: this.model });
    this.$el.html(renderedContent);

    var listView = new PinterestClone.Views.BoardsList({ model: this.model });
    this.$("#boards-list-wrapper").append(listView.render().$el);

    return this;
  },

  closeModal: function() {
    $("#modal").modal("hide");
  },

  submit: function(event) {
    event.preventDefault();
    $(".modal-content").html(JST["loading"]);

    var that = this;
    event.preventDefault();
    var attrs = this.$el.serializeJSON().pin;
    var newBoardId = parseInt(attrs.board_id);

    // if pinning/editing a pin
    if(this.model.name == "boardsPin") {
      var origBoardId = this.model.get("board_id");

      this.model.set({
        board_id: newBoardId,
        description: attrs.description
      });

      this.model.save({}, {
        success: function(pin) {

          // keep original board
          if(origBoardId == pin.get("board_id")) {

            // close modal (back to original page)
            $("#modal").modal("hide");
            $(".modal-backdrop").remove();

            // change board
          } else {
            $("#modal").modal("hide");
            $(".modal-backdrop").remove();

            Backbone.history.navigate(
              "#/users/" + pin.get("user").id + "/boards/" + pin.get("board_id"),
              { trigger: true });
          }
        }
      });

    // if uploading a pin
    } else {
      this.model.set({ description: attrs.description });
      this.model.save({}, {
        success: function(pin) {

          // upon successful creation of pin, create boards_pins relation
          var newBoardsPin = new PinterestClone.Models.BoardsPin({
            board_id: attrs.board_id,
            pin_id: pin.id,
            description: pin.get("description")
          });
          // save join
          newBoardsPin.save({}, {
            success: function(model) {
              $("#modal").modal("hide");
              $(".modal-backdrop").remove();

              // redirect to user board show page
              Backbone.history.navigate(
                "#/users/" + model.get("user").id + "/boards/" + model.get("board_id"),
                { trigger: true });
            },

            // if fail, delete pin
            error: function() {
              that.model.destroy({
                success: function() {
                  $("#modal").modal("hide");
                  $(".modal-backdrop").remove();
                }
              })
            }
          });
        }
      });
    }
  },

  delete: function() {
    this.model.destroy({
      success: function(model) {
        console.log("model was deleted")
        $("#modal").modal("hide");
        $(".modal-backdrop").remove();
      }
    });
  }
});