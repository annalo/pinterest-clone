json.array!(@users) do |user|
  json.(user, :id, :fname, :lname, :email)
  json.current_user current_user?(user)
  json.boards(user.boards, :id, :name, :description, :user_id)
end