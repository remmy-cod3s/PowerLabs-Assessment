# Task Management API

A simple REST API for managing tasks, built for the PowerLabs Software Engineering Internship practical assessment.

# Tech Stack

- Node.js + Express — web server and routing
- better-sqlite3 — SQLite database access
- SQLite — file-based database (`tasks.db`, created on the first run)

# Setup & Running

```bash
npm install express
npm install better-sqlite3
node server.js
```

The server starts on `http://localhost:3000`. The database file (`tasks.db`) and `tasks` table are created automatically the first time the server runs

# API Endpoints

| Method | Endpoint     | Description                  |
| ------ | ------------ | ---------------------------- |
| POST   | `/tasks`     | Create a new task            |
| GET    | `/tasks`     | List all tasks               |
| GET    | `/tasks/:id` | Get a single task by id      |
| PUT    | `/tasks/:id` | Update a task (full replace) |
| DELETE | `/tasks/:id` | Delete a task                |

Task fields: `title` (required), `description`, `status`, `dueDate`, `id`(which is auto generated) and `createdAt`.

``Option 1: Thunder Client(recommended method)``
Thunderclient is a free, Rest client extension for VScode(Extensions->Search "ThunderClient"-> install) its needed for POST, PUT, and DELETE, since browsers can't send those methods directly
Make sure `server.js` is running
STEPS.

1: Open the Thunder Client panel → New Request

2: Set the method (GET/POST/PUT/DELETE) and URL (e.g. http://localhost:3000/tasks)

3: For POST/PUT, go to the Body tab → select JSON → paste a task object, e.g.:

```json
{
  "title": "Write README",
  "description": "Document the API",
  "status": "pending",
  "dueDate": "2026-09-10"
}
```

4: Click Send

``Option 2 TERMINAL:``

Since browsers send GET requests by default, you can test the two read endpoints just by visiting a URL directly — no extra tools needed:

http://localhost:3000/tasks — list all tasks
http://localhost:3000/tasks/1 — get task with id 1

The examples below are used in the Powershell terminal

copy and paste the invoke commands in the terminal

CREATE A TASK:
Invoke-RestMethod -Uri http://localhost:3000/tasks -Method POST -ContentType "application/json" -Body '{"title":"Test task","description":"testing","status":"pending","dueDate":"2026-09-10"}'

GET ALL TASKS:
Invoke-RestMethod -Uri http://localhost:3000/tasks -Method GET

GET A SPECIFIC TASK:
Invoke-RestMethod -Uri http://localhost:3000/tasks/1 -Method GET

UPDATE A TASK:
Invoke-RestMethod -Uri http://localhost:3000/tasks/1 -Method PUT -ContentType "application/json" -Body '{"title":"Updated task","description":"testing","status":"completed","dueDate":"2026-09-10"}'

DELETE A TASK:
Invoke-RestMethod -Uri http://localhost:3000/tasks/1 -Method DELETE
Deleting a task would return a 404 error which means the task was successfully removed

# Assumptions & Decisions

- API only, no frontend UI. Given the time available, I focused on a correctly-working backend, tested via Thunder Client extension /curl. A frontend could be built on top of these endpoints if needed. 
- `PUT` fully replaces a task, rather than partially patching fields. Clients must send all fields on update, and a missing `title` on update is rejected the same way as on create. 
- `title` is required on both create and update; requests without it return `400` 
- `dueDate` and `createdAt` are stored as plain text,
- Validation is minimal by design: app only checks if `title` is present.
- No separate service/controller layers: For 5 endpoints, keeping route + logic together in one file is easier to read than splitting into extra layers that would only hold a line or two each.

# Error Handling

- `400` — invalid input (missing `title`)
- `404` — task id not found, or route doesn't exist
- `500` — unexpected server error (e.g. malformed JSON in the request body) details are logged server-side only, never sent to the client

# Known Limitations / Not Completed

Completed all requirements

# Repository

https://github.com/remmy-cod3s/PowerLabs-Assessment.git
