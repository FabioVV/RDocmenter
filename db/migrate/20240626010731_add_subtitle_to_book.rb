class AddSubtitleToBook < ActiveRecord::Migration[7.1]
  def change
    add_column :books, :subtitle, :string
  end
end
