class Skill < ApplicationRecord
  validates :name, presence: true, uniqueness: true

  has_many :skills_users
  has_many :learning_users, lambda {
                              where(skills_users: { skill_type: 'learner' })
                            }, through: :skills_users, source: :user
  has_many :expert_users, lambda {
                            where(skills_users: { skill_type: 'expert' })
                          }, through: :skills_users, source: :user
end
