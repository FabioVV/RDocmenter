class Page < ApplicationRecord
  belongs_to :book

  has_many_attached :images

  has_one_attached :page_image, dependent: :purge_later

  validate :file_format

  validate :page_type_s

  # cattr_accessor :preview_renderer do
  #   renderer = Redcarpet::Render::HTML.new(ActionText::Markdown::DEFAULT_RENDERER_OPTIONS)
  #   Redcarpet::Markdown.new(renderer, ActionText::Markdown::DEFAULT_MARKDOWN_EXTENSIONS)
  # end

  # def html_preview
  #   preview_renderer.render(body_preview)
  # end

  # scope :sorted, -> { order(created_at: :desc) }
  scope :before, ->(page) { where("created_at < ?", page.created_at) }
  scope :after, ->(page) { where("created_at > ?", page.created_at) }

  def previous
    page.before(self).last
  end

  def next
    page.after(self).first
  end

  private
    def body_preview
      content.to_s.first(1024)
    end

    # validate

    def page_type_s
      return unless page_type.in?(["title", "image", "text"])

      errors.add(:page_type, 'Unknow type of page.')
    end

    def file_format
      return unless page_image.attached? && !image?

      errors.add(:page_image, 'File of page must be an image')
      page_image.purge
    end

    def image?
      #["image/jpeg", "image/png", "image/gif", "image/webp"].include?(page_image.content_type)
      page_image.content_type.in?(["image/jpeg", "image/png", "image/gif", "image/webp"])
    end
end
