class AddDefaultValueToIsActive < ActiveRecord::Migration[7.1]
  def change
    change_column_default :pages, :is_active, from: nil, to: true
    change_column_default :books, :is_active, from: nil, to: true

    Page.where(is_active: nil).update_all(is_active: true)
    Book.where(is_active: nil).update_all(is_active: true)
  end
end
