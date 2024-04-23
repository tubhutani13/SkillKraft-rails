class ContentsController < ApplicationController
  before_action :set_content, only: %i[show update destroy]

  def index
    @contents = if current_user
                  Content.where(status: :public)
                         .or(Content.where(user_id: current_user.id, status: :private))
                         .or(Content.where(user_id: current_user.mentees.pluck(:id), status: :private))
                         .distinct
                         .select(:id, :title)
                else
                  Content.where(status: :public).select(:id, :title)
                end
  end

  def create
    @content = current_user.contents.build(content_params)
    if @content.save
      render json: @content, status: :created
    else
      render json: @content.errors, status: :unprocessable_entity
    end
  end

  def show
    @content = Content.find(params[:id])

    if can_view_content?(@content)
      render json: @content
    else
      render json: { error: 'You do not have permission to view this content' }, status: :unauthorized
    end
  end

  def update
    if @content.update(content_params)
      render json: @content
    else
      render json: @content.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @content.destroy
    head :no_content
  end

  private

  def set_content
    @content = Content.find(params[:id])
  end

  def can_view_content?(content)
    return true if content.status == 'public' || content.user_id == current_user&.id

    return true if current_user && (content.status == 'private' && content.user.mentees.exists?(current_user.id))

    false
  end

  def content_params
    params.require(:content).permit(:title, :body, :status)
  end
end
