import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const PORT = process.env.PORT || 3000;

if (!process.env.JOOBLE_API_KEY) {
    console.warn('Warning: JOOBLE_API_KEY is not set');
}

app.get("/", (req, res) => {
    res.send("Hello World");
});

const jobSearchSchema = z.object({
    keywords: z.string().min(1).trim(),
    location: z.string().trim().optional(),
    radius: z.number().min(0).optional(),
    page: z.number().min(1).optional(),
});

app.post('/api/jobs/search', async (req, res) => {
    const parsed = jobSearchSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: z.treeifyError(parsed.error) });
    }
    const payload = parsed.data;

    try {
        const r = await fetch(`https://jooble.org/api/${process.env.JOOBLE_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        if (!r.ok) {
            const errorBody = await r.json().catch(() => ({}));
            return res.status(r.status).json(errorBody);
        }
        res.json(await r.json());
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }

});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});