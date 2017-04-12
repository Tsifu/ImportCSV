class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :user
      t.integer :hours
      t.float :rate
      t.integer :age
      t.float :kpi
      t.integer :rfk
      t.timestamps
    end
  end
end
