class CreateVideos < ActiveRecord::Migration
  def change
    create_table :videos do |t|
      t.text :uri
      t.text :title
      t.integer :likeCount
      t.references :category
      t.timestamps
    end
  end
end