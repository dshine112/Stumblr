class Category < ActiveRecord::Base
  validates_uniqueness_of :name
  has_many :pictures
  has_many :videos
  has_many :articles

  def search
    videos = []
    articles = []
    Google::Search::Video.new(:query => self.name, :size => :small).each do |video|
      videos << [video.uri, video.title]
    end

    Google::Search::News.new(:query => self.name, :edition => :us).each do |article|
      articles << [article.uri, article.title]
    end
    return [videos, articles, self.id]
  end

end