class UsersController < ApplicationController
  skip_before_action :authenticate_user, only: [:create]
  def create
    @user = User.new(user_params)
    if @user.save
      UserMailer.verification_email(@user).deliver_now
      render json: { message: 'User Created successfully' }, status: :created
    else
      render json: { errors: @user.errors.messages }, status: :unprocessable_entity
    end
  end

  def update
    if current_user.update(user_params)
      render json: { message: 'User updated successfully' }, status: :ok
    else
      render json: { errors: current_user.errors.messages }, status: :unprocessable_entity
    end
  end

  def show
    @user = User.find(params[:id])
    render json: UserSerializer.new(@user).serializable_hash
  end

  def skills
    @expert_skills = current_user.expert_skill_ids
    @learning_skills = current_user.learning_skill_ids
    render json: { expert_skills: @expert_skills, learning_skills: @learning_skills }, status: 200
  end

  def recommended_mentors
    mentee = current_user
    recommended_mentors = RecommendationService.recommended_mentors_for_mentee(mentee)
    render json: recommended_mentors
  end

  def me
    render json: UserSerializer.new(current_user).serializable_hash
  end

  def resend_verification_email
    @user = current_user
    if @user && !@user.email_verified?
      UserMailer.verification_email(@user).deliver_now
      render json: { message: 'Verification email resent successfully' }, status: :ok
    else
      render json: { error: 'User not found or already verified' }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :username, :email, :password, :profile_picture, expert_skill_ids: [],
                                                                                        learning_skill_ids: [])
  end
end
