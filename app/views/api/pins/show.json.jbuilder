json.(@pin, :id, :url, :img, :description)
json.user(@pin.user, :id, :fname, :lname, :email)
