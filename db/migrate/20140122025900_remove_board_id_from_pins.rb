class RemoveBoardIdFromPins < ActiveRecord::Migration
  def up
    remove_column :pins, :board_id
  end

  def down
    add_column :pins, :board_id, :integer
  end
end
