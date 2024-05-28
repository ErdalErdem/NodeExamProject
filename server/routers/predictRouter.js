import { Router } from 'express';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

// Setup to handle __dirname with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

// Handle the /predict endpoint
router.get('/predict', (req, res) => {
    const pythonProcess = spawn('python', ['predict.py']);

    pythonProcess.stdout.on('data', (data) => {
        if (!res.headersSent) {
            res.send(`Prediction: ${data}`);
        }
    });

    pythonProcess.stderr.on('data', (data) => {
        if (!res.headersSent) {
            console.error(`Error from Python: ${data}`);
            res.status(500).send(`Error: ${data}`);
        }
    });

    pythonProcess.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
    });
});

export default router;
