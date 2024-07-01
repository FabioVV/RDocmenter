Rails.application.routes.draw do

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  # get "up" => "rails/health#show", as: :rails_health_check

  
  # devise_for :users
  devise_for(:users, controllers: {
    registration: "users/registrations"},
  :path => "users", #/users/sign_in
  :path_names => {
    :sign_in => "login",
    :sign_out => "logout",
    :password => "secret",
    :confirmation => "verification",
    :unlock => "unblock",
    :registration => "register",
    :sign_up => "create-account" 
  }
)

  # Defines the root path route ("/")
  root "wigwam#home"


  resources :books do 

    member do
      get "edit_info", to: "books#edit_info"
      patch "update_edit_info", to: "books#update_edit_info"
    end

    resources :pages
    
  end


end






# Standard Routes: When you use resources :books, Rails automatically generates the following routes for your Book model:
# GET /books (index): Lists all books.
# GET /books/:id (show): Displays details of a specific book.
# GET /books/new (new): Shows a form to create a new book.
# POST /books (create): Creates a new book.
# GET /books/:id/edit (edit): Shows a form to edit an existing book.
# PATCH/PUT /books/:id (update): Updates an existing book.
# DELETE /books/:id (destroy): Deletes a book.

# Nested Routes (Optional): If you choose to nest resources (like resources :books do resources :pages end), it adds additional routes for pages associated with a book:
# GET /books/:book_id/pages (index): 
# GET /books/:book_id/pages/:id (show): 
# And similar routes for creating, editing, updating, and deleting pages.
# Viewing Routes: To see the routes created by Rails, run this command in your terminal:
# rails routes








# MY ROUTES BELOW (initial)


# root GET    /                                                                                                 wigwam#home
# book_pages GET    /books/:book_id/pages(.:format)                                                                   pages#index
#            POST   /books/:book_id/pages(.:format)                                                                   pages#create
# new_book_page GET    /books/:book_id/pages/new(.:format)                                                               pages#new
# edit_book_page GET    /books/:book_id/pages/:id/edit(.:format)                                                          pages#edit
#  book_page GET    /books/:book_id/pages/:id(.:format)                                                               pages#show
#            PATCH  /books/:book_id/pages/:id(.:format)                                                               pages#update
#            PUT    /books/:book_id/pages/:id(.:format)                                                               pages#update
#            DELETE /books/:book_id/pages/:id(.:format)                                                               pages#destroy
#      books GET    /books(.:format)                                                                                  books#index
#            POST   /books(.:format)                                                                                  books#create
#   new_book GET    /books/new(.:format)                                                                              books#new
#  edit_book GET    /books/:id/edit(.:format)                                                                         books#edit
#       book GET    /books/:id(.:format)                                                                              books#show
#            PATCH  /books/:id(.:format)                                                                              books#update
#            PUT    /books/:id(.:format)                                                                              books#update
#            DELETE /books/:id(.:format)   



# PAGES ROUTES

#     book_pages GET     /books/:book_id/pages(.:format)                                                                                                 pages#index
#                 POST   /books/:book_id/pages(.:format)                                                                   pages#create
#   new_book_page GET    /books/:book_id/pages/new(.:format)                                                               pages#new
# edit_book_page GET     /books/:book_id/pages/:id/edit(.:format)                                                          pages#edit
#       book_page GET    /books/:book_id/pages/:id(.:format)                                                               pages#show
#                 PATCH  /books/:book_id/pages/:id(.:format)                                                               pages#update
#                 PUT    /books/:book_id/pages/:id(.:format)                                                               pages#update
#                 DELETE /books/:book_id/pages/:id(.:format)                                                               pages#destroy
