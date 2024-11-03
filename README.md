# Fumbl-ify: Turning Seriousness into Silliness!

Fumbl-iFy is a Chrome extension designed to inject a playful twist into any topic by generating absurd or nonsensical responses. This extension is usable on any website with text input fields and allows users to activate the feature with a simple command: `ify("your text")`. The input text is then sent to an AI model hosted on Hugging Face, which generates a useless response that appears in the input field where the command was invoked.

---

## 🎯 Team: console.log()

- **Team Lead**: Aravind Manoj - SJCET Palai
- **Member 2**: Abin Thomas - SJCET Palai
- **Member 3**: Abin Raju Daniel - SJCET Palai

---

## Project Description
Fumbl-ify is a Chrome extension that takes any topic and humorously rephrases it into an exaggerated, silly version. It’s designed to bring a bit of levity and laughter to otherwise mundane or serious topics.

### The Problem (that doesn't exist)
People often take things way too seriously. Important or formal topics can be, let’s face it, a bit dry. We thought—what if there were a way to add a splash of humor to any topic?

### The Solution (that nobody asked for)
Our extension, Fumbl-ify, injects ridiculous, humorous spins on user-provided topics. It’s like having your own personal jester who turns mundane topics into quirky, amusing ones at the click of a button!

---

## Technical Details

### Technologies/Components Used

#### For Software:
- **Languages**: TypeScript, JavaScript, Python
- **Frameworks**: React, NextJs, Tailwind CSS 
- **Backend**: FastAPI with Hugging Face API
- **AI Model**: HuggingFaceH4/zephyr-7b-beta
- **Libraries**: `webextension-polyfill` for chrome extension
- **Tools**: Chrome Developer Tools, VS Code, Git

#### For Hardware:
No hardware components are required as this is a purely software-based project.

### Implementation

1. User Interaction: The user types ify("some text") into any input field or textarea on a website.
2. Capturing Input: The extension utilizes the `webextension-polyfill` library to interact with the DOM, capturing the user’s input when the command is detected.
3. Processing Input: The captured text is sent to the AI model `HuggingFaceH4/zephyr-7b-beta` hosted on Hugging Face, which generate a humorously exaggerated or absurd response.
4. Displaying Output: The generated response is displayed back in the input field and consists of useless or nonsensical content, providing a humorous twist to the original topic.

---

## Installation

Clone the repository:

```bash
git clone https://github.com/aravind-manoj/useless-project
```

For setting up website:

```bash
cd useless-project/web
npm install

For local testing:
npm run dev

To build the site for production:
npm run build
```

For setting up Hugging Face API:

```bash
cd useless-project/backend

To install dependencies:
pip3 install -r requirements.txt

To start the backend:
uvicorn main:app --port 8000
```
Note: Hugging Face API token is required and it must be set in environment as `HF_TOKEN`. [API Docs](https://huggingface.co/docs/api-inference/)

For setting up chrome extension:

```bash
cd useless-project/chrome-extension
npm install

To build the extension for production:
npm run build
```


# Project Documentation
For Software:

Screenshots (Add at least 3)
![Screenshot1](Add screenshot 1 here with proper name) Add caption explaining what this shows

![Screenshot2](Add screenshot 2 here with proper name) Add caption explaining what this shows

![Screenshot3](Add screenshot 3 here with proper name) Add caption explaining what this shows

Diagrams
![Workflow](Add your workflow/architecture diagram here) Add caption explaining your workflow

For Hardware:

Schematic & Circuit
![Circuit](Add your circuit diagram here) Add caption explaining connections

![Schematic](Add your schematic diagram here) Add caption explaining the schematic

Build Photos
![Components](Add photo of your components here) List out all components shown

![Build](Add photos of build process here) Explain the build steps

![Final](Add photo of final product here) Explain the final build

# Project Demo
Video
[Add your demo video link here] Explain what the video demonstrates

Additional Demos
[Add any extra demo materials/links]

# Team Contributions
[Name 1]: [Specific contributions]
[Name 2]: [Specific contributions]
[Name 3]: [Specific contributions]
