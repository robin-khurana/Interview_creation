class Interview < ApplicationRecord

  after_update :after_status_update, if: :saved_change_to_status?


  has_many :user_interview_roles, dependent: :destroy
  has_many :users, through: :user_interview_roles

  enum status: {requested: 0, approved: 1, declined: 2, completed: 3}
  validates :start_time, :end_time, :interview_date, :attachment, presence: true
  validates :title, uniqueness: true, length: {minimum: 5, maximum: 50}
  validate :end_must_be_after_start

  mount_uploader :attachment, AttachmentUploader

  attr_accessor :user_presence

  def interviewee
    role = Role.find_by(name: :Interviewee)
    User.joins(:user_interview_roles).where(user_interview_roles: {role_id: role.id, interview_id: self.id}).first
  end

  def interviewer
    role = Role.find_by(name: :Interviewer)
    User.joins(:user_interview_roles).where(user_interview_roles: {role_id: role.id, interview_id: self.id}).first
  end

  def assign_interviewee(interviewee_id)
    role = Role.find_by(name: :Interviewee)
    UserInterviewRole.create(user_id: interviewee_id, role_id: role.id, interview_id: self.id)
  end

  def assign_interviewer(interviewer_id)
    role = Role.find_by(name: :Interviewer)
    UserInterviewRole.create(user_id: interviewer_id, role_id: role.id, interview_id: self.id)
  end

  def send_reminder_mail
    InterviewMailer.reminder_interviewee_mail(self.id).deliver_now
    InterviewMailer.reminder_interviewer_mail(self.id).deliver_now
  end

  def as_json(_options={})
    super(only: [:interview_date, :title, :status],
          methods: [:interviewee_name, :interviewer_name, :interview_start_time, :interview_end_time, :resume_url])
  end

  def send_updation_mail
    InterviewMailer.update_interviewer_email(self.id).deliver_now
    InterviewMailer.update_interviewee_email(self.id).deliver_now
  end

  def send_declined_mail
    InterviewMailer.decline_interviewee_email(self.id).deliver_now
    InterviewMailer.decline_interviewer_email(self.id).deliver_now
  end

  def send_completed_mail
    InterviewMailer.completion_interviewee_email(self.id).deliver_now
    InterviewMailer.completion_interviewer_email(self.id).deliver_now
  end

  private
  def end_must_be_after_start
    if start_time >= end_time
      errors.add(:end_time, "must be after start time")
    end
  end

  def after_status_update
    case self.status
    when'approved'
      ReminderJob.set(wait_until: reminder_time).perform_later(self.id)
    when'declined'
      send_declined_mail
    when'completed'
      send_completed_mail
    end
  end

  def reminder_time
    date = self.interview_date
    start_time = self.start_time
    interview_time = DateTime.new(date.year, date.month, date.day, start_time.hour, start_time.min, start_time.sec, start_time.zone)
    interview_time - 30.minutes
  end

  def interviewee_name
    if self.interviewee
      self.interviewee.user_name
    else
      "Not Assigned"
    end
  end

  def interviewer_name
    if self.interviewer
      self.interviewer.user_name
    else
      "Not Assigned"
    end
  end

  def interview_start_time
    self.start_time.strftime("%I:%M %p")
  end

  def interview_end_time
    self.end_time.strftime("%I:%M %p")
  end

  def resume_url
    self.attachment_url
  end


end

