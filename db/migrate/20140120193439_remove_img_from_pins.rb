class RemoveImgFromPins < ActiveRecord::Migration
  def up
    remove_column :pins, :img
  end

  def down
    add_column :pins, :img, :string
  end
end
