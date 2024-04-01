class UserSerializer < ActiveModel::Serializer
  attributes :name, :username, :email, :bio, :profile_picture, :learning_skill_ids, :expert_skill_ids
  def profile_picture
    Rails.application.routes.url_helpers.url_for(object.profile_picture) if object.profile_picture.attached?
  end
end
