module BoardsHelper
	def owned?(board)
		board.user == current_user
	end
end
