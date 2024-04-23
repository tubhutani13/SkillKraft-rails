require 'faker'

namespace :db do
  desc 'Set default Picture for user'
  task set_default_pictures: :environment do
    User.find_each do |user|
      next if user.profile_picture.attached?

      avatar_io = URI.open(Faker::Avatar.image)
      user.profile_picture.attach(io: avatar_io, filename: 'default.jpg')
      puts "done for #{user.name}"
    end
  rescue StandardError => e
    puts "An error occurred: #{e.message}"
    Rails.logger.error("Error setting profile data: #{e.message}")
  end
end
