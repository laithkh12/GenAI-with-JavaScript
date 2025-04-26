<script setup>
const props = defineProps(["questions"]);
const emit = defineEmits(["store-answer", "end-quiz"]);
import { ref, computed } from "vue";
const currentQuestion = ref(0);
const selectedOption = ref(null);
const shuffledOptions = computed(() => {
  const options = [
    ...props.questions[currentQuestion.value].incorrect_answers,
    props.questions[currentQuestion.value].correct_answer,
  ];
  // Shuffle the options
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
});

const submitAnswer = () => {
  emit("store-answer", {
    question: props.questions[currentQuestion.value],
    userAnswer: selectedOption.value,
  });
  selectedOption.value = null;
  if (currentQuestion.value === props.questions.length - 1) {
    currentQuestion.value = 0;
    emit("end-quiz");
  } else {
    currentQuestion.value += 1;
  }
};
</script>

<template>
  <section class="quiz container">
    <div class="header">
      <h2>Quiz</h2>
      <p>Question {{ currentQuestion + 1 }} of {{ props.questions.length }}</p>
    </div>
    <progress
      max="100"
      :value="((currentQuestion + 1) / props.questions.length) * 100"
    ></progress>
    <div class="question">
      <h3>
        {{ props.questions[currentQuestion].question }}
      </h3>
    </div>
    <div class="answers">
      <button
        class="answer"
        :class="{ active: answer === selectedOption }"
        v-for="answer in shuffledOptions"
        :key="answer"
        @click="selectedOption = answer"
      >
        {{ answer }}
      </button>
    </div>
    <button v-if="selectedOption" @click="submitAnswer">Send</button>
  </section>
</template>
