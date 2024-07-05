module PagesHelper
    def toolbar_options(edit: false)
        if edit
            render 'toolbar/toolbar_edit'
        else
            render 'toolbar/toolbar_show'
        end
    end
end
