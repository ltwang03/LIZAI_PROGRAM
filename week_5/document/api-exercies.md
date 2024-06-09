## Setup source
**Note** If you dont have `docker swarm` pls init it by `docker swarm init` <br>
```bash
docker stack deploy -c docker-compose.yml --resolve-image never stack-exercies
```

## Get information from a link
**Endpoint**: `POST http://localhost:3000/crawls` <br>
**Request Body**:
```json
{
  "taskId": 1,
  "page": 1,
  "pageSize":10
}
```
**Response**:

```json
{
  "status": true,
  "data": {
    "list": [
      {
        "id": 1,
        "url": "https://www.cdc.gov/breast-cancer/screening/",
        "task_id": 1,
        "title": "Home | FDA",
        "description": "The FDA is responsible for protecting the public health by ensuring the safety, efficacy, and security of human and veterinary drugs, biological products, and medical devices; and by ensuring the safety of our nation's food supply, cosmetics, and products that emit radiation.",
        "text": "The FDA is responsible for protecting the public health by ensuring the safety, efficacy, and security of human and veterinary drugs, biological products, and medical devices; and by ensuring the safety of our nation's food supply, cosmetics, and products that emit radiation.",
        "html": "<html><head><title>Home | FDA</title></head><body><h1>The FDA is responsible for protecting the public health by ensuring the safety, efficacy, and security of human and veterinary drugs, biological products, and medical devices; and by ensuring the safety of our nation's food supply, cosmetics, and products that emit radiation.</h1></body></html>",
        "date": "2021-10-10T00:00:00.000Z",
        "createdAt": "2021-10-10T00:00:00.000Z",
        "updatedAt": "2021-10-10T00:00:00.000Z"
      },
      {...},
      {...},
      {...},
      {...}
    ]
  }
}
```
