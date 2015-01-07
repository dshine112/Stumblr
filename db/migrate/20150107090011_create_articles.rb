class CreateArticles < ActiveRecord::Migration
  def change
    create_table :articles do |t|
      t.text :uri
      t.text :title
      t.integer :likeCount
      t.references :category
      t.timestamps
    end
  end
end