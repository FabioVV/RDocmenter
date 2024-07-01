class RenameContextToContent < ActiveRecord::Migration[7.1]
  def change
    rename_column :pages, :context, :content
    #Ex:- rename_column("admin_users", "pasword","hashed_pasword")
  end
end
