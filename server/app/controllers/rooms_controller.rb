class RoomsController < ApplicationController
  before_action :set_recipient, only: :show_or_create

  def show_or_create
    participant_ids = [current_user.id, @recipient_user.id]

    room = if params[:room_id]
             Room.find(params[:room_id])
           else
             Room.includes(:messages)
                 .joins(:users)
                 .where(users: { id: participant_ids })
                 .group('rooms.id')
                 .having('COUNT(users.id) = ?', participant_ids.size)
                 .first_or_create
           end

    if room.persisted?
      messages = room.messages.page(params[:page]).per(params[:per_page])
      render json: { room_id: room.id, messages: messages }
    else
      render json: { error: 'Failed to create room' }, status: :unprocessable_entity
    end
  end

  def index
    @rooms = current_user.rooms.includes(:users).order(updated_at: :desc)
    render json: @rooms , each_serializer: RoomSerializer, current_user_id: current_user.id
  end

  private

  def set_recipient
    @recipient_user = User.find_by(username: params[:recipient_username])

    render json: { error: 'Recipient user not found' }, status: :not_found unless @recipient_user
  end
end
