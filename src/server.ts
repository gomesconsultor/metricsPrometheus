import express from "express";
import { collectDefaultMetrics, register } from "prom-client";
import crypto from 'crypto';

collectDefaultMetrics();

const app = express();

app.use(express.json());

app.get('/metrics', async (request, response) => {
  try {
    response.set('Content-Type', register.contentType);
    response.end(await register.metrics());
  } catch (err) {
    response.status(500).end(err);
  }
});

app.get('/', async (request, response) => {
    response.send("Bom dia").end();
});

app.post("/users", (request, response) => {
    const { token } = request.headers;
    const { name, instagram } = request.body;

    if (!token) {
      return response.status(401).end();
   }
    
   console.log(name);
   console.log(instagram)

   
   if (!name || !instagram) {
        return response.status(500).json({ error: "Invalid parameters" });
   }

   const user = {
      id: crypto.randomBytes(16).toString("hex"),
      name: name,
      username: instagram
   };
   
  return response.json(user);
});


app.listen(4001, () => console.log('executando na porta 0.0.0.0'));
