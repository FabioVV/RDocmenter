class Page < ApplicationRecord
  belongs_to :book

  has_many_attached :images
  
end
