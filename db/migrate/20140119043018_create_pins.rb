class CreatePins < ActiveRecord::Migration
  def change
    create_table :pins do |t|
      t.string :url
      t.string :img
      t.string :description

      t.timestamps
    end
  end
end
