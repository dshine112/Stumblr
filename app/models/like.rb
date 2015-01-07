class Like < ActiveRecord::Base
  belongs_to :user
  belongs_to :picture
  belongs_to :video
end