json.array!(@boards) do |board|
  json.(board, :id, :name, :description, :category_id, :private, :user_id)
  
  # json.(gist.user, :username)
  # json.user(gist.user, :id, :username)
end