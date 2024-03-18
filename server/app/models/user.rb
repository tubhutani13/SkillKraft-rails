class User < ApplicationRecord
  has_secure_password

  has_one_attached :profile_picture

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :username, uniqueness: true, presence: true

  before_create :generate_verification_token

  has_many :skills_users
  has_many :learning_skills, lambda {
                               where(skills_users: { skill_type: 'learner' })
                             }, through: :skills_users, source: :skill
  has_many :expert_skills, lambda {
                             where(skills_users: { skill_type: 'expert' })
                           }, through: :skills_users, source: :skill

  accepts_nested_attributes_for :learning_skills, allow_destroy: true
  accepts_nested_attributes_for :expert_skills, allow_destroy: true

  def generate_verification_token
    self.verified = false
    self.verification_token = SecureRandom.urlsafe_base64
  end
end
