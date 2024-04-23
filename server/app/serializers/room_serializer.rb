class RoomSerializer < ActiveModel::Serializer
  attributes :id, :last_message, :last_message_time, :user

  def other_user_profile_photo
    return unless object.other_user(@instance_options[:current_user_id])&.profile_picture&.attached?

    Rails.application.routes.url_helpers.url_for(object.other_user(@instance_options[:current_user_id]).profile_picture)
  end

  def last_message
    last_message = object.messages.last
    "#{last_message.sender.name}: #{last_message.body}" if last_message
  end

  def last_message_time
    last_message_time = object.messages.last.created_at if object.messages.last
    last_message_time&.strftime('%I:%M %p')
  end

  def user
    other_user = object.other_user(@instance_options[:current_user_id])
    return unless other_user

    {
      id: other_user.id,
      name: other_user.name.split.first,
      profile_picture: other_user_profile_photo
    }
  end
end
