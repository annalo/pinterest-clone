module UsersHelper
  def current_user?(user)
    current_user == user
  end

  def users_pins(user)
    boards = user.boards
    pins = []

    boards.each do |board|
      pins << board.boards_pins
    end
    pins.flatten!
  end
end
