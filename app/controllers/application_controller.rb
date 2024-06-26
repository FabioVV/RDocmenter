class ApplicationController < ActionController::Base
    before_action :configure_permitted_parameters, if: :devise_controller?

    helper_method :logged_in?
    
    def logged_in?
        !!current_user
    end

    # Allows for extra fields in the user forms
    def configure_permitted_parameters
        devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :first_name, :last_name])
        devise_parameter_sanitizer.permit(:account_update, keys: [:username, :first_name, :last_name])
    end

    def require_user
        if !logged_in?
            flash[:error] = ""
            redirect_to new_user_session_path
        end
    end
end
