json.array!(@boards) do |board|
  json.(board, :id, :name, :description, :category_id, :user_id)

  json.user do
	  json.(board.user, :id, :fname, :lname, :email)
	  json.current_user current_users_board?(board)
  end

  json.pins(board.pins, :id, :url, :img, :description)
end