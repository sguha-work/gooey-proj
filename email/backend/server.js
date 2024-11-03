import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Route to handle POST request
app.post('/seo-paragraph-generator/api/seo-summary', async (req, res) => {
  const payload = {
    search_query: req.body.search_query,
    keywords: req.body.keywords,
    title: req.body.title,
    company_url: req.body.company_url
  };

  console.log('Payload:', payload);
  console.log('GOOEY_API_KEY:', process.env.GOOEY_API_KEY ? 'Present' : 'Missing');

  try {
    const response = await fetch("https://api.gooey.ai/v2/SEOSummary/", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GOOEY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log('Error response:', errorText);
      throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    res.status(200).json(result);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Route to handle email-writer-with-profile-lookup
app.post('/email-writer-with-profile-lookup/api/email-summary', async (req, res) => {
  const payload = {
    functions: [],
    variables: {},
    email_address: req.body.email_address,
    input_prompt: req.body.input_prompt,
    selected_model: req.body.selected_model,
    num_outputs: req.body.num_outputs,
    avoid_repetition: req.body.avoid_repetition,
    quality: req.body.quality,
    max_tokens: req.body.max_tokens,
    sampling_temperature: req.body.sampling_temperature,
    settings: {
      retention_policy: req.body.settings.retention_policy,
    }
  };

  console.log('Payload:', payload);
  console.log('GOOEY_API_KEY:', process.env.GOOEY_API_KEY ? 'Present' : 'Missing');

  try {
    const response = await fetch('/email-writer-with-profile-lookup/api/email-summary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log('Error response:', errorText);
      throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    res.status(200).json(result);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
