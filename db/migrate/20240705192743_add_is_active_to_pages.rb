class AddIsActiveToPages < ActiveRecord::Migration[7.1]
  def change
    add_column :pages, :is_active, :boolean
  end
end
