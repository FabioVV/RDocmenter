class AddSlugToBooks < ActiveRecord::Migration[7.1]
  def change
    add_column :books, :slug, :string
  end
end
