.PHONY: all dep-up dep-down wait-for exec smoke

all: dep-up wait-for exec dep-down

dep-up:
	@echo "Starting dependencies..."
	@docker-compose up --build -d cocoa-service

dep-down:
	@echo "Stopping dependencies..."
	@docker-compose down

wait-for:
	@echo "Waiting for service to start up..."
	@while ! curl --output /dev/null -s --fail http://localhost:3000/api/v1/health; do sleep 1 && echo .; done;

exec:
	curl -s \
		-H "Content-Type: application/json" \
		-H "Authorization: Bearer 566e799e-42a5-476b-ab34-f7541e309fae" \
		-X POST 'http://localhost:3000/api/v1/format' \
		-d @./tests/fixtures/cli-complete-request-body.json \
		| jq

smoke:
	@curl --fail \
		-H "Content-Type: application/json" \
		-H "Authorization: Bearer 566e799e-42a5-476b-ab34-f7541e309fae" \
		-X GET 'http://localhost:8080/api/v1/health'
