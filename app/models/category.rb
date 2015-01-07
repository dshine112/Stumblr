class Category < ActiveRecord::Base
  validates_uniqueness_of :name
  has_many :pictures
  has_many :videos
  has_many :articles
end