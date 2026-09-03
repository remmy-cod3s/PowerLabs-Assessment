const db = require('./db');
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.post('/tasks', (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const status = req.body.status;
    const dueDate = req.body.dueDate;

    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    const result = db.prepare('INSERT INTO tasks (title, description, status, dueDate) VALUES (?, ?, ?, ?)')
        .run(title, description, status, dueDate);

    const newTask = db.prepare('SELECT * FROM tasks WHERE id = ?').get(result.lastInsertRowid);

    res.status(201).json(newTask);
});

app.get('/tasks', (req, res) => {
    const tasks = db.prepare('SELECT * FROM tasks').all();
    res.json(tasks);


});

app.get('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
    
    if (!task){
        return res.status(404).json({error: "Task ID not found"})
    }
    
    res.json(task);
});

app.put('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const existingTask = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);

    if (!existingTask){
        return res.status(404).json({ error: 'Task not found  '});
    }

    const title = req.body.title;

    if (!title){
        return res.status(400).json({error: 'Title is required'})
    }
    const description = req.body.description;
    const status = req.body.status;
    const dueDate = req.body.dueDate;

    db.prepare('UPDATE tasks SET title = ?, description = ?, status = ?, dueDate = ? WHERE id = ?')
        .run(title, description, status, dueDate, id);

    const updatedTask = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
    res.json(updatedTask);
});

app.delete('/tasks/:id', (req, res) => {
  const id = req.params.id;
  const existingTask = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);

  if (!existingTask) {
    return res.status(404).json({ error: 'Task not found' });
  }
  db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
  res.status(204).send();
});

app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});