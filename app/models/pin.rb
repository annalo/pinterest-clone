class Pin < ActiveRecord::Base
  attr_accessible :description, :img, :url, :user_id
  
  belongs_to :user
  has_many :boards_pins
end
