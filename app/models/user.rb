class User < ApplicationRecord
  extend Devise::Models
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :user_interview_roles
  has_many :roles, through: :user_interview_roles
  has_many :interviews, through: :user_interview_roles

  scope :admins, -> { where(type: 'Admin') }
  scope :normal, -> { where(type: 'Normal') }

  def is_admin?
    self.type == 'Admin'
  end

end
