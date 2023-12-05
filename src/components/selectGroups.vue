<template>
  <form id="menu-page-disabler" class="timetable__settings__course__select">
    <course-switch
      :course="1"
      @changeCourse="changeCourse"
      :isSelected="props.course === 1"
    ></course-switch>
    <course-switch
      :course="2"
      @changeCourse="changeCourse"
      :isSelected="props.course === 2"
    ></course-switch>
    <course-switch
      :course="3"
      @changeCourse="changeCourse"
      :isSelected="props.course === 3"
    ></course-switch>
    <course-switch
      :course="4"
      @changeCourse="changeCourse"
      :isSelected="props.course === 4"
    ></course-switch>
    <course-switch
      :course="5"
      @changeCourse="changeCourse"
      :isSelected="props.course === 5"
    ></course-switch>
  </form>
  <div id="menu-page-disabler" class="timetable__settings__item">
    <h1>
      Выберите группу
      <label
        id="groupe-select-list"
        :class="{ 'groupe-select-list-full': true }"
        class="groupe__select__list"
        @click="isFull = !isFull"
        ><img src="/img/arrow.svg" alt=""
      /></label>
    </h1>
    <div
      id="group-list"
      class="group__list"
      :class="{ 'groupe-list-full': true }"
    >
      <div
        v-if="!props.isLoading"
        v-for="group in getForCourse(props.groups, props.course)"
        :key="group.id"
      >
        <label v-if="!props.selectedGroups.includes(group.id)" @click="changeGroup(group.id)">{{ group.name }}</label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import courseSwitch from "../components/courseSwitch.vue";

const emit = defineEmits(["changeCourse"]);
const props = defineProps({
  course: Number,
  groups: Array,
  isLoading: Boolean,
  selectedGroups: Array,
});

const isFull = ref(true);


const changeCourse = function (course) {
  emit("changeCourse", course);
};

function getForCourse(data, course) {
  let groups = [];
  for (let courses of data) {
    if (courses.course === course) {
      groups = courses.groups;
    }
  }
  return groups;
}

function changeGroup(group) {
  emit("changeGroup", group);
}

console.log(props.groups);
</script>

<style scoped>
.groupe__list {
  display: none;
  flex-grow: 0;
  transition: all 0.2s ease;
}
.groupe-list-full {
  display: flex;
  flex-grow: 1;
  transition: all 0.2s ease;
}

.groupe__select__list {
  transition: flex-grow 0.2s ease;
}
.groupe-select-list-full {
  transition: all 0.2s;
  rotate: -90deg;
}

.timetable__settings__item {
  transition: all 0.2s;
}
</style>
