class UserInterviewRole < ApplicationRecord
  belongs_to :user
  belongs_to :role
  belongs_to :interview
end
