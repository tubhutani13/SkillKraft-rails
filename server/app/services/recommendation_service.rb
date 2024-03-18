class RecommendationService
  def self.recommended_mentors_for_mentee(mentee)
    cache_key = "recommended_mentors_#{mentee.id}"
    Rails.cache.fetch(cache_key, expires_in: 1.day) do
      calculate_recommendations(mentee)
    end
  end

  def self.calculate_recommendations(mentee)
    mentee_skill_ids = mentee.learning_skill_ids

    mentors = User.includes(:expert_skills).joins(expert_skills: :expert_users).where(expert_skills: { id: mentee_skill_ids })
                  .distinct

    mentor_similarities = {}
    mentors.find_each do |mentor|
      mentor_skill_ids = mentor.expert_skill_ids
      similarity = calculate_similarity(mentee_skill_ids, mentor_skill_ids)
      mentor_similarities[mentor] = similarity
    end
    mentor_similarities.sort_by { |_mentor, similarity| -similarity }.to_h.keys
  end

  def self.calculate_similarity(skill_ids1, skill_ids2)
    intersection_count = (skill_ids1 & skill_ids2).count
    union_count = skill_ids1.size + skill_ids2.size - intersection_count
    union_count.zero? ? 0 : intersection_count.to_f / union_count
  end
end
