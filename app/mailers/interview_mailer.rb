class InterviewMailer < ApplicationMailer
  helper :interviews

  def reminder_interviewee_mail(interview_id)
    @interview = Interview.find(interview_id)
    @interviewee = @interview.interviewee
    mail(to: @interviewee.email,
         subject:'Reminder: Upcoming Interview'
    )
  end

  def reminder_interviewer_mail(interview_id)
    @interview = Interview.find(interview_id)
    @interviewer = @interview.interviewer
    mail(to: @interviewer.email,
         subject:'Reminder: Upcoming Interview'
    )
  end

  def update_interviewee_email(interview_id)
    @interview = Interview.find(interview_id)
    @interviewee = @interview.interviewee
    mail(to: @interviewee.email,
         subject:'Updation: Interview Updated'
    )
  end

  def update_interviewer_email(interview_id)
    @interview = Interview.find(interview_id)
    @interviewer = @interview.interviewer
    mail(to: @interviewer.email,
         subject:'Updation: Interview Updated'
    )
  end

  def decline_interviewee_email(interview_id)
    @interview = Interview.find(interview_id)
    @interviewee = @interview.interviewee
    mail(to: @interviewee.email,
         subject:'Interview Declined'
    )
  end

  def decline_interviewer_email(interview_id)
    @interview = Interview.find(interview_id)
    @interviewer = @interview.interviewer
    mail(to: @interviewer.email,
         subject:'Interview Declined'
    )
  end

  def completion_interviewee_email(interview_id)
    @interview = Interview.find(interview_id)
    @interviewee = @interview.interviewee
    mail(to: @interviewee.email,
         subject:'Interview Completed'
    )
  end

  def completion_interviewer_email(interview_id)
    @interview = Interview.find(interview_id)
    @interviewer = @interview.interviewer
    mail(to: @interviewer.email,
         subject:'Interview Completed'
    )
  end

end
