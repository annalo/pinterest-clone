json.(@pin, :id, :url, :img, :description, :board_id)

json.user do 
	json.(@pin.board.user, :id, :fname, :lname, :email)
	json.current_user current_users_pin?(@pin)
end

json.board(@pin.board, :id, :name, :description, :category_id, :user_id)
