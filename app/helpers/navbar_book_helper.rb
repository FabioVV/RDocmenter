module NavbarBookHelper
    def navbar_book_options(options = {})
        should_return_to = options[:should_return_to] || :back
        book =  options[:book]
        page = options.fetch(:page, false)
        hide_input =  options.fetch(:hide_input, false)

        render 'layouts/nav_book', should_return_to: should_return_to, page: page, book: book, hide_input: hide_input
    end
end
