json.array!(@pins) do |pin|
  json.(pin, :id, :url, :img, :description, :board_id)
  json.board(pin.board, :id, :name, :description, :category_id, :user_id)
  json.pinned current_users_pin?(pin)
end