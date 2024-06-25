class WigwamController < ApplicationController

    def home 
        @any_books = current_user.books.any?
    end

end
