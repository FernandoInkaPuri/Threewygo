class Course < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true
  validates :start_date, presence: true
  validates :end_date, presence: true
  validates :video_urls, presence: true
  validate :end_date_greater_than_start_date

  private
  
  def end_date_greater_than_start_date
    if start_date.present? && end_date.present? && start_date > end_date
      errors.add(:end_date, 'Data de término precisa ser maior que data de início')
    end
  end
end
