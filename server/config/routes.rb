Rails.application.routes.draw do
  get 'password_resets/new'
  get 'password_resets/create'
  get 'password_resets/edit'
  get 'password_resets/update'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get 'up' => 'rails/health#show', as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  resources :users, only: [:show] do
    collection do
      get :skills
      get :recommended_mentors
      post :resend_verification_email
    end
  end
  post '/signup', to: 'users#create'
  put '/update_user', to: 'users#update'
  get '/me', to: 'users#me'
  post '/email-verify/:verification_token', to: 'email_verifications#verify_email', as: 'verify_email'
  post '/password-confirm/:password_reset_token', to: 'password_resets#update', as: 'password_confirm'
  post '/login', to: 'sessions#create'

  resources :skills, only: [:index]
  resources :password_resets, only: [:create]
  resources :contents
  resources :connection_requests, only: %i[create update destroy] do
    collection do
      get :received_connection_requests
      get :sent_connection_requests
    end
  end
end
