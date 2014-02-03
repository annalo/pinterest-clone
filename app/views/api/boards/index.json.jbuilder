json.array!(@boards) do |board|
  json.(board, :id, :name, :description, :category_id, :user_id)
  json.owned owned?(board)

  json.user do
    json.(board.user, :id, :fname, :lname, :email)
    json.current_user current_users_board?(board)
  end

  json.pins board.boards_pins do |boards_pin|
    json.(boards_pin, :id, :pin_id, :board_id, :description)
    json.(boards_pin.pin, :img, :url)
    json.pinned pinned?(boards_pin)
  end
end