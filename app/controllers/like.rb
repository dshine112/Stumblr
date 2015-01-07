post '/video/:id' do |id|
  video = Video.find(id)
  if video.likes.find_by(user_id: session[:user_id]) == nil
    video.likeCount += 1
    video.save
    Like.create(user_id: session[:user_id], video_id: video.id, uri: video.uri, title: video.title)
  else
    "exists"
  end
end

post '/article/:id' do |id|
  article = Article.find(id)
  if article.likes.find_by(user_id: session[:user_id]) == nil
    article.likeCount += 1
    article.save
    Like.create(user_id: session[:user_id], article_id: article.id, uri: article.uri, title: video.title)
  else
  "exists"
  end
end