get '/top' do
  @categories = Category.all
  @videos = Video.all
  @articles = Article.all
  erb :top
end