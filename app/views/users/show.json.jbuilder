json.(@user, :id, :fname, :lname, :email)
json.current_user current_user?(@user)
json.board_count @user.boards.length
json.pin_count @user.pins.length

json.boards @user.boards do |board|
  json.(board, :id, :name, :description, :user_id)
  json.owned owned?(board)
end

json.pins @boards_pins do |boards_pin|
  json.(boards_pin, :id, :pin_id, :board_id, :description)
  json.(boards_pin.pin, :img, :url)
  json.pinned pinned?(boards_pin)
end