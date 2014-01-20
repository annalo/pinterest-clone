class AddAttachmentImgToPins < ActiveRecord::Migration
  def self.up
    change_table :pins do |t|
      t.attachment :img
    end
  end

  def self.down
    drop_attached_file :pins, :img
  end
end
