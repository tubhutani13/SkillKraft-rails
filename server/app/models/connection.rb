class Connection < ApplicationRecord
  belongs_to :mentee, class_name: "User"
  belongs_to :mentor, class_name: "User"

  validates :mentee_id, uniqueness: { scope: :mentor_id, message: "Connection request already exists." }
end
