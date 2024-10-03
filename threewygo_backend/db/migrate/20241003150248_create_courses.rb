class CreateCourses < ActiveRecord::Migration[7.2]
  def change
    create_table :courses do |t|
      t.string :title
      t.text :description
      t.datetime :start_date
      t.datetime :end_date
      t.text :video_urls

      t.timestamps
    end
  end
end
