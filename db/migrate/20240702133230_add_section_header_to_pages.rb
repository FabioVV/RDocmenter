class AddSectionHeaderToPages < ActiveRecord::Migration[7.1]
  def change
    add_column :pages, :section_header, :text
  end
end
