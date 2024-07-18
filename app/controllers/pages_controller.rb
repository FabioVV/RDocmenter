class PagesController < ApplicationController
    before_action :require_user, except: [:show]
    before_action :set_page, only: [:edit, :show, :update, :destroy, :upload_markdown_image]
    before_action :set_book, only: [:edit, :show, :create, :destroy]

    def create
        # page type -> params[:page_type]
        @page = @book.pages.build(page_params)
        @page.main_title = 'New ' + @page.page_type.to_s + ' page'

        if @page.page_type.to_s == 'title'
            @page.section_header = 'New title page'
        end

        if @page.save
            redirect_to edit_book_path(@book)
        else
            flash[:error] = @page.errors['page_type'].to_s
            redirect_to edit_book_path(@book)
        end
    end

    def edit
    end

    def update        
        if @page.update(page_params)
            # flash[:notice] = "Page saved"
        else
            render 'edit',  status: :unprocessable_entity
        end
    end

    def show
    end

    def destroy
        if @page.update(is_active:false)  
            redirect_to edit_book_path(@book)
        else    
            render 'edit', status: :unprocessable_entity
        end   
    end

    def upload_markdown_image
        image = params[:image]
        if image 
            @page.images.attach(image)
            render json: {url: rails_blob_url(@page.images.last), filename: image.original_filename}
        else
            render json: {error: "Error uploading image (C)"}, status: :unprocessable_entity
        end
    end

    private 

    def set_page
        @page = Page.active.find_by!(slug: params[:slug])
    end

    def set_book
        @book = Book.active.find_by!(slug: params[:book_slug])
    end

    def page_params
        params.require(:page).permit(:page_type, :page_image, :content, :main_title, :image_caption, :section_header, images: [])
    end

end
