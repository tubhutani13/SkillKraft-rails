class ApplicationController < ActionController::API
  before_action :authenticate_user
  attr_reader :current_user

  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  private

  def authenticate_user
    token = request.headers['Authorization']&.split(' ')&.last
    if token
      decoded_token = JsonWebToken.decode(token)
      @current_user = User.find(decoded_token[0]['user_id'].to_i)
    else
      render json: { error: 'Token not provided' }, status: :unauthorized
    end
  end

  def not_found
    render json: { error: 'Record not found' }, status: :not_found
  end
end
