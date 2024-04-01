class CreateContents < ActiveRecord::Migration[7.1]
  def change
    create_table :contents do |t|
      t.string :title
      t.text :body
      t.integer :status, default: 0
      t.references :user

      t.timestamps
    end
  end
end
