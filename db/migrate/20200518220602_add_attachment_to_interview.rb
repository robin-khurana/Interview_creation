class AddAttachmentToInterview < ActiveRecord::Migration[5.1]
  def change
    add_column :interviews, :attachment, :string
  end
end
