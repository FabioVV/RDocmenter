module PagesHelper
  class HtmlScrubber < Rails::Html::PermitScrubber
    def initialize
      super
      self.tags = Rails::Html::WhiteListSanitizer.allowed_tags + %w[
        audio details iframe options table tbody td th thead tr video
      ]
    end
  end
  
  def sanitize_content(content)
    sanitize content, scrubber: HtmlScrubber.new 
  end

  def toolbar_options(edit: false, page_type: nil)
    if current_user
      if edit
        if page_type == 'text'
          render 'toolbar/toolbar_edit_markdown'
        else
          render 'toolbar/toolbar_edit'
        end
      else
        render 'toolbar/toolbar_show'
      end
    end
  end



  # Deactivated
  def page_text_edit_form(page, **, &)
    form_with model: page, url: book_page_path(page.book_id, page), method: :patch, format: :html,
    data: {
      controller: "autosave",
      action: "autosave#submit:prevent input@document->autosave#change doc-menter:change->autosave#change",
      autosave_clean_class: "clean",
      autosave_dirty_class: "dirty",
      autosave_saving_class: "saving"
    }, **, &
  end
  # Deactivated

  def link_to_previous_page(page, for_edit: false)
      book_id = page.book_id

      if previous_page = page.previous
        path = for_edit ? edit_book_page_path(book_id, previous_page) : book_page_path(book_id, previous_page)
        link_to path, class: "txt-medium min-width btn" do
          "<i class='fa-solid fa-arrow-left-long'></i>".html_safe + tag.span("Previous: #{previous_page.main_title }", class: "overflow-ellipsis")
        end
      else
      #   link_to book_slug_path(leaf.book), data: hotkey_data_attributes("left", enabled: hotkey), class: "btn" do
      #     image_tag("arrow-left.svg", aria: { hidden: true }, size: 24) + tag.span("Table of contents: #{ leaf.book.title }", class: "for-screen-reader")
      #   end
      end
    end
  
    def link_to_next_page(page, for_edit: false)
      book_id = page.book_id

      if next_page = page.next
        path = for_edit ? edit_book_page_path(book_id, next_page) : book_page_path(book_id, next_page)
        link_to path, class: "txt-medium min-width btn" do
          tag.span("Next: #{next_page.main_title }", class: "overflow-ellipsis") + " <i class='fa-solid fa-arrow-right-long'></i>".html_safe
        end
      else
      #   link_to book_slug_path(leaf.book), class: "btn txt-medium" do
      #     tag.span("Table of contents: #{leaf.book.title }", class: "overflow-ellipsis") + image_tag("arrow-reverse.svg", aria: { hidden: true }, size: 24)
      #   end
      end
    end
end
