class Pin < ActiveRecord::Base
  attr_accessible :description, :img, :url, :user_id
  
  has_attached_file :img, :styles => {
    :grid => "236x236>",
    :small => "50x50#"
  }
  
  belongs_to :user
  has_many :boards_pins
  has_many :boards, :through => :boards_pins, :source => :board
end
