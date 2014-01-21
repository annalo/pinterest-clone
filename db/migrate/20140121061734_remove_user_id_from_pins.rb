class RemoveUserIdFromPins < ActiveRecord::Migration
  def up
    remove_column :pins, :user_id
  end

  def down
    add_column :pins, :user_id, :integer
  end
end
