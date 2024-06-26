class BooksController < ApplicationController
    before_action :set_book, only: [:show, :edit, :update, :destroy]

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

        if @book.save
            flash[:notice] = "Book/Document created successfully!"
            redirect_to books_path

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
        params.require(:book).permit(:title, :subtitle)
    end


end
