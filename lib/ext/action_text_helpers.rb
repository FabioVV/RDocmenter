module ActionText
  module TagHelper
      def markdown_area(record, name, value: nil, **options)
          field_name = "#{record.class.model_name.param_key}[#{name}]"
          value = record.content.to_s if value.nil?

          tag.cteditor value, name: field_name, **options
      end
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
  