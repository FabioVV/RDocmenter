class BooksController < ApplicationController
    before_action :set_book, only: [:show, :edit, :update, :destroy]
    before_action :require_same_author, only: [:edit, :update, :destroy]

    def index 
        @any_books = current_user.books.any?
        @books = current_user.books
    end

    def show
    end

    def new 
        @book = Book.new
    end

    def create 
        @book = Book.new(book_params)
        @book.user = current_user
        @book.cover_image.attach(params[:cover_image])

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
    end


    private

    def set_book
        @book = Book.find(params[:id])
    end

    def book_params
        params.require(:book).permit(:title, :subtitle, :cover_image)
    end

    def require_same_author
        if current_user != @book.user && !current_user.admin?
            flash[:error] = "Forbidden action"
            redirect_to @book
        end
    end
end
