class AddColumnsToInterviews < ActiveRecord::Migration[5.1]
  def change
    add_column :interviews, :start_time, :time
    add_column :interviews, :end_time, :time
    add_column :interviews, :title, :string
  end
end
