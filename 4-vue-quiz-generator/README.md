
# 📚 Vue Quiz Generator

A dynamic Vue 3 application that generates custom quizzes based on your chosen topic using Google's Gemini AI model! 🚀  
Answer multiple-choice questions and view your results instantly.

---

## ✨ Features

- ⚡ Generate quizzes dynamically from any topic
- 🎯 Multiple-choice questions
- 🔄 Restart the quiz anytime
- 📊 Progress tracking with progress bar
- 🏆 Result summary with correct/incorrect answers
- ⚙️ Built using **Vue 3 Composition API**
- 🤖 Integrated with **Google Generative AI** (Gemini 1.5 Flash)

---

## 📂 Project Structure

```
src/
 ├── assets/
 │    └── logo.png
 ├── components/
 │    ├── StartScreen.vue
 │    ├── Quiz.vue
 │    ├── Result.vue
 │    ├── Loader.vue
 └── App.vue
```

---

## 🚀 Setup & Installation

1. **Clone the repository**:

```bash
git clone https://github.com/your-username/4-vue-quiz-generator.git
cd 4-vue-quiz-generator
```

2. **Install dependencies**:

```bash
npm install
```

3. **Configure your API Key**:
   
In `App.vue`, replace:

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

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Google Generative AI SDK](https://www.npmjs.com/package/@google/generative-ai)

---

## 📸 Screenshots

| Start Screen | Quiz Screen | Result Screen |
|:---:|:---:|:---:|
| ![Start Screen](./screenshots/start.png) | ![Quiz Screen](./screenshots/quiz.png) | ![Result Screen](./screenshots/result.png) |

---

## 🧠 How It Works

- **Start** by entering a topic (e.g., "space", "biology", "history")
- **Loader** appears while questions are being generated
- **Quiz** questions are displayed one by one with randomized options
- **Result** page shows total correct answers and review of each question

---

## 📋 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

- Google for their [Generative AI API](https://ai.google.dev/)
- Vue.js and its awesome community

---

✅ **Ready to challenge yourself with AI-generated quizzes?**  
🌟 **Start learning in a fun way today!**
