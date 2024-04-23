class Content < ApplicationRecord
  CONTENT_STATUS = %i[draft private public].freeze
  belongs_to :user

  has_rich_text :body
  enum status: CONTENT_STATUS, _suffix: true
end
