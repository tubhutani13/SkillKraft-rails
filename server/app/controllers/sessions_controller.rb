class SessionsController < ApplicationController
  skip_before_action :authenticate_user

  def create
    user = User.find_by(username: params[:username])
    if user&.authenticate(params[:password])
      if user.verified?
        token = JsonWebToken.encode({ user_id: user.id })
        render json: { token: token }, status: :ok
      else
        render json: { message: 'Email not verified' }, status: :unprocessable_entity
      end
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end
end
