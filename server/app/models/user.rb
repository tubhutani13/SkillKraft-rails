class User < ApplicationRecord
  has_secure_password

  has_one_attached :profile_picture

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :username, uniqueness: true, presence: true

  before_create :generate_verification_token

  has_many :skills_users
  has_many :learning_skills, lambda {
    where(skills_users: { skill_type: "learner" })
  }, through: :skills_users, source: :skill
  has_many :expert_skills, lambda {
    where(skills_users: { skill_type: "expert" })
  }, through: :skills_users, source: :skill

  has_many :mentor_connections, foreign_key: "mentee_id", class_name: "Connection"
  has_many :mentors, through: :mentor_connections, source: :mentor

  has_many :mentee_connections, foreign_key: "mentor_id", class_name: "Connection"
  has_many :mentees, through: :mentee_connections, source: :mentee
  
  has_many :connection_requests_sent, foreign_key: 'mentee_id', class_name: 'ConnectionRequest'
  has_many :connection_requests_received, foreign_key: 'mentor_id', class_name: 'ConnectionRequest'

  has_many :contents

  accepts_nested_attributes_for :learning_skills, allow_destroy: true
  accepts_nested_attributes_for :expert_skills, allow_destroy: true

  def generate_password_reset_token
    token = SecureRandom.urlsafe_base64
    update(password_reset_token: token, password_reset_sent_at: Time.now)
    token
  end

  def generate_verification_token
    self.verified = false
    self.verification_token = SecureRandom.urlsafe_base64
  end

  def password_reset_expired?
    return false if password_reset_sent_at.nil?

    expiration_period = 1.hour

    password_reset_sent_at < expiration_period.ago
  end
end
