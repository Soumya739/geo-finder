# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user_collection = []

useremail = ["mon@gmail.com", "rach@gmail.com", "phoeb@gmail.com", "chan@gmail.com", "ross@gmail.com", "joey@gmail.com"]

useremail.each do |email|
    user_collection << User.create(email: email, points: 0)
end



