class Pin < ActiveRecord::Base
  attr_accessible :description, :img, :url, :user_id, :board_id
  
  has_attached_file :img, :styles => {
    :grid => "236x236>",
    :thumbnail => "145x145#",
    :small => "50x50#"
  }
  
  belongs_to :user
  belongs_to :board
end
