post '/search' do
  @category = Category.find_by(name: params[:search].downcase)
  if @category
    # if @category.created_at.to_date < (Time.now.to_date - 1)
    #   @category.deleteContent
    #   @category.createContent(@category.search)
    #   @category.updateThumbnail
    #   @category.update(created_at: Time.now)
    # end
    @category.searchCount += 1
    @category.save
  else
    @category = Category.create(name: params[:search].downcase, searchCount: 1)
    @category.updateThumbnail
    @category.createContent(@category.search)
  end
  @category.createUriArray.to_json
end

get '/search/:id' do |id|
  @category = Category.find(id)
  # if @category.created_at.to_date < (Time.now.to_date - 1)
  #   @category.deleteContent
  #   @category.createContent(@category.search)
  #   @category.updateThumbnail
  #   @category.update(created_at: Time.now)
  # end
  @category.searchCount += 1
  @category.save
  @category.createUriArray.to_json
end