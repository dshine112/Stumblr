class Category < ActiveRecord::Base
  validates_uniqueness_of :name
  has_many :pictures
  has_many :videos
  has_many :articles

  def search
    videos = []
    articles = []
    Google::Search::Video.new(:query => name, :size => :small).each do |video|
      videos << [video.uri, video.title]
    end

    Google::Search::News.new(:query => name, :edition => :us).each do |article|
      articles << [article.uri, article.title]
    end
    return [videos, articles]
  end
  
  def createContent(content)
    content[0].each do |info|
      Video.create(uri: info[0], likeCount: 0, title: info[1], category_id: id)
    end
    content[1].each do |info|
      Article.create(uri: info[0], likeCount: 0, title: info[1], category_id: id)
    end
  end

  def createUriArray
    content = []
    videos.each do |video|
      content << {id: video.id, url: video.uri, type: "video"}
    end
    articles.each do |article|
      content << {id: article.id, url: article.uri, type: "article"}
    end
    return content.shuffle
  end

  def deleteContent
    videos.destroy_all
    articles.destroy_all
  end

  def updateThumbnail
    thumbnails = []
      Google::Search::Image.new(:query => name, :image_size => :medium).each do |image|
        thumbnails << image.thumbnail_uri if image.thumbnail_width > 100 && image.thumbnail_height > 100
      end
    update(thumbnail: thumbnails.sample)
    save
  end
end