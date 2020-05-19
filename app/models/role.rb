class Role < ApplicationRecord
  has_many :user_interview_roles
  has_many :users, through: :user_interview_roles
  has_many :interviews, through: :user_interview_roles
  validates :name, presence: true, uniqueness: true
end
