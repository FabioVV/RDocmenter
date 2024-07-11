module ActionText
  module TagHelper
      def markdown_area(record, name, value: nil, **options)
          field_name = "#{record.class.model_name.param_key}[#{name}]"
          value = record.content.to_s if value.nil?

          tag('doc-menter', nil, id: 'main-editor', **options) + hidden_field_tag(field_name, value, id: "#{name}_hidden")
          
      end
  end
  
  class Markdown < Record
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
  end
end

module ActionView
  module Helpers
    class FormBuilder
      def markdown_area(method, **options)
        @template.markdown_area(@object, method, **options)
      end
    end
  end
end
  