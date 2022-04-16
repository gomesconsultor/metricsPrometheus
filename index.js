import express from 'express';
import { collectDefaultMetrics, register } from 'prom-client';
import crypto from "crypto";

collectDefaultMetrics();

const app = express();

app.use(express.json());

app.get('/metrics', async (_req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

app.get('/', async (_req, res) => {
    res.send("Bom dia").end();
});

app.post("/users", (_req, res) => {
    const { token } = _req.headers;
    const { name, instagram } = _req.body;

   //if (!token) {
     // return response.status(401).end();
   //}
    
   console.log(_req.body);
   console.log(instagram)

   
   if (!name || !instagram) {
        return res.status(500).json({ error: "Invalid parameters" });
   }

   const user = {
      id: crypto.randomBytes(16).toString("hex"),
      name: name,
      username: instagram
   };
   
  return res.json(user);
});


app.listen(4001, '0.0.0.0');
