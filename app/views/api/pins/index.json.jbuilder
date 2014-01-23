json.array!(@pins) do |pin|
  json.(pin, :id, :url, :img)
  json.description pin.boards_pins.first.description
  json.board_id pin.boards_pins.first.board_id
  json.pinned current_users_pin?(pin)
end