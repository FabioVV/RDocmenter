class Book < ApplicationRecord
    belongs_to :user
    has_many :pages, dependent: :destroy

    has_one_attached :cover_image, dependent: :purge_later

    validate :file_format

    validates :title, presence: true, 
    length: {minimum:3, maximum: 100}

    validates :subtitle, length: {minimum:0, maximum: 100}

    scope :active, -> { where(is_active: true) }
    scope :from_user, ->(user_id) { where(user_id: user_id) }

    def has_active_pages?
        pages.active.any?
    end

    def created_at_ago
        ActionController::Base.helpers.time_ago_in_words(created_at)
    end
    
    def updated_at_ago
        ActionController::Base.helpers.time_ago_in_words(updated_at)
    end

    def truncated_title
        ActionController::Base.helpers.truncate(title, length: 27, omission: ' ...')
    end

    def truncated_subtitle
        subtitle ? ActionController::Base.helpers.truncate(subtitle, length: 28, omission: ' ...') : "&#8205;".html_safe
    end



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
