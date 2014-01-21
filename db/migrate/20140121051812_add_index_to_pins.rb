class AddIndexToPins < ActiveRecord::Migration
  def change
    add_index :pins, :board_id, :unique => true
  end
end
