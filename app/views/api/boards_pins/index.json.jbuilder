json.array!(@boards_pins) do |boards_pin|
  json.(boards_pin, :id, :board_id, :pin_id, :description)
	json.img boards_pin.pin.img
	json.url boards_pin.pin.url
	json.pinned pinned?(boards_pin)
	json.board(boards_pin.board, :id, :name, :description)
	json.user(boards_pin.board.user, :id, :fname, :lname, :email)
end

