class BooksController < ApplicationController
    before_action :set_book, only: [:show, :edit, :update, :destroy, :edit_info, :update_edit_info]
    before_action :require_same_author_or_admin, only: [:edit, :update, :destroy, :edit_info, :update_edit_info]
    before_action :set_pages, only: [:edit]
    before_action :require_user


    def index 
        @any_books = current_user.books.active.any?
        @books = current_user.books.active
    end

    def show
    end

    def new 
        @book = Book.new
    end

    def create 
        @book = Book.new(book_params)
        @book.user = current_user
        @book.is_active = true

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
        if @book.update(is_active:!@book.is_active)  
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
            redirect_to edit_book_path(@book)
        else
            render 'edit_info',  status: :unprocessable_entity
        end
    end

    def live_search
        title_subtitle = params[:title_subtitle].to_s.downcase
        is_active = ActiveModel::Type::Boolean.new.cast(params[:is_active])

        books = Book.from_user(current_user.id) 
        books = books.where("title LIKE ? OR subtitle LIKE ?", "%#{title_subtitle}%", "%#{title_subtitle}%") if title_subtitle.present?
        books = books.where(is_active: is_active) unless is_active.nil?

        render json: books.to_json(methods: [:created_at_ago, :updated_at_ago, :truncated_title, :truncated_subtitle, :cover_image_url, :get_slug])
    end

    private

    def set_book
        @book = Book.find_by!(slug: params[:slug])
    end

    def set_pages
        @pages = Book.find_by!(slug: params[:slug]).pages.active
    end

    def book_params
        params.require(:book).permit(:title, :subtitle, :cover_image, :author)
    end

    def require_same_author_or_admin
        if current_user
            if current_user != @book.user && !current_user.admin?
                flash[:error] = "Forbidden action"
                redirect_to @book
            end
        end
    end
end
