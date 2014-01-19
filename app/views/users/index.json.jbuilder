json.array!(@users) do |user|
  json.(user, :id, :fname, :lname, :email)
  json.boards(user.boards, :id, :name, :description, :user_id)

  # json.(gist.user, :username)
  # json.user(gist.user, :id, :username)
end