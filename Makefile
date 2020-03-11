duke-nukem:
	docker-compose down --remove-orphans && docker-compose kill && docker system prune -f

test-api:
	# Init the external network dddd
	-- docker network create draconifors_backend
	
	# Build the API
	docker-compose -f docker-compose.yml down --remove-orphans && docker-compose up -d --build
	
	sleep 5s

	# Build the test container
	-- docker-compose -f docker-compose.test.yml down
	docker-compose -f docker-compose.test.yml  up -d --build
	


	# Follow the containers progress
	docker logs draconifors_test -f  


