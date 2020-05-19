class AddInterviewDateToInterview < ActiveRecord::Migration[5.1]
  def change
    add_column :interviews, :interview_date, :date
  end
end
