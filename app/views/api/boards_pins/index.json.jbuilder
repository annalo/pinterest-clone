json.array!(@boards_pins) do |boards_pin|
  json.(boards_pin, :id, :board_id, :pin_id, :description)
  	json.user_id boards_pin.board.user.id
  	json.updated_at boards_pin.updated_at.to_i
	json.img boards_pin.pin.img
	json.url boards_pin.pin.url
	json.pinned pinned?(boards_pin)

	json.board(boards_pin.board, :id, :name, :description)
	json.board_name boards_pin.board.name

	json.user(boards_pin.board.user, :id, :fname, :lname, :email)
	json.user_fname boards_pin.board.user.fname
	json.user_lname boards_pin.board.user.lname
end

