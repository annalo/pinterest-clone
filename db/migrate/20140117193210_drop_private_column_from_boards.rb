class DropPrivateColumnFromBoards < ActiveRecord::Migration
  def down
    remove_index :boards, :private
    remove_column :boards, :private
  end
end
