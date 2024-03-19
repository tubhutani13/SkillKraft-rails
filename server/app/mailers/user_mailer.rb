class UserMailer < ApplicationMailer
  def email_verification(user_id)
    @user = User.find(user_id)
    @redirect_link = "http://localhost:5173/email-verify/#{@user.verification_token}"
    mail to: @user.email, subject: 'Email Verification | Welcome to SkillKraft!!'
  end

  def password_reset(user_id)
    @user = User.find(user_id)
    @token = user.generate_password_reset_token
    mail(to: @user.email, subject: 'Password Reset Instructions')
  end
end
