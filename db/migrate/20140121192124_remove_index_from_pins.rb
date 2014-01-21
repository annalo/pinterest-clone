class RemoveIndexFromPins < ActiveRecord::Migration
  def up
    remove_index :pins, :board_id
  end

  def down
    add_index :pins, :board_id
  end
end
