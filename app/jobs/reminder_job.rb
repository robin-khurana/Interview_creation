class ReminderJob < ApplicationJob
  queue_as :default

  def perform(interview_id)
    @interview = Interview.find(interview_id)
    @interview.send_reminder_mail
  end
end
