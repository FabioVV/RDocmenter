class PagesController < ApplicationController
    before_action :require_user

    def create
        # page type -> params[:page_type]
        @book = Book.find(params[:book_id])
        @page = @book.pages.build(page_params)

        @page.main_title = "New page"
        @page.content = "New page" if params[:page_type] == "text"

        if @page.save
            flash[:notice] = 'Page created successfully'
            redirect_to edit_book_path(@book)
        else
            flash[:error] = 'There was a problem creating a new page'
            redirect_to edit_book_path(@book)
        end
    end

    private 

    def set_page
        @page = Page.find(params[:id])
    end

    def page_params
        params.require(:page).permit(:page_type)
    end
end
