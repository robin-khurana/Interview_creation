class Interview < ApplicationRecord

  has_many :user_interview_roles, dependent: :destroy
  has_many :users, through: :user_interview_roles

  enum status: {requested: 0, approved: 1, declined: 2, completed: 3}
  validates :start_time, :end_time, :interview_date, presence: true
  validates :title, uniqueness: true, length: {minimum: 5, maximum: 50}
  validate :end_must_be_after_start

  mount_uploader :attachment, AttachmentUploader

  attr_accessor :user_presence

  def interviewee
    User.joins(:roles).where(id: self.users.map(&:id)).where(roles: {name: :Interviewee}).first
  end

  def interviewer
    User.joins(:roles).where(id: self.users.map(&:id)).where(roles: {name: :Interviewer}).first
  end

  def assign_interviewee(interviewee_id)
    role = Role.find_by(name: :Interviewee)
    UserInterviewRole.create(user_id: interviewee_id, role_id: role.id, interview_id: self.id)
  end

  def assign_interviewer(interviewer_id)
    role = Role.find_by(name: :Interviewer)
    UserInterviewRole.create(user_id: interviewer_id, role_id: role.id, interview_id: self.id)
  end

  private
  def end_must_be_after_start
    if start_time >= end_time
      errors.add(:end_time, "must be after start time")
    end
  end

end

