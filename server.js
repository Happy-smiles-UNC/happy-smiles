import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Create data directory if it doesn't exist
const dataDir = join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Route to handle saving user activity
app.post('/save-activity', (req, res) => {
  const { date, brushed, flossed } = req.body;
  
  if (!date) {
    return res.status(400).json({ error: 'Date is required' });
  }

  // Read the existing data from the JSON file
  const filePath = join(dataDir, 'user_activity.json');
  let activities = {};
  
  if (fs.existsSync(filePath)) {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      activities = JSON.parse(data || '{}');
    } catch (err) {
      console.error('Error reading activity file:', err);
    }
  }

  // Store the activity data
  activities[date] = { brushed, flossed };

  // Write the updated data back to the JSON file
  try {
    fs.writeFileSync(filePath, JSON.stringify(activities, null, 2));
    res.status(200).json({ message: 'Activity saved successfully' });
  } catch (err) {
    console.error('Error writing activity file:', err);
    res.status(500).json({ error: 'Failed to save activity' });
  }
});

// Route to get user activity history
app.get('/activity-history', (req, res) => {
  const filePath = join(dataDir, 'user_activity.json');
  
  if (!fs.existsSync(filePath)) {
    return res.status(200).json({});
  }
  
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const activities = JSON.parse(data || '{}');
    res.status(200).json(activities);
  } catch (err) {
    console.error('Error reading activity history:', err);
    res.status(500).json({ error: 'Failed to read activity history' });
  }
});

// For development with Vite
async function createServer() {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  
  app.use(vite.middlewares);
  
  // Fallback for client-side routing
  app.use('*', async (req, res) => {
    const url = req.originalUrl;
    
    try {
      let template = fs.readFileSync(join(__dirname, 'index.html'), 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      console.error(e);
      res.status(500).end('Server Error');
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

createServer(); 