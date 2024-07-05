module PagesHelper

    def toolbar_options(edit: false)
        if edit
            render 'toolbar/toolbar_edit'
        else
            render 'toolbar/toolbar_show'
        end
    end

    def word_count(content)
        return unless !content.blank?
        pluralize number_with_delimiter(content.split.size), "word"
    end
end
