# Preview all emails at http://localhost:3000/rails/mailers/interview_mailer
class InterviewMailerPreview < ActionMailer::Preview
  def reminder_interviewee_mail
    interview = Interview.find(2)
    InterviewMailer.reminder_interviewee_mail(interview)
  end

  def reminder_interviewer_mail
    interview = Interview.find(3)
    InterviewMailer.reminder_interviewer_mail(interview)
  end
end
