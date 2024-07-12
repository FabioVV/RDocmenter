module MarkdownHelper
    def markdown_to_html(content)
        renderer = Redcarpet::Render::HTML.new(ActionText::Markdown::DEFAULT_RENDERER_OPTIONS)
        markdown = Redcarpet::Markdown.new(renderer, ActionText::Markdown::DEFAULT_MARKDOWN_EXTENSIONS)    

        content = "" if !content
        markdown.render(content).html_safe
    end
end
