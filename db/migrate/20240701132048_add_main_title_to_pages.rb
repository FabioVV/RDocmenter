class AddMainTitleToPages < ActiveRecord::Migration[7.1]
  def change
    add_column :pages, :main_title, :string
  end
end
