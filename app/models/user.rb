class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  has_many :books
  has_one_attached :profile_photo

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

end
