class AddIsActiveToBooks < ActiveRecord::Migration[7.1]
  def change
    add_column :books, :is_active, :boolean
  end
end
