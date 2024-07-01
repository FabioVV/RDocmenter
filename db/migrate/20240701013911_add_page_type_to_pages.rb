class AddPageTypeToPages < ActiveRecord::Migration[7.1]
  def change
    add_column :pages, :page_type, :string
  end
end
