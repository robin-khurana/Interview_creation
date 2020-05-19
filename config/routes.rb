Rails.application.routes.draw do
  devise_for :users, :controllers => { registrations: 'registrations' }

  resources :interviews do
    member do
      post :assign_interviewee
      post :assign_interviewer
      post :update_status
    end
  end

  get '/get_interview_users' => 'application#get_interview_users'

  root 'interviews#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
