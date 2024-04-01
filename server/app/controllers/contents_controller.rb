class ContentsController < ApplicationController
  before_action :set_content, only: [:show, :update, :destroy]

  def create
    @content = current_user.contents.build(content_params)
    if @content.save
      render json: @content, status: :created
    else
      render json: @content.errors, status: :unprocessable_entity
    end
  end

  def show
    render json: @content
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

  def content_params
    params.require(:content).permit(:title, :body, :status)
  end
end
