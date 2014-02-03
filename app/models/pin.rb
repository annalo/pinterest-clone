class Pin < ActiveRecord::Base
  attr_accessible :img, :url

  has_attached_file :img, :styles => {
    :grid => "236x236>",
    :thumbnail => "145x145#",
    :small => "50x50#"
  }

  has_many :boards_pins
  has_many :boards, :through => :boards_pins, :source => :board
end
