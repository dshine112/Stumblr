class CreateLikes < ActiveRecord::Migration
  def change
    create_table :likes do |t|
      t.text :uri
      t.text :title
      t.references :article
      t.references :video
      t.references :user
      t.timestamps
    end
  end
end
