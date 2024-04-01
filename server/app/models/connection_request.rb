class ConnectionRequest < ApplicationRecord
  belongs_to :mentor, class_name: 'User'
  belongs_to :mentee, class_name: 'User'

  enum status: { pending: 0, accepted: 1, declined: 2 }

  validates :mentor_id, uniqueness: { scope: :mentee_id }
  validates :mentee_id, uniqueness: { scope: :mentor_id }
end
