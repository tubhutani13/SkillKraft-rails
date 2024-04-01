class ConnectionRequestsController < ApplicationController
  before_action :set_connection_request, only: %i[update destroy]

  def create
    @user = current_user
    mentor = User.find_by(username: params[:username])
    @connection_request = @user.connection_requests_sent.build(mentor: mentor)
    if @connection_request.save
      render json: @connection_request, status: :created
    else
      render json: @connection_request.errors.messages, status: :unprocessable_entity
    end
  end

  def update
    if @connection_request.update(connection_request_params)
      render json: @connection_request
    else
      render json: @connection_request.errors, status: :unprocessable_entity
    end
  end

  def received_connection_requests
    @user = current_user
    @connection_requests = @user.connection_requests_received
    render json: @connection_requests, with_serializer: ConnectionRequestSerializer, mentee: true
  end

  def sent_connection_requests
    @user = current_user
    @connection_requests = @user.connection_requests_sent
    render json: @connection_requests, with_serializer: ConnectionRequestSerializer, mentee: false
  end

  def destroy
    @connection_request.destroy
    render json: { message: 'Connection request successfully deleted' }, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Connection request not found' }, status: :not_found
  end

  private

  def connection_request_params
    params.require(:connection_request).permit(:id, :status)
  end

  def set_connection_request
    @connection_request = ConnectionRequest.find(params[:id])
  end
end
