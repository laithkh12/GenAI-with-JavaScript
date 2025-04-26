import { GoogleGenerativeAI } from "@google/generative-ai";

const businessInfo = `
    General Business Information:
    Website: www.yourbusiness.com

    Return Policy:
    Customers can return products within 30 days of purchase with the original receipt.
    Items must be unused and in their original packaging.
    Refunds will be processed to the origianl payment method.

    Support Email: support@yourbusiness.com

    Israel Location:
    Address: 42 Rothschild Blvd, Tel Aviv, Israel
    Phone: +972-3-555-1234
    Email: support-il@luxeessentials.com
    Opening Hours:
    Sunday–Thursday: 9:00 AM – 7:00 PM
    Friday: 9:00 AM – 2:00 PM
    Saturday: Closed    
    
    New York Location:
    Address: 325 Madison Ave, New York, NY 10017, USA
    Phone: +1 (212) 555-7890
    Email: support-ny@luxeessentials.com    
    Opening Hours:
    Monday–Saturday: 10:00 AM – 8:00 PM
    Sunday: 11:00 AM – 6:00 PM 

    FAQs:
    Q: What are your store hours?
    A: Our store hours vary by location. Please refer to the location details for accurate times.

    Q: How can I return an item?
    A: You may return unused items within 30 days. Please ensure original packaging and proof of purchase are included.

    Q: Do you offer international shipping?
    A: Yes, we ship worldwide. Shipping costs are calculated at checkout.

    Q: How can I contact customer support?
    A: You may reach us by phone or email during business hours. Messages sent after hours will be answered promptly the next day.

    Q: Where is my order?
    A: Once your order ships, you will receive a tracking number by email.

    Q: Can I shop online?
    A: Yes, our full catalog is available at www.luxeessentials.com.

    Q: Do you sell gift cards?
    A: Yes, digital gift cards are available through our website.

    Q: Are returns free?
    A: Return shipping is at the customer’s expense unless the item is damaged or incorrect.

    Q: Can I return an online purchase in-store?
    A: Yes, returns can be made at either of our store locations.

    Q: Do you have customer service in Hebrew?
    A: Yes, our Tel Aviv team can assist you in Hebrew.

    Tone & Messaging Guidelines for AI Assistant:
    Tone: Slightly formal, warm, and helpful

    Message length: Prefer short (1–3 sentences), but informative

    Avoid slang or overly casual phrases

    Use contractions when natural (e.g., "you’ll", "we’re")

    Always acknowledge the customer’s need, then provide the solution
`;

const API_KEY = "YOUR_API_KEY_GOES_HERE";

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: businessInfo,
});

let messages = {
  history: [],
};

async function sendMessage() {
  console.log(messages);
  const userMessage = document.querySelector(".chat-window input").value;

  if (userMessage.length) {
    try {
      document.querySelector(".chat-window input").value = "";
      document.querySelector(".chat-window .chat").insertAdjacentHTML(
        "beforeend",
        `
            <div class="user">
                <p>${userMessage}</p>
            </div>
            `
      );

      document.querySelector(".chat-window .chat").insertAdjacentHTML(
        "beforeend",
        `
            <div class="loader"></div>
            `
      );

      const chat = model.startChat(messages);

      let result = await chat.sendMessageStream(userMessage);
      document.querySelector(".chat-window .chat").insertAdjacentHTML(
        "beforeend",
        `
                <div class="model">
                    <p></p>
                </div>
                `
      );
      let modelMessages = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        modelMessages = document.querySelectorAll(
          ".chat-window .chat div.model"
        );
        modelMessages[modelMessages.length - 1]
          .querySelector("p")
          .insertAdjacentHTML(
            "beforeend",
            `
                    ${chunkText}
                    `
          );
      }

      messages.history.push({
        role: "user",
        parts: [{ text: userMessage }],
      });

      messages.history.push({
        role: "model",
        parts: [
          {
            text: modelMessages[modelMessages.length - 1].querySelector("p")
              .innerHTML,
          },
        ],
      });
    } catch (error) {
      console.log(error);
      document.querySelector(".chat-window .chat").insertAdjacentHTML(
        "beforeend",
        `
              <div class="error">
                  <p>❌ The message could not be sent. Please try again later</p>
              </div>
              `
      );
    }
    document.querySelector(".chat-window .chat .loader").remove();
  }
}

document
  .querySelector(".chat-window .input-area button")
  .addEventListener("click", () => sendMessage());

document.querySelector(".chat-button").addEventListener("click", () => {
  document.querySelector("body").classList.add("chat-open");
});

document
  .querySelector(".chat-window button.close")
  .addEventListener("click", () => {
    document.querySelector("body").classList.remove("chat-open");
  });
