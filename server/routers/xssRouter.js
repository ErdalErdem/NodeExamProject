import { Router } from 'express';
import escape from 'escape-html';
import helmet from 'helmet';  

const router = Router();

router.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],  
            scriptSrc: ["'self'"],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: [],
        }
    }
}));

const messages = [];

router.get('/xss/messages', (req, res) => {
    res.send({ data: messages });  
});

router.post('/xss/messages', (req, res) => {
    if (!req.body.message) {
        return res.status(400).send({ error: 'Message content cannot be empty' }); 
    }
    const escapedMessage = escape(req.body.message);  
    messages.push(escapedMessage);
    res.status(201).send({ data: messages });  
});

export default router;
