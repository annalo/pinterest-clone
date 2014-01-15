class Board < ActiveRecord::Base
  attr_accessible :name, :description, :category, :private, :user_id
  
  validates :name, :private, :user_id, :presence => true
  
  belongs_to :user
  belongs_to :category
end
