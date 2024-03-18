class UserMailer < ApplicationMailer
  def email_verification(user_id)
    @user = User.find(user_id)
    mail to: @user.email, subject: 'Email Verification | Welcome to SkillKraft!!'
  end
end
