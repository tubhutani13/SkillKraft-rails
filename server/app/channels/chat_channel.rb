class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_#{params[:room_id]}"
  end

  def receive(data)
    Message.create(body: data['body'], sender_id: current_user.id, room_id: params[:room_id] )

    ActionCable.server.broadcast("chat_#{params[:room_id]}", data)
  end

  def unsubscribed
  end
end

