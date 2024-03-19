class CreateConnections < ActiveRecord::Migration[7.1]
  def change
    create_table :connections do |t|
      t.references :mentee, null: false, foreign_key: { to_table: :users }
      t.references :mentor, null: false, foreign_key: { to_table: :users }
      t.index [:mentor_id, :mentee_id], unique: true

      t.timestamps
    end

  end
end
