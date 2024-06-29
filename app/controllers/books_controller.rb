class BooksController < ApplicationController
    before_action :set_book, only: [:show, :edit, :update, :destroy, :edit_info, :update_edit_info]
    before_action :require_same_author_or_admin, only: [:edit, :update, :destroy, :edit_info, :update_edit_info]
    before_action :require_user, only: [:edit, :update, :destroy, :edit_info, :update_edit_info]

    def index 
        @any_books = current_user.books.any?
        @books = current_user.books.where(is_active: true)
    end

    def show
    end

    def new 
        @book = Book.new
    end

    def create 
        @book = Book.new(book_params)
        @book.user = current_user

        if @book.save
            # flash[:notice] = "Book/Document created successfully!"
            redirect_to edit_book_path(@book)
        else
            render 'new', status: :unprocessable_entity
        end

    end

    def edit
    end

    def update
    end

    def destroy
        #TODO: Add a is_active to book and deactivate, not delete 
        if @book.update(is_active:false)  
            flash[:notice] = 'Book/Document deleted successfully'
            redirect_to books_path
        else    
            render 'edit_info', status: :unprocessable_entity
        end      
    end

    def edit_info
    end

    def update_edit_info
        if @book.update(book_params)
            # @book.cover_image.attach(params[:cover_image])

            flash[:notice] = "Book information updated successfully"
            redirect_to edit_book_path(@book)
        else
            render 'edit_info',  status: :unprocessable_entity
        end
    end

    private

    def set_book
        @book = Book.find(params[:id])
    end

    def book_params
        params.require(:book).permit(:title, :subtitle, :cover_image)
    end

    def require_same_author_or_admin
        if current_user != @book.user && !current_user.admin?
            flash[:error] = "Forbidden action"
            redirect_to @book
        end
    end
end
