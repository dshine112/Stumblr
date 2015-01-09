post '/search' do
  @category = Category.find_by(name: params[:search].downcase)
  if @category
    @category.searchCount += 1
    @category.save
    @category.timeCheck
  else
    @category = Category.create(name: params[:search].downcase, searchCount: 1)
    @category.updateThumbnail
    @category.createContent(@category.search)
  end
  @category.createUriArray.to_json
end

get '/search/:id' do |id|
  @category = Category.find(id)
  @category.timeCheck
  @category.searchCount += 1
  @category.save
  @category.createUriArray.to_json
end