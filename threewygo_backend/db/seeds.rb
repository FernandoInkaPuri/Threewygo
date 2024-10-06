courses = [
  {
    title: 'Curso de Dublagem',
    description: 'Aprenda com o melhor da dublagem brasileira',
    video_urls: ['https://www.youtube.com/watch?v=TCkWpRBAnzw'].to_json
  },
  {
    title: 'Curso de Reiki',
    description: 'Aprenda esta técnica maravilhosa de equilibrio e saúde',
    video_urls: ['https://www.youtube.com/watch?v=NPpqSfgDJYU&list=PLBDxU1-FpooiBhsSzMe1_tr9clULY9EXu',
    'https://www.youtube.com/watch?v=VXTHr4Glx3A&list=PLBDxU1-FpooiBhsSzMe1_tr9clULY9EXu&index=2&pp=iAQB',
    'https://www.youtube.com/watch?v=EYOWuTlr948&list=PLBDxU1-FpooiBhsSzMe1_tr9clULY9EXu&index=3&pp=iAQB'].to_json
  },
  {
    title: 'Como torcer pro corinthians',
    description: 'E se tornar um torcedor apaixonado ',
    video_urls: ['https://www.youtube.com/watch?v=DFt3mHpLg58',
    'https://www.youtube.com/watch?v=IbeD6YarPvg&pp=ygUQY29yaW50aGlhbnMgMjAxMg%3D%3D'].to_json
  }
]

courses.each do |course|
  course[:start_date] = DateTime.now
  course[:end_date] = DateTime.now + 222

  Course.create(course)
end

puts "Seeds criado com sucesso!"
