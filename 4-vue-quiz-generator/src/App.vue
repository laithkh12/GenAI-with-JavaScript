<script setup>
import StartScreen from "./componens/StartScreen.vue";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import Quiz from "./componens/Quiz.vue";
import Loader from "./componens/Loader.vue";
import Result from "./componens/Result.vue";
import { ref } from "vue";

const questions = ref("");
const status = ref("start");
const userAnswers = ref([]);
const errorMessage = ref("");

const restartQuiz = () => {
  questions.value = "";
  status.value = "start";
  userAnswers.value = [];
  errorMessage.value = "";
};

const storeAnwer = (answer) => {
  userAnswers.value.push(answer);
};

const startQuiz = async (topic) => {
  status.value = "loading";
  const genAI = new GoogleGenerativeAI("YOUR_API_KEY");
  const schema = {
    description: "Quiz response containing an array of quiz questions",
    type: SchemaType.OBJECT,
    properties: {
      response_code: {
        type: SchemaType.NUMBER,
        description: "Response code indicating the status of the API request",
        nullable: false,
      },
      results: {
        type: SchemaType.ARRAY,
        description: "Array of quiz questions",
        items: {
          type: SchemaType.OBJECT,
          properties: {
            type: {
              type: SchemaType.STRING,
              description: "Type of quiz question (e.g., multiple choice)",
              nullable: false,
            },
            difficulty: {
              type: SchemaType.STRING,
              description:
                "Difficulty level of the question (easy, medium, hard)",
              nullable: false,
            },
            category: {
              type: SchemaType.STRING,
              description:
                "Category of the question (e.g., Science: Computers)",
              nullable: false,
            },
            question: {
              type: SchemaType.STRING,
              description: "The text of the question",
              nullable: false,
            },
            correct_answer: {
              type: SchemaType.STRING,
              description: "The correct answer to the question",
              nullable: false,
            },
            incorrect_answers: {
              type: SchemaType.ARRAY,
              description: "List of incorrect answers",
              items: {
                type: SchemaType.STRING,
              },
              nullable: false,
            },
          },
          required: [
            "type",
            "difficulty",
            "category",
            "question",
            "correct_answer",
            "incorrect_answers",
          ],
        },
        nullable: false,
      },
    },
    required: ["response_code", "results"],
  };

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  try {
    const result = await model.generateContent(
      `
    Create 5 quiz questions about ${topic}
    Difficulty: Easy to Medium
    Type: Multiple Choice
    `
    );
    questions.value = JSON.parse(result.response.text());
    status.value = "ready";
  } catch (error) {
    errorMessage.value = error;
    status.value = "start";
  }
};
</script>

<template>
  <div id="app">
    <header>
      <div class="container">
        <img src="./assets/logo.png" alt="logo" class="logo" />
        <h1>Quiz Generator</h1>
      </div>
    </header>
    <StartScreen
      :errorMessage="errorMessage"
      v-if="status == 'start'"
      @start-quiz="startQuiz"
    />
    <Loader v-if="status == 'loading'" />
    <Quiz
      @end-quiz="status = 'finished'"
      @store-answer="storeAnwer"
      :questions="questions.results"
      v-if="status == 'ready'"
    />
    <Result
      v-if="status == 'finished'"
      @restart-quiz="restartQuiz"
      :userAnswers="userAnswers"
    />
  </div>
</template>
