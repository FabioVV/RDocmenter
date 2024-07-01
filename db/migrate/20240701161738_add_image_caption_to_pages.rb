class AddImageCaptionToPages < ActiveRecord::Migration[7.1]
  def change
    add_column :pages, :image_caption, :string
  end
end
