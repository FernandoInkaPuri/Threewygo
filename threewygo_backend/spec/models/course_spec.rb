require 'rails_helper'

describe Course, type: :model do
  describe 'validations' do
    it 'creates successfully if attributes are valid' do
      course = Course.create(
        title: 'Curso de Dublagem',
        description: 'Aprenda com o melhor da dublagem brasileira',
        start_date: DateTime.now,
        end_date: DateTime.now + 1,
        video_urls: ['https://www.youtube.com/watch?v=TCkWpRBAnzw']
      )

      expect(course).to be_persisted
    end

    it 'is not valid without a title' do
      course = Course.create(
        title: '',
        description: 'Aprenda com o melhor da dublagem brasileira',
        start_date: DateTime.now,
        end_date: DateTime.now + 1,
        video_urls: ['https://www.youtube.com/watch?v=TCkWpRBAnzw']
      )

      expect(course).not_to be_valid
      expect(course).not_to be_persisted
      expect(course.errors[:title]).to include("can't be blank")
    end

    it 'is not valid without a description' do
      course = Course.create(
        title: 'Curso de Dublagem',
        description: '',
        start_date: DateTime.now,
        end_date: DateTime.now + 1,
        video_urls: ['https://www.youtube.com/watch?v=TCkWpRBAnzw']
      )

      expect(course).not_to be_valid
      expect(course).not_to be_persisted
      expect(course.errors[:description]).to include("can't be blank")
    end

    it 'is not valid without a start_date' do
      course = Course.create(
        title: 'Curso de Dublagem',
        description: 'Aprenda com o melhor da dublagem brasileira',
        start_date: '',
        end_date: DateTime.now + 1,
        video_urls: ['https://www.youtube.com/watch?v=TCkWpRBAnzw']
      )

      expect(course).not_to be_valid
      expect(course).not_to be_persisted
      expect(course.errors[:start_date]).to include("can't be blank")
    end

    it 'is not valid without an end_date' do
      course = Course.create(
        title: 'Curso de Dublagem',
        description: 'Aprenda com o melhor da dublagem brasileira',
        start_date: DateTime.now,
        end_date: '',
        video_urls: ['https://www.youtube.com/watch?v=TCkWpRBAnzw']
      )

      expect(course).not_to be_valid
      expect(course).not_to be_persisted
      expect(course.errors[:end_date]).to include("can't be blank")
    end

    it 'is not valid if end_date is before start_date' do
      course = Course.create(
        title: 'Curso de Dublagem',
        description: 'Aprenda com o melhor da dublagem brasileira',
        start_date: DateTime.now + 1,
        end_date: DateTime.now,
        video_urls: ['https://www.youtube.com/watch?v=TCkWpRBAnzw']
      )

      expect(course).not_to be_valid
      expect(course).not_to be_persisted
      expect(course.errors[:end_date]).to include("Data de término precisa ser maior que data de início")
    end
  end
end