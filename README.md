# Backend - Events

## Emit

---

### Event name: "start-game"

`Response format`

```json
{
  "currentImage": "http://images.com/image6.png",
  "isGameReady": true,
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
  ],
  "images": [
    "http://images.com/image1.png",
    "http://images.com/image2.png",
    "http://images.com/image3.png",
    "http://images.com/image4.png",
    "http://images.com/image5.png",
    "http://images.com/image6.png",
    "http://images.com/image7.png",
    "http://images.com/image8.png"
  ]
}
```

---

### Event name: "update-game"

`Response format`

```json
{
  "currentImage": "http://images.com/image6.png",
  "isGameReady": true,
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

---

### Event name: "update-players"

`Response format`

```json
{
  "currentImage": "http://images.com/image6.png",
  "isGameReady": true,
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

---

### Event name: "finish-game"

`Response format`

```json
{
  "currentImage": "http://images.com/image6.png",
  "isGameReady": false,
  "players": [
    {
      "id": "KIs5jdaf7ahbndq9h",
      "isReady": false,
      "points": 0,
      "name": "unknown",
      "image": "http://userImage.com/user.png"
    },
    {
      "id": "LTy19daAIUhndf2829",
      "isReady": false,
      "points": 5,
      "name": "user2574",
      "image": "http://userImage.com/user.png"
    },
    {
      "id": "Tps5j345ahbnGHJH9h",
      "isReady": false,
      "points": 15,
      "name": "user1342",
      "image": "http://userImage.com/user.png"
    }
  ]
}
```

## On

---

### Event name: "is-ready"

`Request format`

```json
{
  "id": "KIs5jdaf7ahbndq9h",
  "isReady": true,
  "name": "unknown",
  "image": "http://userImage.com/user.png"
}
```

---

### Event name: "round-winner-user"

`Request format`

```json
"KIs5jdaf7ahbndq9h"
```

---

### Event name: "restart-game"

`Request format`

```plaintext
No content
```

---
