class CreateSummaries < ActiveRecord::Migration[6.0]
  def change
    create_table :summaries do |t|
      t.integer :points
      t.float :input_lat
      t.float :input_lng
      t.float :actual_lat
      t.float :actual_lng
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
