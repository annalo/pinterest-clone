class Board < ActiveRecord::Base
  extend FriendlyId
  friendly_id :name, :use => :slugged

  attr_accessible :name, :description, :category_id, :user_id

  validates :name, :user_id, :presence => true

  belongs_to :user
  belongs_to :category

  has_many :boards_pins
  has_many :pins, :through => :boards_pins, :source => :pin
end
