# Backend - Events

## Emit

***

### Name event: "load-images"

`Response format`

```json
[
  "http://images.com/image1.png",
  "http://images.com/image2.png",
  "http://images.com/image3.png",
  "http://images.com/image4.png",
  "http://images.com/image5.png",
  "http://images.com/image6.png",
  "http://images.com/image7.png",
  "http://images.com/image8.png"
]
```

***

### Name event: "update-game"

`Response format`

```json
{
  "currentImage": "http://images.com/image6.png",
  "players": [
    {
      "id": "KIs5jdaf7ahbndq9h",
      "isReady": true,
      "points": 0,
      "name": "unknown",
      "image": "http://userImage.com/user.png"
    },
    {
      "id": "LTy19daAIUhndf2829",
      "isReady": true,
      "points": 5,
      "name": "user2574",
      "image": "http://userImage.com/user.png"
    },
    {
      "id": "Tps5j345ahbnGHJH9h",
      "isReady": true,
      "points": 15,
      "name": "user1342",
      "image": "http://userImage.com/user.png"
    }
  ]
}
```

***

### Name event: "finish-game"

`Response format`

```json
{
  "winner": {
    "name": "user1342",
    "id": "Tps5j345ahbnGHJH9h",
    "points": 15
  },
  "players": [
    {
      "id": "KIs5jdaf7ahbndq9h",
      "isReady": true,
      "points": 0,
      "name": "unknown",
      "image": "http://userImage.com/user.png"
    },
    {
      "id": "LTy19daAIUhndf2829",
      "isReady": true,
      "points": 5,
      "name": "user2574",
      "image": "http://userImage.com/user.png"
    },
    {
      "id": "Tps5j345ahbnGHJH9h",
      "isReady": true,
      "points": 15,
      "name": "user1342",
      "image": "http://userImage.com/user.png"
    }
  ]
}
```

## On

***

### Name event: "is-ready"

`Request format`

```json
{
  "id": "KIs5jdaf7ahbndq9h",
  "isReady": true,
  "name": "unknown",
  "image": "http://userImage.com/user.png"
}
```

***

### Name event: "round-winner-user"

`Request format`

```json
"KIs5jdaf7ahbndq9h"
```
