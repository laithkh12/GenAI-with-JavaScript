<script setup>
import { ref } from "vue";
const emit = defineEmits(["start-quiz"]);
const props = defineProps(["errorMessage"]);
const topic = ref("");
</script>

<template>
  <section class="start-screen container">
    <h2>Choose a topic to start with</h2>
    <input v-model="topic" type="text" placeholder="Enter your topic.." />
    <button @click="emit('start-quiz', topic)" :disabled="!topic">
      Start Quiz
    </button>
    <small class="error" v-if="errorMessage"
      >There was an error, please try again later</small
    >
  </section>
</template>
