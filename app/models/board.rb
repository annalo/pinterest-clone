class Board < ActiveRecord::Base
  attr_accessible :name, :description, :category_id, :private, :user_id
  
  validates :name, :user_id, :presence => true
  validates_inclusion_of :private, :in => [true, false]
  
  belongs_to :user
  belongs_to :category
end
