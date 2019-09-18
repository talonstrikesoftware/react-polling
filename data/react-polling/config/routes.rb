Rails.application.routes.draw do
  root 'static#index'
  namespace :v1, defaults: { format: 'json' } do
    get 'start_job', to: 'reports#start'
    get 'poll', to: 'reports#poll'
  end  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
