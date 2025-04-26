import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const API_KEY = YOUR_API_KEY_GOES_HERE;

const genAI = new GoogleGenerativeAI(API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function generateCategories() {
  const schema = {
    description: "List of science categories",
    type: SchemaType.ARRAY,
    items: {
      type: SchemaType.OBJECT,
      properties: {
        categoryName: {
          type: SchemaType.STRING,
          description: "Name of the category",
          nullable: false,
        },
      },
      required: ["categoryName"],
    },
  };

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  const prompt = `
      
          Give me 5 random science categories people would be
          intreasted in knowing about.
      
      `;

  try {
    const result = await model.generateContent(prompt);
    const categories = JSON.parse(result.response.text());
    categories.forEach((category) => {
      let btn = document.createElement("button");
      btn.textContent = category.categoryName;
      btn.addEventListener("click", (e) => {
        fetchScienceFacts(e.target.textContent);
      });
      document.querySelector(".categories").appendChild(btn);
    });

    // console.log(result.response.text());
  } catch (error) {
    console.log(error);
  }

  document.querySelector("body").classList.remove("loading");
}

async function fetchScienceFacts(category) {
  document.querySelector("body").classList.add("loading");

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
  
    Generate a science fact about ${category} in less than 3 lines.
    
    Don't use markdown, only a single text paragraph.

    Add emojis when it makes sense.
  
  `;

  const result = await model.generateContent(prompt);
  document.querySelector(
    "main p"
  ).innerText = `Here's your science fact about ${category}`;
  document.querySelector("main h1").innerText = result.response.text();
  document.querySelector("main").classList.add("done");
  document.querySelector("body").classList.remove("loading");
}

generateCategories();
