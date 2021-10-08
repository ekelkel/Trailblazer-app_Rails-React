class AddIndexToTaggings < ActiveRecord::Migration[6.1]
  def change
    add_index :taggings, %i[tag_id pin_id], unique: true
  end
end
