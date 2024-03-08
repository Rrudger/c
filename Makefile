install:
	npm install

lint:
	npx eslint .

start:
	npm run start

build:
	npm run build

run:
	make build & make start
