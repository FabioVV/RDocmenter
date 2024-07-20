Rails.application.routes.draw do

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  # get "up" => "rails/health#show", as: :rails_health_check

  
  # devise_for :users
devise_for(:users, controllers: { registration: "users/registrations"},
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

  root "documenter#home"

  get "live_search_books", to:"books#live_search"

  resources :books, param: :slug do 
    member do
      get "edit_info"
      patch "update_edit_info"
    end

    resources :pages, param: :slug do
      member do 
        post :upload_markdown_image
      end
    end
  end


end
