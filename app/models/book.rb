class Book < ApplicationRecord
    belongs_to :user
    has_many :pages, dependent: :destroy

    validates :title, presence: true, 
    length: {minimum:3, maximum: 100}

    validates :subtitle, presence: true, 
    length: {minimum:3, maximum: 100}
end
