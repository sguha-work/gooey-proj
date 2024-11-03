import express from 'express';
import https from 'https';
import fs from 'fs';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';

// Load your SSL certificate and key
const privateKey = fs.readFileSync('privatekey.pem', 'utf8');
const certificate = fs.readFileSync('certificate.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Create an instance of Express
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Sample route
app.get('/', (req, res) => {
    res.send('Hello, HTTPS World!');
});

// Create HTTPS server
const httpsServer = https.createServer(credentials, app);

// Start the https server
const PORT = 7113;
httpsServer.listen(PORT, () => {
    console.log(`HTTPS Server running on port ${PORT}`);
});

// start the http server
http.createServer(app).listen(7114, () => {
  console.log(`HTTP Server is running on http://localhost:7114}`);
});

// Custom API route to interact with Perplexity API
app.post("/api/chat", async (req, res) => {
  const { message } = req.body; // User input message
  const perplexityApiKey = process.env.PERPLEXITY_API_KEY; // Use .env for token

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }
  console.log(message)
  // Prepare request options
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer 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`, // Authorization token
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.1-sonar-small-128k-chat",
      messages: [
        { role: "user", content: message },
      ],
      // max_tokens: "Optional",
      temperature: 0.2,
      top_p: 0.9,
      return_citations: true,
      search_domain_filter: ["perplexity.ai"],
      return_images: true, // Request for images
      return_related_questions: false,
      search_recency_filter: "month",
      top_k: 0,
      stream: false,
      presence_penalty: 0,
      frequency_penalty: 1,
    }),
  };

  try {
    // Fetch response from Perplexity API
    const response = await fetch(
      "https://api.perplexity.ai/chat/completions",
      options
    );
    const data = await response.json();

    // Log the complete response for debugging
    console.log("Complete Response:", JSON.stringify(data, null, 2)); // Log formatted JSON

    // Optionally log the specific part of the response you are interested in
    if (data.choices && data.choices.length > 0) {
      const messageContent = data.choices[0].message;
      console.log("Message Content:", messageContent);

      // Check for images in the messageContent (if it exists)
      if (messageContent && messageContent.images) {
        console.log("Images:", messageContent.images);
      } else {
        console.log("No images found in the response.");
      }
    }

    res.json(data); // Send Perplexity API response back to the client
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Base endpoint
app.get("/", (req, res) => {
  res.send("Perplexity Chat Completion API");
});
