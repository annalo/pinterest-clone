class CreateBoardsPins < ActiveRecord::Migration
  def change
    create_table :boards_pins do |t|
      t.integer :board_id, :null => false
      t.integer :pin_id, :null => false
      t.string :description

      t.timestamps
    end

    add_index :boards_pins, :board_id
  end
end
