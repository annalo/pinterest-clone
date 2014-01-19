json.array!(@boards) do |board|
  json.(board, :id, :name, :description, :category_id, :user_id)
  json.pins(board.pins, :id, :url, :img, :description)
  
  # json.(gist.user, :username)
  # json.user(gist.user, :id, :username)
end