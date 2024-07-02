class Page < ApplicationRecord
  belongs_to :book

  has_many_attached :images
  has_one_attached :page_image, dependent: :purge_later

end
