module PinsHelper
	def current_users_pin?(pin)
		pin.board.user == current_user
	end
end
