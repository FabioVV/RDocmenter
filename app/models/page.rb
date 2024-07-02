class Page < ApplicationRecord
  belongs_to :book

  has_many_attached :images
  has_one_attached :page_image, dependent: :purge_later

  # cattr_accessor :preview_renderer do
  #   renderer = Redcarpet::Render::HTML.new(ActionText::Markdown::DEFAULT_RENDERER_OPTIONS)
  #   Redcarpet::Markdown.new(renderer, ActionText::Markdown::DEFAULT_MARKDOWN_EXTENSIONS)
  # end

  # def html_preview
  #   preview_renderer.render(body_preview)
  # end

  private
    def body_preview
      content.to_s.first(1024)
    end

end
