post '/search' do
  @category = Category.find_by(name: params[:search].downcase)
  if @category
    @category.searchCount += 1
    @category.save
  else
    @category = Category.create(name: params[:search].downcase, searchCount: 1)
    @category.updateThumbnail
    @category.createContent(@category.search)
  end
  @category.createUriArray.to_json
end