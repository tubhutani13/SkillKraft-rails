class ConnectionRequestSerializer < ActiveModel::Serializer
  attributes :id, :created_at
  belongs_to :user, serializer: UserSerializer
  
  def user
    return nil if instance_options[:mentee].nil?

    if instance_options[:mentee]
      object.mentee
    else
      instance_options[:mentee]
      object.mentor
    end
  end
end
