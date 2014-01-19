json.(@user, :id, :fname, :lname, :email)

json.boards(@user.boards, :id, :name, :description, :user_id)
  
# json.pins(user)
