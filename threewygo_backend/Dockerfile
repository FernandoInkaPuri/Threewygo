FROM ruby:3.2.0

RUN apt-get update -y && apt-get install -y build-essential libpq-dev nodejs yarn && apt-get clean

WORKDIR /threewygo_backend

COPY Gemfile /threewygo_backend/Gemfile
COPY Gemfile.lock /threewygo_backend/Gemfile.lock

RUN bundle install

COPY . .

COPY entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

EXPOSE 3000

CMD ["rails", "s", "-b", "0.0.0.0"]