class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def get_interview_users
    query = params[:q]

    if query.present?
      valid_users = User.where("users.user_name like ?", "%#{query}%")
    end

    request_data = valid_users.order("users.user_name").limit(10).select("users.user_name as label, users.id as value")

    render json: {
        data: request_data
    }
  end

  def fetch_id
    title = params[:title]
    id = Interview.find_by(title: title).id

    render json: {
        id: id
    }
  end

end
