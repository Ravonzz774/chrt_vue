<template>
  <input
    type="radio"
    name="timetable-settings-course-btn"
    id="timetable-settings-1st-course-btn"
  />
  <label
    for="timetable-settings-1st-course-btn"
    @click="changeCourse()"
    :class="{ 'active-courses': isSelected }"
    >{{ course }} курс</label
  >
</template>

<script setup>
import { ref } from "vue";
const emit = defineEmits(["changeCourse"]);
const props = defineProps({
  course: {
    type: Number,
    required: true,
  },
  isSelected: {
    type: Boolean,
    required: true,
  },
});

const changeCourse = function () {
  emit("changeCourse", props.course);
};
</script>

<style scoped>
.active-courses {
  color: rgb(255, 255, 255);
}
</style>
