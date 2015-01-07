class Video < ActiveRecord::Base
  validates_uniqueness_of :uri
  belongs_to :category
  has_many :likes
end
