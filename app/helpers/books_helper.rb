module BooksHelper
    def word_count(content)
        return unless !content.blank?
        pluralize number_with_delimiter(content.split.size), "word"
    end
end
