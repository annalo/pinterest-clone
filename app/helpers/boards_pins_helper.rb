module BoardsPinsHelper
  def current_users_board?(board)
    current_user.boards.include?(board)
  end

  def pinned?(boards_pin)
    current_user.boards_pins.any? { |users_boards_pin| users_boards_pin.id == boards_pin.id }
  end
end
