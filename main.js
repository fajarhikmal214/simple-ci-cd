require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({
        "message": "OK"
    });
});

// Simple route
app.get('/ping', (req, res) => {
    console.log(`[${new Date().toISOString()}] /ping accessed`);
    res.send('pong');
});

// Medium route (simulated DB)
app.get('/users/:id', async (req, res) => {
    const userId = req.params.id;
    console.log(`[${new Date().toISOString()}] /users/${userId} accessed`);

    // Simulate DB delay
    await new Promise(resolve => setTimeout(resolve, 100));
    const fakeUser = { id: userId, name: 'John Doe' };

    res.json(fakeUser);
});

// Heavy route (simulated CPU + DB load)
app.get('/reports/monthly', async (req, res) => {
    console.log(`[${new Date().toISOString()}] /reports/monthly accessed`);

    // Simulate DB delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // Simulate CPU-intensive task
    const report = [];
    for (let i = 0; i < 1000; i++) {
        report.push({ index: i, value: Math.random() * 1000 });
    }

    res.json({ reportLength: report.length });
});

app.listen(port, () => {
    console.log(`Server is running on http://0.0.0.0:${port}`);
});
