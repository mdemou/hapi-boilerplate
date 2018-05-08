# Hapi v17 Boilerplate and MongoDB
This repository contains a Hapi v17 boilerplate with MongoDB

## Requirements
* Node.js v8.x or later
* NPM
* MongoDB

### Configure Mongo DDBB
> edit ./server/config/environment/local.js 
> update mongoUrl with your Mongo URI and 
> update mongoDdbb field with your database name

## Set up and run
```sh
# clone repository
$ git clone https://github.com/mdemou/hapi-boilerplate.git
$ cd hapi-boilerplate

# install dependencies
$ npm install

# start the server
$ npm run dev
```

## Usage
Basic REST API about books

```
# create book resources 
$ curl -X POST \
  http://localhost:9000/v1/book \
  -H 'Content-Type: application/json' \
  -d '{
	"author": "John Doe",
	"title": "This is John Doe",
	"year": "1987"
}'

# get book resource
curl -X GET \
  http://localhost:9000/v1/book/{{bookUuid}}

# get books resources
$ curl -X GET \
  http://localhost:9000/v1/book
  
# delete book resource
$ curl -X DELETE \
  http://localhost:9000/v1/book/{{bookUuid}}
```

## Extras
```sh
# build RAML and open in browser
$ npm run build:apiDocs
$ open documentation/index.html

# check packages vulnerabilities
$ npm run nsp
```

## Docker
Try it with docker!
```
# build docker image
$ docker build -t hapi-boilerplate:1 .

# run docker image (set variables as you need)
docker run --rm -9000:9000 
-e BOILERPLATE_NODE_ENV=development \
-e BOOK_IP=localhost \
-e BOOK_PORT=9000 \
-e BOOK_MONGOURL="mongodb://mongoip:27020" \
-e BOOK_MONGODDBB=Books \
-e BOOK_MONGO_LIMIT=10 \
-e BOOK_MAX_ENTRIES_LIMIT=10 \
hapi-boilerplate:1
```

## Support and PR
Feel free to ask for support, or pull requests with improvements this repository. I will be very happy to hear from you, and make this as useful as possible

## Thanks!
> It is great to share this with all of you, and could be useful :)

## License
Check LICENSE file

---
> GitHub [@mdemou](https://github.com/mdemou/)