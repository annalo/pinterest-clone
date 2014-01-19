class BoardsPin < ActiveRecord::Base
  attr_accessible :board_id, :pin_id
  
  validates :board_id, :pin_id, :presence => true
  
  belongs_to :board
  belongs_to :pin
end
