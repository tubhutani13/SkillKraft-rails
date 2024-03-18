require 'faker'

namespace :db do
  desc 'Generate random data for users'
  task generate_random_data: :environment do
    @data = 0
    10.times do
      user = User.create!(
        username: Faker::Internet.unique.username,
        email: Faker::Internet.unique.email,
        name: Faker::Name.name,
        password: 'pass'
      )
      avatar_io = URI.open(Faker::Avatar.image)
      user.profile_picture.attach(io: avatar_io, filename: 'avatar.jpg')
      puts @data= @data + 1
      user.expert_skills << generate_random_skills
      user.learning_skills << generate_random_skills
      user.save!
    end
    puts 'Random data generation completed'
  rescue StandardError => e
    puts "An error occurred: #{e.message}"
    Rails.logger.error("Error generating random data: #{e.message}")
  end
end

def generate_random_skills
  Skill.all.sample(8)
end
