const express = require('express');
const router = express.Router();
const { API_KEY, USER_NAME, SECRET_KEY } = require("../config");
const Task = require("../Modal/TaskSchema");
const auth = require('../authentication');
const jwt = require("jsonwebtoken");

// 1. Login into the system
router.post("/login", (req, res) => {
    try {
        let username = req.body.name;
        let apikey = req.body.id;
        if (!apikey || apikey !== API_KEY || !username || username !== USER_NAME) {
            res.status(401).send({ error: "Not Authorized, check your credentials entered" });
        }
        let token = jwt.sign({ name: username }, SECRET_KEY, { expiresIn: '24h' }
        );
        let response = {
            token: {
                name: username,
                token: token
            },
            image: "/images/profile.jpg"
        }
        res.status(200).send(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

// 2. Get dashboard data
router.get("/dashboard", auth.validJWT, (req, res) => {
    try {
        Task.find((err, data) => {
            if (err) {
                res.status(400).send(err);
            }
            let completionCount = 0;
            data.forEach(i => i.completed ? completionCount++ : completionCount)
            const latestTasks = (data.length > 3) ? data.slice(data.length - 3, data.length) : data;
            const response = {
                taskCompleted: completionCount,
                totalTasks: data.length,
                latestTasks: latestTasks
            }
            res.status(200).send(response);
        })
    } catch (error) {
        res.status(500).send(error);
    }
})

// 3. Get all tasks
router.get("/tasks", auth.validJWT, (req, res) => {
    try {
        Task.find((err, data) => {
            if (err) {
                res.status(404).send(err);
            }
            res.status(200).send(data);
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

// 4. Added a new task
router.post("/tasks", auth.validJWT, (req, res) => {
    try {
        if (req.body.hasOwnProperty("name")) {
            const task = new Task({
                name: req.body.name,
                completed: false
            });
            task.save((err, data) => {
                if (err) {
                    return res.status(400).send();
                }
                return res.status(200).send(data);
            })
        } else {
            return res.status(400).send();
        }

    } catch (error) {
        res.status(500).send(error);
    }
});

// 5. Edit a task
router.put("/tasks/:id", auth.validJWT, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id, (err, res) => {
            if (err) {
                console.log(err);
                throw err;
            }
            return res;
        });
        if (task) {
            task.name = req.body.name;
            task.completed = req.body.completed;
            task.save((err, data) => {
                if (err) {
                    res.status(400).send(err);
                }
                res.status(200).send(data);
            })
        } else {
            res.status(404).send("Task not found");
        }

    } catch (error) {
        res.status(500).send(error);
    }
})

// 6. Delete a task
router.delete("/tasks/:id", auth.validJWT, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id, (err, res) => {
            if (err) {
                console.log(err);
                throw err;
            }
            return res;
        });
        if (task) {
            const status = task.completed;
            if (status) {
                res.status(400).send("Cannot be deleted");
            } else {
                task.remove((err, data) => {
                    if (err) {
                        console.log(err);
                        res.status(400).send(err);
                    }
                    res.status(200).send(data);
                });
            }

        } else {
            res.status(404).send("Task not found");
        }

    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;

