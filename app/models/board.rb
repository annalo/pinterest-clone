class Board < ActiveRecord::Base
  attr_accessible :name, :description, :category_id, :user_id
  
  validates :name, :user_id, :presence => true
  
  belongs_to :user
  belongs_to :category
end
