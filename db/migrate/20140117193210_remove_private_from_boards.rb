class RemovePrivateFromBoards < ActiveRecord::Migration
	def up
    remove_column :boards, :private
	end

  def down
    add_column :boards, :private, :boolean
  end
end

