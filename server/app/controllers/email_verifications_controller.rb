class EmailVerificationsController < ApplicationController
  skip_before_action :authenticate_user
  
  def verify_email
    user = User.find_by(verification_token: params[:verification_token])
    if user
      user.update(verified: true)
      render json: { message: 'Email verified successfully' }, status: :ok
    else
      render json: { error: 'Invalid verification token' }, status: :unprocessable_entity
    end
  end
end
