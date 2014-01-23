class RemoveDescriptionFromPins < ActiveRecord::Migration
  def up
    remove_column :pins, :description
  end

  def down
    add_column :pins, :description, :string
  end
end
