import React, { useState } from 'react';
import Navbar from "../utilities/navbar.component";
import Footer from "../utilities/footer.component";

export default function ProfileLookup() {
  const [email, setEmail] = useState('');
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('mixtral_8x7b_instruct_0_1');
  const [profileData, setProfileData] = useState(null);
  const [numOutputs, setNumOutputs] = useState(1);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [samplingTemperature, setSamplingTemperature] = useState(0.9);
  const [avoidRepetition, setAvoidRepetition] = useState(true);
  const [error, setError] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
  };

  const handleNumOutputsChange = (e) => {
    setNumOutputs(e.target.value);
  };

  const handleMaxTokensChange = (e) => {
    setMaxTokens(e.target.value);
  };

  const handleSamplingTemperatureChange = (e) => {
    setSamplingTemperature(e.target.value);
  };

  const handleAvoidRepetitionChange = (e) => {
    setAvoidRepetition(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !prompt) {
      alert("Email and Prompt are required.");
      return;
    }

    const setProfileDataHTML = (htmlString) => {
      return { __html: htmlString };
    };

    const requestData = {
      functions: [],
      variables: {},
      email_address: email,
      input_prompt: JSON.parse(JSON.stringify(prompt)), // Parse and stringify to remove extra slashes
      selected_model: selectedModel,
      num_outputs: numOutputs,
      avoid_repetition: avoidRepetition,
      quality: 0.9,
      max_tokens: maxTokens,
      sampling_temperature: samplingTemperature,
      settings: {
        retention_policy: "keep",
      },
    };

    try {
      const response = await fetch('https://api.gooey.ai/v2/SocialLookupEmail/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer sk-0RnlCijUhpoH0KcVujVPewIALOr6SuOJCfuOl2T0iDhh888M`,
        },
        body: JSON.stringify(requestData),
      });

      // if (!response.output) {
      //   console.log(response.output);
      //   throw new Error('Network response was not ok');
      // }

      const data = await response.json();
      if (data.output.output_text) {
        setProfileData(data.output.output_text);
        setError(null); // Clear any previous errors
      } else {
        setError("No data available.");
      }
    } catch (error) {
      setError('Error fetching profile data: ' + error.message);
      console.error('Error fetching profile data:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-[1070px] mx-auto text-center my-5">
        <div className="max-w-[730px] mx-auto text-center">
          <h3 className="lg:text-[45px] text-3xl leading-tight font-semibold">
            Profile Lookup + GPT-4 for AI-Personalized Emails
          </h3>
        </div>
        <br />
        <p className="text-lg text-gray-700 mb-5">
          Look up any email's public social profile (from LinkedIn, Facebook, the web, etc) and then use the profile's name, 
          employment history, city, etc. in your GPT-4-powered AI mail merge to create personalized emails that get through spam filters.
        </p>
      </div>
      <div className="max-w-[1192px] mx-auto mt-10 relative">
        <img
          alt="Dots"
          className="absolute -top-5 -left-10 opacity-30"
          src="assets/images/dots.svg"
        />
        <div className="p-10 w-full rounded-3xl cursor-pointer bg-white shadow-[0px_100px_60px_-70px_rgba(19,15,48,0.1)] relative">
          <form onSubmit={handleSubmit}>
            <div className="-mx-4 flex flex-wrap relative">
              <div className="px-4 md:w-6/12 w-full">
                <h2>INPUTS</h2>
                <br />
                <label>Email Address</label>
                <br />
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  name="email_address"
                  className="flex flex-col items-center justify-center w-full h-10 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                />
                <small className="text-muted">
                  By providing an email address, you agree to Gooey.AI's <a href="https://gooey.ai/privacy">Privacy Policy</a>.
                </small>
                <br />
                <label>Email Prompt</label>
                <br />
                <textarea
                  value={prompt}
                  onChange={handlePromptChange}
                  rows="4"
                  name="input_prompt"
                  className="flex flex-col items-center justify-center w-full border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                />
                <br />
                <label>Model</label>
                <br />
                <select
                  name="selected_model"
                  id="selected_model"
                  value={selectedModel}
                  onChange={handleModelChange}
                  className="flex flex-col items-center justify-center w-full h-10 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                >
                  <option value="gpt_4_o">GPT 4 0</option>
                  <option value="gpt_4_turbo_vision">GPT 4 Turbo Vision</option>
                  <option value="gpt_4_vision">GPT 4 Vision</option>
                  <option value="gpt_4_turbo">GPT 4 Turbo</option>
                  <option value="gpt_4">GPT 4</option>
                  <option value="gpt_4_32k">GPT 4 32k</option>
                  <option value="gpt_3_5_turbo">GPT 3.5 Turbo</option>
                  <option value="gpt_3_5_turbo_16k">GPT 3.5 Turbo 16k</option>
                  <option value="gpt_3_5_turbo_instruct">GPT 3.5 Turbo Instruct</option>
                  <option value="llama3_70b">Llama3 70b</option>
                  <option value="llama3_8b">Llama3 8b</option>
                  <option value="llama2_70b_chat">Llama2 70b Chat</option>
                  <option value="mixtral_8x7b_instruct_0_1">Mixtral 8x7b Instruct 0.1</option>
                  <option value="gemma_7b_it">Gemma 7b IT</option>
                  <option value="gemini_1_5_pro">Gemini 1.5 Pro</option>
                  <option value="gemini_1_pro_vision">Gemini 1 Pro Vision</option>
                  <option value="gemini_1_pro">Gemini 1 Pro</option>
                  <option value="palm2_chat">PaLM2 Chat</option>
                  <option value="palm2_text">PaLM2 Text</option>
                  <option value="claude_3_5_sonnet">Claude 3.5 Sonnet</option>
                  <option value="claude_3_opus">Claude 3 Opus</option>
                  <option value="claude_3_sonnet">Claude 3 Sonnet</option>
                  <option value="claude_3_haiku">Claude 3 Haiku</option>
                  <option value="sea_lion_7b_instruct">Sea Lion 7b Instruct</option>
                  <option value="text_davinci_003">Text Davinci 003</option>
                  <option value="text_davinci_002">Text Davinci 002</option>
                  <option value="code_davinci_002">Code Davinci 002</option>
                  <option value="text_curie_001">Text Curie 001</option>
                  <option value="text_babbage_001">Text Babbage 001</option>
                  <option value="text_ada_001">Text Ada 001</option>
                </select>
                <br />
                <label>Avoid Repetition</label>
                <br />
                <input
                  type="checkbox"
                  checked={avoidRepetition}
                  onChange={handleAvoidRepetitionChange}
                  name="avoid_repetition"
                  className="cursor-pointer"
                />
                <br />
                <label>Answer Outputs</label><br/>
                <small>How many answers should the copilot generate? Additional answer outputs increase the cost of each run.</small>
                <br />
                <input
                  type="number"
                  min="1"
                  max="4"
                  step="1"
                  value={numOutputs}
                  onChange={handleNumOutputsChange}
                  name="num_outputs"
                  className="w-full"
                />
                <br />
                <label>Max Output Tokens</label><br/>
                <small>The maximum number of tokens to generate in the completion. Increase to generate longer responses.</small>
                <br />
                <input
                      type="number"
                      value={maxTokens}
                      onChange={handleMaxTokensChange}
                      name="max_tokens"
                      className="flex flex-col items-center justify-center w-full h-10 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                    />
                    <br />
                    <label>Creativity (Sampling Temperature)</label><br/>
                    <small>Higher values allow the LLM to take more risks. Try values larger than 1 for more creative applications or 0 to ensure that LLM gives the same answer when given the same user input.</small>
                    <br />
                    <input
                      type="number"
                      min="0"
                      max="2"
                      step="0.1"
                      value={samplingTemperature}
                      onChange={handleSamplingTemperatureChange}
                      name="sampling_temperature"
                      className="w-full"
                    />
                  </div>
                  <div className="px-4 md:w-6/12 w-full">
                    <h2>OUTPUT</h2>
                    <textarea
                      value={profileData ? profileData : 'No data available'}
                      rows="20"
                      className="flex flex-col items-center justify-center w-full border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                      readOnly
                    />
                  </div>
                </div>
                {error && (
                  <div className="text-red-600 text-sm mt-2">
                    Error: {error}
                  </div>
                )}
                <button
                  type="submit"
                  className="inline-flex items-center justify-center py-3 px-7 rounded-full text-base font-medium text-white bg-theme-dark shadow-md transition-all duration-200 hover:bg-blue-700 mt-6"
                >
                  🏃 Submit
                </button>
              </form>
            </div>
          </div>
          <Footer />
        </>
      );
    }
