class CreatePins < ActiveRecord::Migration[6.1]
  def change
    create_table :pins do |t|
      t.string :name
      t.string :address
      t.float :latitude
      t.float :longitude
      t.float :rating
      t.text :comment
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
    add_index :pins, %i[user_id created_at]
  end
end
