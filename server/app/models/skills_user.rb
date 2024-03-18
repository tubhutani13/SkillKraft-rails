class SkillsUser < ApplicationRecord
  belongs_to :user
  belongs_to :skill
  
  enum skill_type: { learner: 0, expert: 1 }
end
