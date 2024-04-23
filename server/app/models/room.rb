class Room < ApplicationRecord
  has_and_belongs_to_many :users
  has_many :messages

  def other_user(current_user_id)
    users.where.not(id: current_user_id).first
  end
end
