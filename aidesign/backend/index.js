import express from 'express';
import fetch  from 'node-fetch';
import bodyParser from 'body-parser';
import cors from 'cors';
import FormData from 'form-data';
import multer from 'multer';
import http from 'http';
import https from 'https';



// Set up multer to handle file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.use(cors({
  origin: '*', // Allow all origins
  
}));



// Create HTTPS server
const httpsServer = https.createServer(app);

// Start the https server
const PORT = 3000;



// Middleware to parse JSON requests
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Image Generator");
});


// start the http server
http.createServer(app).listen(PORT, () => {
  console.log(`HTTP Server is running on http://localhost:${PORT}`);
});


// Define the API endpoint for generating images
app.post('/generate-image', async (req, res) => {
  const { prompt} = req.body;

  // Define the request payload to send to the external API
  const payload = {
    image_request: {
      prompt: prompt, // Default prompt if none provided
      aspect_ratio:'ASPECT_16_9',
      model:'V_2',
      magic_prompt_option:'AUTO'
    }
  };

  const options = {
    method: 'POST',
    headers: {
      'Api-Key': "A8awh0AeebSyUf7dFak_fpSWFzonxKrLdWxenYZSnfqUnxcUXoF_9arQpqUlYmBVw9kpt5TgRmQW0DXJ_EIqSg", // Use the environment variable for the API key
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  };

  try {
    // Send the request to the Ideogram API
    const response = await fetch('https://api.ideogram.ai/generate', options);

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Error generating image' });
    }

    // Parse the JSON response from the API
    const data = await response.json();

    // Send the response back to the client
    res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while generating the image' });
  }
});


// Endpoint to handle image edit requests
app.post('/edit-image', upload.fields([{ name: 'imageFile' }, { name: 'maskFile' }]), async (req, res) => {
  const { prompt } = req.body;
  const imageFile = req.files['imageFile'] ? req.files['imageFile'][0] : null;
  const maskFile = req.files['maskFile'] ? req.files['maskFile'][0] : null;

  if (!imageFile || !maskFile || !prompt) {
    return res.status(400).json({ error: 'imageFile, maskFile, and prompt are required fields.' });
  }

  try {
    const form = new FormData();
    form.append('image_file', imageFile.buffer, imageFile.originalname); // Use multer's buffer and original filename
    form.append('mask', maskFile.buffer, maskFile.originalname);
    form.append('prompt', prompt);
    form.append('model', 'V_2');
    form.append('magic_prompt_option','AUTO');
    form.append('seed', "");
    form.append('style_type',"REALISTIC");

    const options = {
      method: 'POST',
      headers: {
        'Api-Key': "A8awh0AeebSyUf7dFak_fpSWFzonxKrLdWxenYZSnfqUnxcUXoF_9arQpqUlYmBVw9kpt5TgRmQW0DXJ_EIqSg"
      },
      body: form
    };

    const response = await fetch('https://api.ideogram.ai/edit', options);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to process the image edit request' });
  }
});

// Endpoint to handle remix requests
app.post('/remix-image', upload.single('imageFile'), async (req, res) => {
  const { prompt } = req.body;
  const imageFile = req.file; // Access the uploaded image file

  // Validate required fields
  if (!imageFile || !prompt) {
    return res.status(400).json({ error: 'imageFile and prompt are required fields.' });
  }

  // Construct the JSON for the image request
  const imageRequestPayload = JSON.stringify({
    prompt: prompt,
    aspect_ratio:'ASPECT_16_9',
    image_weight: 50,
    magic_prompt_option:'ON',
    model:'V_2'
  });

  try {
    // Prepare form data for the request
    const form = new FormData();
    form.append('image_request', imageRequestPayload);
    form.append('image_file', imageFile.buffer, imageFile.originalname);

    // Set up options for the fetch call
    const options = {
      method: 'POST',
      headers: {
        'Api-Key': "A8awh0AeebSyUf7dFak_fpSWFzonxKrLdWxenYZSnfqUnxcUXoF_9arQpqUlYmBVw9kpt5TgRmQW0DXJ_EIqSg"
        
      },
      body: form
    };

    // Make the request to the Ideogram API
    const response = await fetch('https://api.ideogram.ai/remix', options);
    const data = await response.json();

    // Send the response back to the client
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to process the remix request' });
  }
});

// Endpoint to handle image upscale requests
app.post('/upscale-image', upload.single('imageFile'), async (req, res) => {
  const imageFile = req.file;

  // Validate required fields
  if (!imageFile) {
    return res.status(400).json({ error: 'imageFile is a required field.' });
  }

  try {
    // Prepare form data for the request
    const form = new FormData();
    form.append('image_request', '{}'); // An empty JSON for the `image_request` field
    form.append('image_file', imageFile.buffer, imageFile.originalname);

    // Set up options for the fetch call
    const options = {
      method: 'POST',
      headers: {
        'Api-Key': "A8awh0AeebSyUf7dFak_fpSWFzonxKrLdWxenYZSnfqUnxcUXoF_9arQpqUlYmBVw9kpt5TgRmQW0DXJ_EIqSg"
      },
      body: form
    };

    // Make the request to the Ideogram API
    const response = await fetch('https://api.ideogram.ai/upscale', options);

    // Check if response is ok
    if (!response.ok) {
      console.error('Error response from API:', await response.text());
      return res.status(response.status).json({ error: 'External API error', details: await response.text() });
    }

    // Parse and send the response back to the client
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Internal Server Error:', error);
    res.status(500).json({ error: 'Failed to process the upscale request' });
  }
});

// Endpoint to handle describe image request
app.post('/describe', upload.single('image_file'), async (req, res) => {
  
  // Check if the file was uploaded
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Create FormData and append the file from the request
  const form = new FormData();
  form.append('image_file', req.file.buffer, { filename: req.file.originalname });

  // Prepare the options for the API request
  const options = {
    method: 'POST',
    headers: {
      'Api-Key': "A8awh0AeebSyUf7dFak_fpSWFzonxKrLdWxenYZSnfqUnxcUXoF_9arQpqUlYmBVw9kpt5TgRmQW0DXJ_EIqSg", // Replace with your actual API key
      
    },
    body: form,
  };

  try {
    // Send the request to the external API
    const response = await fetch('https://api.ideogram.ai/describe', options);

    // Parse the response JSON
    const data = await response.json();

    // If the response isn't OK, send back the error
    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    // Send the API response back to the client
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
});

// Proxy endpoint
app.get('/proxy-image', async (req, res) => {
  const imageUrl = req.query.url; // URL to forward to third-party API

  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Error fetching image' });
    }

    // Pipe the response from the third-party API to your client
    const buffer = await response.buffer();
    res.set('Content-Type', 'image/png'); // Set the appropriate content type
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching image from third-party' });
  }
});


