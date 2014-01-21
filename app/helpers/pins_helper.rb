module PinsHelper
  def pinned?(pin)
    current_user.pins.include?(pin)
  end
end
