class CreateCategories < ActiveRecord::Migration
  def change
    create_table :categories do |t|
      t.string :name
      t.text :thumbnail
      t.integer :searchCount
      t.timestamps
    end
  end
end