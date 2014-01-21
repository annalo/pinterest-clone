json.array!(@pins) do |pin|
  json.(pin, :id, :url, :img, :description)
  json.user(pin.user, :id, :fname, :lname, :email)
  json.pinned pinned?(pin)
end