class WigwamController < ApplicationController

    def home 
        if current_user
            @any_books = current_user.books.any?
        end
    end

end
