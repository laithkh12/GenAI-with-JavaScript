# Chat Assistant

A sleek, AI-powered customer support chat widget built using the Gemini 1.5 Flash model by Google. It provides real-time responses to customer inquiries, supports FAQs, and includes dynamic UI animations for a modern user experience.

## 🚀 Features

- Embedded AI-powered chatbot using `@google/generative-ai`
- Responsive UI with smooth animations
- Support for predefined business information (e.g., FAQ, locations)
- Minimalist and user-friendly chat interface
- Supports multiple store locations and return policies
- Custom loader animation for AI response simulation

## 🧩 Technologies Used

- HTML5, CSS3 (with custom styles)
- Vanilla JavaScript (ES6 modules)
- Google Generative AI (Gemini 1.5 Flash)
- Google Fonts (Raleway)

## 📁 File Structure

```
chat-assistant/
├── index.html        # Main HTML structure
├── style.css         # Styles for the chat widget
├── main.js           # AI logic and event handling
├── chat-icon.png     # Icon for floating chat button
├── send-icon.png     # Icon for send message button
└── README.md         # Project documentation
```

## 🛠 Setup Instructions

1. Clone the repository or download the project files.
2. Replace the `API_KEY` in `main.js` with your valid Google Generative AI API key.
3. Open `index.html` in a web browser to see the chat assistant in action.

> Ensure you have internet access to load external fonts and the AI module.

## 📌 Notes

- You can customize the chat assistant tone and FAQ responses by modifying the `businessInfo` string in `main.js`.
- For production environments, consider securing the API key using server-side integration.

## 🧑‍💼 License

This project is open-source and available under the [MIT License](LICENSE).

---

Made with ❤️ for businesses wanting smarter customer interactions.