class PagesController < ApplicationController
    before_action :require_user


    def new
        @page = Page.new
    end

    def create
        # page type -> params[:page_type]

    end


    private 

    def set_page
        @page = Page.find(params[:id])
    end

    def page_params
        params.require(:page).permit(:content, :page_type)
    end
end
