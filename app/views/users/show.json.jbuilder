json.(@user, :id, :fname, :lname, :email)
json.current_user current_user?(@user)
json.boards(@user.boards, :id, :name, :description, :user_id)

json.pins @boards_pins do |boards_pin|
	json.(boards_pin, :id, :pin_id, :board_id, :description)
	json.(boards_pin.pin, :img, :url)
	json.pinned pinned?(boards_pin)
end