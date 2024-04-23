class ContentSerializer < ActiveModel::Serializer
  attributes :id, :title, :body

  def body
    object.body.to_s
  end
end
