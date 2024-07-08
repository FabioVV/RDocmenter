module MarkdownHelper
    
    DEFAULT_RENDERER_OPTIONS = {
        filter_html: false
    }
  
      DEFAULT_MARKDOWN_EXTENSIONS = {
        autolink: true,
        highlight: true,
        no_intra_emphasis: true,
        fenced_code_blocks: true,
        lax_spacing: true,
        strikethrough: true,
        tables: true
    }
    def markdown_to_html(content)
        renderer = Redcarpet::Render::HTML.new(DEFAULT_RENDERER_OPTIONS)
        markdown = Redcarpet::Markdown.new(renderer, DEFAULT_MARKDOWN_EXTENSIONS)    
        markdown.render(content).html_safe
    end
end
