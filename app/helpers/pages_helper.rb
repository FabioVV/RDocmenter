

module PagesHelper
  def word_count(content)
    return unless !content.blank?
    pluralize number_with_delimiter(content.split.size), "word"
  end
  
  def sanitize_content(content)
    sanitize content , scrubber: HtmlScrubber.new 
  end

  def toolbar_options(edit: false, page_type: nil, book: nil)
    if current_user
      if edit
        if page_type == 'text'
          render 'toolbar/toolbar_edit_markdown', book: book
        else
          render 'toolbar/toolbar_edit'
        end
      else
        render 'toolbar/toolbar_toggle_mode', book: book
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


  
  def link_to_previous_page(page, book, for_edit: false)
      book_slug = book.slug

      if previous_page = page.previous
        path = for_edit ? edit_book_page_path(book_slug, previous_page) : book_page_path(book_slug, previous_page)
        link_to path, class: "txt-medium min-width btn" do
          "<i class='fa-solid fa-arrow-left-long'></i>".html_safe + tag.span("Previous: #{previous_page.main_title }", class: "overflow-ellipsis")
        end
      end
    end 
  
    def link_to_next_page(page, book, for_edit: false)
      book_slug = book.slug

      if next_page = page.next
        path = for_edit ? edit_book_page_path(book_slug, next_page) : book_page_path(book_slug, next_page)
        link_to path, class: "txt-medium min-width btn" do
          tag.span("Next: #{next_page.main_title }", class: "overflow-ellipsis") + " <i class='fa-solid fa-arrow-right-long'></i>".html_safe
        end
      end
    end
end
