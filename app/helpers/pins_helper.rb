module PinsHelper
	def current_users_pin?(pin)
		current_user.pins.each do |users_pin|
			return true if users_pin.id == pin.id
		end
		false
	end
end
