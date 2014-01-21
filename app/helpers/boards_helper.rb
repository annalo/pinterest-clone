module BoardsHelper
	def current_users_board?(board)
		board.user == current_user
	end
end
