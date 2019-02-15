install:
	@docker-compose up -d
	@docker-compose exec web bash -c "bundle install"
	@docker-compose exec web bash -c "npm install"
	@docker-compose exec web bash -c "gulp"

run:
	@docker-compose exec web bash -c "bundle exec jekyll serve --config _config.yml,_config.dev.yml"