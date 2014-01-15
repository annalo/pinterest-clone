class CreateBoards < ActiveRecord::Migration
  def change
    create_table :boards do |t|
      t.string :name, :null => false
      t.string :description
      t.integer :category_id
      t.integer :user_id, :null => false
      t.boolean :private, :null => false

      t.timestamps
    end
    
    add_index :boards, :user_id
    add_index :boards, :category_id
    add_index :boards, :private
  end
end
