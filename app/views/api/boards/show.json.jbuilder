json.(@board, :id, :name, :description, :category_id, :user_id)
json.pins(@board.pins, :id, :url, :img, :description)