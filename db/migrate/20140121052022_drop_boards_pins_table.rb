class DropBoardsPinsTable < ActiveRecord::Migration
  def up
    drop_table :boards_pins
  end

  def down
    rails ActiveRecord::IrreversibleMigration
  end
end
