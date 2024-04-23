class RoomsChannel < ApplicationCable::Channel
  def subscribed
    @user = current_user
    stream_from "rooms_#{@user.id}"

    room_ids = @user.rooms.pluck(:id)
    existing_rooms = Room.includes(:users, messages: :sender).where(id: room_ids)
    broadcast_to @user, { rooms: existing_rooms }
  end

  def receive(data)
  end
end
