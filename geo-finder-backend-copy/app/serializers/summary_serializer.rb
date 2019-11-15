class SummarySerializer < ActiveModel::Serializer
  attributes :id, :input_lat, :input_lng, :actual_lat, :actual_lng, :points, :guessed_address, :actual_address, :created_at 
  # has_one :user
end
