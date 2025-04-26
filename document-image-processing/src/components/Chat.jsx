import { useState } from "react";
import "./Chat.css";
import { GoogleGenerativeAI } from "@google/generative-ai";

function Chat({ file }) {
  const genAI = new GoogleGenerativeAI("YOUR_API_KEY");
  const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  async function handleSendMessage() {
    if (input.length) {
      let chatMessages = [
        ...messages,
        { role: "user", text: input },
        { role: "loader", text: "" },
      ];
      setInput("");
      setMessages(chatMessages);
      try {
        const result = await model.generateContent([
          {
            inlineData: {
              data: file.file,
              mimeType: file.type,
            },
          },
          `
          Answer this question about the attached document: ${input}.
          Answer as a chatbot with short messages and text only (no markdowns, tags or symbols).
          Chat history: ${JSON.stringify(messages)}
          `,
        ]);
        chatMessages = [
          ...chatMessages.filter((msg) => msg.role !== "loader"),
          { role: "model", text: result.response.text() },
        ];
        setMessages(chatMessages);
      } catch (error) {
        chatMessages = [
          ...chatMessages.filter((msg) => msg.role !== "loader"),
          {
            role: "error",
            text: "Error sending messages, please try again later.",
          },
        ];
        setMessages(chatMessages);
        console.log("error");
      }
    }
  }

  return (
    <section className="chat-window">
      <h2>Chat</h2>
      {messages.length > 0 && (
        <div className="chat">
          {messages.map((msg, index) => (
            <div className={msg.role} key={index}>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
      )}
      <div className="input-area">
        <input
          type="text"
          placeholder="Ask any question about the uploaded document"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSendMessage}>Ask Me</button>
      </div>
    </section>
  );
}

export default Chat;
