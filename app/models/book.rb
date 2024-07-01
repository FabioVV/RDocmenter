class Book < ApplicationRecord
    belongs_to :user
    has_many :pages, dependent: :destroy

    has_one_attached :cover_image

    validate :file_format

    validates :title, presence: true, 
    length: {minimum:3, maximum: 100}

    validates :subtitle, length: {minimum:0, maximum: 100}


    private 

    def file_format
        return unless cover_image.attached? && !image?

        errors.add(:cover_image, 'Cover of book/document must be an image')
        cover_image.purge
    end

    def image?
        #["image/jpeg", "image/png", "image/gif", "image/webp"].include?(cover_image.content_type)
        cover_image.content_type.in?(["image/jpeg", "image/png", "image/gif", "image/webp"])
    end
end
