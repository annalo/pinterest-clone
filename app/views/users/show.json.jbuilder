json.(@user, :id, :fname, :lname, :email)
json.current_user current_user?(@user)
json.boards(@user.boards, :id, :name, :description, :user_id)
json.pins(@user.pins, :id, :url, :img, :description, :board_id)