module PagesHelper

    def toolbar_options(edit: false)
        if edit
            render 'toolbar/toolbar_edit'
        else
            render 'toolbar/toolbar_show'
        end
    end

    def link_to_previous_page(page, for_edit: false)
        if previous_leaf = leaf.previous
          path = for_edit ? edit_leafable_path(previous_leaf) : leafable_slug_path(previous_leaf)
          link_to path, data: hotkey_data_attributes("left", enabled: hotkey), class: "btn" do
            image_tag("arrow-left.svg", aria: { hidden: true }, size: 24) + tag.span("Previous: #{ previous_leaf.title }", class: "for-screen-reader")
          end
        else
        #   link_to book_slug_path(leaf.book), data: hotkey_data_attributes("left", enabled: hotkey), class: "btn" do
        #     image_tag("arrow-left.svg", aria: { hidden: true }, size: 24) + tag.span("Table of contents: #{ leaf.book.title }", class: "for-screen-reader")
        #   end
        end
      end
    
      def link_to_next_page(page, for_edit: false)
        if next_page = page.next
          path = for_edit ? edit_leafable_path(next_leaf) : leafable_slug_path(next_leaf)
          link_to path, data: hotkey_data_attributes("right", enabled: hotkey), class: "btn txt-medium min-width" do
            tag.span("Next: #{next_leaf.title }", class: "overflow-ellipsis") + image_tag("arrow-right.svg", aria: { hidden: true }, size: 24)
          end
        else
        #   link_to book_slug_path(leaf.book), data: hotkey_data_attributes("right", enabled: hotkey), class: "btn txt-medium" do
        #     tag.span("Table of contents: #{leaf.book.title }", class: "overflow-ellipsis") + image_tag("arrow-reverse.svg", aria: { hidden: true }, size: 24)
        #   end
        end
      end
end
