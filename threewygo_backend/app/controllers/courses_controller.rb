class CoursesController < ApplicationController
  def index
    @courses = Course.where('end_date >= ?', DateTime.now)
    render json: @courses.map { |course| formatted_course(course) }
  end

  def show
    @course = Course.find(params[:id])
    render json: formatted_course(@course)
  end

  def create
    start_date = DateTime.parse(params[:course][:start_date])
    end_date = DateTime.parse(params[:course][:end_date])

    @course = Course.new(course_params.merge(start_date: start_date, end_date: end_date))

    if @course.save
      render json: formatted_course(@course), status: :created
    else
      render json: @course.errors, status: :unprocessable_entity
    end
  end

  def update
    start_date = DateTime.parse(params[:course][:start_date])
    end_date = DateTime.parse(params[:course][:end_date])

    @course = Course.find(params[:id])
    if @course.update(course_params.merge(start_date: start_date, end_date: end_date))
      render json: formatted_course(@course)
    else
      render json: @course.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @course = Course.find(params[:id])
    @course.destroy
    head :no_content
  end

  private

  def course_params
    params.require(:course).permit(:title, :description, :start_date, :end_date, video_urls: [])
  end

  def formatted_course(course)
    {
      id: course.id,
      title: course.title,
      description: course.description,
      start_date: course.start_date.strftime('%Y-%m-%d'),
      end_date: course.end_date.strftime('%Y-%m-%d'),
      video_urls: course.video_urls
    }
  end
end