class InterviewsController < ApplicationController
  before_action :set_interview, only: [:show, :edit, :update, :destroy, :assign_interviewer, :assign_interviewer, :update_status]
  before_action :authenticate_user!
  protect_from_forgery prepend: true

  # GET /interviews
  # GET /interviews.json
  def index
    if current_user.is_admin?
      @interviews = Interview.all
    else
      @interviews = current_user.interviews
    end

    respond_to do|format|
      format.json {
        render json: {
            success: true,
            data: @interviews.as_json
        }
      }
      format.html { render :index }
    end
  end

  # GET /interviews/1
  # GET /interviews/1.json
  def show
    is_admin = 0
    if current_user.is_admin?
      is_admin = 1
    end

    respond_to do |format|
      format.json {
        render json: {
            success: true,
            admin: is_admin,
            data: @interview.as_json
        }
      }
    end
  end

  # GET /interviews/new
  def new
    @interview = Interview.new
  end

  # GET /interviews/1/edit
  def edit
  end

  # POST /interviews
  # POST /interviews.json
  def create
    @interview = Interview.new(interview_params)
    if @interview.save
      @interview.requested!
      if @presence == 'Interviewee'
        @interview.assign_interviewee(current_user.id)
      else
        @interview.assign_interviewer(current_user.id)
      end
      flash[:success] = "Interview has been requested!"
    else
      flash[:alert] = "Unable to complete interview request, Please check parameters"
    end
  end

  # PATCH/PUT /interviews/1
  # PATCH/PUT /interviews/1.json
  def update
    if @interview.update(interview_params)
      flash[:notice] = 'Interview was successfully updated.'
      @interview.send_updation_mail
      redirect_to @interview
    else
      flash[:alert] = 'Please check the parameter, Updation not allowed'
      render :edit
    end
  end

  # DELETE /interviews/1
  # DELETE /interviews/1.json
  def destroy
    @interview.destroy
    flash[:notice] = 'Interview was successfully destroyed.'
    redirect_to interviews_url
  end

  def assign_interviewee
    id = params[:user_id]
    @interview.assign_interviewee(id)
    render json:{
        data: "Role successfully assigned"
    }
  end

  def assign_interviewer
    id = params[:user_id]
    @interview.assign_interviewer(id)
    render json:{
        data: "Role successfully assigned"
    }
  end

  def update_status
    status = params[:status]
    @interview.update(status: status)
    @interview.send_updation_mail
    render json:{
        data: "Status successfully updated"
    }
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_interview
      @interview = Interview.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def interview_params
      @presence = params[:interview][:user_presence]
      params.require(:interview).permit(:interview_date, :start_time, :end_time, :title, :attachment)
    end

    def authenticate_user!
      super
      if current_user.present?
        unless current_user.type
          current_user.update!(type: 'Normal')
        end
      end
    end
end
