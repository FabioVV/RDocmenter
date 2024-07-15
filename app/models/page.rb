class Page < ApplicationRecord
  belongs_to :book
  before_save :_sanitize_content

  has_many_attached :images
  has_one_attached :page_image, dependent: :purge_later

  validate :file_format
  validate :valid_page_type

  cattr_accessor :preview_renderer do
    renderer = Redcarpet::Render::HTML.new(ActionText::Markdown::DEFAULT_RENDERER_OPTIONS)
    Redcarpet::Markdown.new(renderer, ActionText::Markdown::DEFAULT_MARKDOWN_EXTENSIONS)
  end

  def html_preview
    preview_renderer.render(body_preview)
  end


  # scope :sorted, -> { order(created_at: :desc) }
  scope :active, -> { where(is_active: true) }
  scope :before, ->(page) { where("created_at < ?", page.created_at).active }
  scope :after, ->(page) { where("created_at > ?", page.created_at).active }


  def previous
    book.pages.before(self).last
  end

  def next
    book.pages.after(self).first
  end

  def is_page_image?
    page_type == 'image'
  end

  private
    def body_preview
      content.to_s.first(1024)
    end

    def strip_html_tags_except_entities(text)
      sanitized_text = ActionController::Base.helpers.strip_tags(text)
      sanitized_text.gsub(/&amp;#13;/, "&#13;")
    end

    def _sanitize_content

      self.content = strip_html_tags_except_entities(content) if self.content?
      # self.content = self.content.gsub("# ", "")
      # # self.content = self.content.gsub("\n", "<br>")
      # self.content = Loofah.fragment(content).scrub!(CustomScrubber.new).to_s

    end

    # validate

    def valid_page_type
      return unless !page_type.in?(["title", "image", "text"])

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
