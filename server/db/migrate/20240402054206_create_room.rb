class CreateRoom < ActiveRecord::Migration[7.1]
  enable_extension 'pgcrypto' unless extension_enabled?('pgcrypto')
  def change
    create_table :rooms do |t|
      t.string :title
      t.timestamps
    end
  end
end
