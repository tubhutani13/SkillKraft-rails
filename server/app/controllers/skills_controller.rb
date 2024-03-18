class SkillsController < ApplicationController
  skip_before_action :authenticate_user, only: [:index]

  def index
    @skills = Skill.all
    render json: @skills, each_serializer: SkillSerializer, status: 200
  end
end
