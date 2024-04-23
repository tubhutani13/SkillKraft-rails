class Message < ApplicationRecord
  belongs_to :sender, class_name: 'User', foreign_key: 'user_id'
  belongs_to :room

  validates :body, presence: true
  validate :sender_is_participant_of_room

  private

  def sender_is_participant_of_room
    return if room.users.include?(sender)

    errors.add(:sender, 'must be a participant of the room')
  end
end
