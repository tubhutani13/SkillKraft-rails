class CreateConnectionRequests < ActiveRecord::Migration[7.1]
  def change
    create_table :connection_requests do |t|
      t.references :mentor, foreign_key: { to_table: :users }, null: false
      t.references :mentee, foreign_key: { to_table: :users }, null: false
      t.integer :status, default: 0

      t.timestamps
    end
  end
end
