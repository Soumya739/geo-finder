class SummarySerializer < ActiveModel::Serializer
  attributes :id, :input_lat, :input_lng, :actual_lat, :actual_lng, :points
  # has_one :user
end
