# Run App

**Running the App** <br>
you can start the application by running the following command in your terminal:
```shell
docker compose up -d
```
**Endpoint** <br>
```text
http://localhost:3000
```

# Crawling API

## Get Links
**Endpoint**: `POST /crawls/url`<br>
**Description**: Get Links from site <br>
**Request Body**:
```json
{
  "task_id": 1,
  "url": "https://www.fda.gov"
}
```
**Response**:

```json
{
  "status": true,
  "message": "Successfully crawled!"
}
```

## Get information from a link
**Endpoint**: `POST /crawls/analytics` <br>
**Request Body**:
```json
{
  "task_id": 1,
  "page": 1,
  "page_size":5
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
        "url": "https://www.fda.gov",
        "task_id": 1,
        "title": "Home | FDA",
        "description": "The FDA is responsible for protecting the public health by ensuring the safety, efficacy, and security of human and veterinary drugs, biological products, and medical devices; and by ensuring the safety of our nation's food supply, cosmetics, and products that emit radiation.",
        "text": "The FDA is responsible for protecting the public health by ensuring the safety, efficacy, and security of human and veterinary drugs, biological products, and medical devices; and by ensuring the safety of our nation's food supply, cosmetics, and products that emit radiation.",
        "html": "<html><head><title>Home | FDA</title></head><body><h1>The FDA is responsible for protecting the public health by ensuring the safety, efficacy, and security of human and veterinary drugs, biological products, and medical devices; and by ensuring the safety of our nation's food supply, cosmetics, and products that emit radiation.</h1></body></html>",
        "date": "2021-10-10T00:00:00.000Z",
        "childUrls": ["https://www.fda.gov/food", "https://www.fda.gov/drugs"],
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
