
module MarkdownHelper
    class CustomMarkdownRenderer < Redcarpet::Render::HTML
        def link(link, title, content)
          if title
            %(<a href="#{link}" title="#{title}" target="_blank" rel="nofollow">#{content}</a>)
          else
            %(<a href="#{link}" target="_blank" rel="nofollow">#{content}</a>)
          end
        end
    end

    def markdown_to_html(content)
        renderer = CustomMarkdownRenderer.new(ActionText::Markdown::DEFAULT_RENDERER_OPTIONS)
        markdown = Redcarpet::Markdown.new(renderer, ActionText::Markdown::DEFAULT_MARKDOWN_EXTENSIONS)    

        content = "" if !content
        markdown.render(content).html_safe
    end
end
