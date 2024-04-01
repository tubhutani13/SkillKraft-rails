class PasswordResetsController < ApplicationController
  skip_before_action :authenticate_user
  before_action :find_user_by_email, only: [:create]
  before_action :find_user_by_reset_token, only: [:update]

  def create
    if @user
      @user.generate_password_reset_token
      UserMailer.password_reset(@user.id).deliver_now
      render json: { message: 'Password reset instructions have been sent to your email.' }, status: :ok
    else
      render json: { error: 'Email not found.' }, status: :not_found
    end
  end

  def update
    debugger
    if @user && !@user.password_reset_expired?
      if @user.update(user_params)
        @user.update(password_reset_token: nil, password_reset_sent_at: nil)
        render json: { message: 'Password has been reset successfully.' }, status: :ok
      else
        render json: { error: @user.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: 'Password reset link has expired or is invalid.' }, status: :unprocessable_entity
    end
  end

  private

  def find_user_by_email
    @user = User.find_by(email: params[:email])
  end

  def find_user_by_reset_token
    @user = User.find_by(password_reset_token: params[:password_reset_token])
  end

  def user_params
    params.require(:user).permit(:password, :password_confirmation)
  end
end
