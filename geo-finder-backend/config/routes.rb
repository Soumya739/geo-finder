Rails.application.routes.draw do
  resources :summaries
  resources :users

  post 'getUserByEmail' => "users#getUserByEmail"
  get 'getSummaryOfUser/:userId' => "summaries#getSummaryOfUser"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

# post '/users/addtocart' => "users#xyz"
