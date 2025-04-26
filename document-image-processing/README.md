
# 📄 DocInsight - Document & Image Processing App

A smart React application that reads PDF documents and images, summarizes them, and allows users to chat and ask questions about their uploaded files using Google's Generative AI! 🚀

---

## ✨ Features

- 📑 Upload PDF documents or images (JPG, PNG)
- 🧠 Instant AI-generated summaries
- 💬 Interactive chat to ask questions about the uploaded file
- ⚙️ Powered by **Google Generative AI (Gemini 1.5 Flash)**
- 🖼️ Image preview for uploaded files
- 🔥 Built using **React 18 + Vite**

---

## 📂 Project Structure

```
src/
 ├── components/
 │    ├── Chat.jsx
 │    ├── FileUpload.jsx
 │    ├── Header.jsx
 │    ├── Loader.jsx
 │    └── Summary.jsx
 ├── App.jsx
 ├── Chat.css
 ├── Loader.css
```

---

## 🚀 Setup & Installation

1. **Clone the repository**:

```bash
git clone https://github.com/your-username/document-image-processing.git
cd document-image-processing
```

2. **Install dependencies**:

```bash
npm install
```

3. **Configure your API Key**:

In both `Chat.jsx` and `Summary.jsx`, replace:

```javascript
const genAI = new GoogleGenerativeAI("YOUR_API_KEY");
```

with your actual Google Generative AI API key.

4. **Run the development server**:

```bash
npm run dev
```

---

## 🛠️ Technologies Used

- [React.js](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Google Generative AI SDK](https://www.npmjs.com/package/@google/generative-ai)

---

## 📸 Screenshots

| File Upload | Summary | Chat |
|:---:|:---:|:---:|
| ![Upload](./screenshots/upload.png) | ![Summary](./screenshots/summary.png) | ![Chat](./screenshots/chat.png) |

---

## 🧠 How It Works

- Upload a PDF document or an image.
- The app generates a **short summary** of the uploaded file.
- Ask any question regarding the uploaded document in the **chat window**.
- Get concise and accurate answers powered by AI.

---

## 📋 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

- Google for their [Generative AI API](https://ai.google.dev/)
- React and its vibrant community

---

✅ **Explore your documents and images like never before with AI assistance!**
