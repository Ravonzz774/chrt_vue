<script setup>
import { onMounted, ref } from "vue";
import "../assets/css/timetable-settings-style.css";
import courseSwitch from "../components/courseSwitch.vue";
import searchTeachersForm from "../components/searchTeachersForm.vue";
import selectGroups from "../components/selectGroups.vue";
import toServer from "../toServer";

const checkboxState = ref("Student");
const currentCourse = ref(1);
const isLoading = ref(true);
const groupIdsAndNames = ref();
const timetable = ref();
const groupsForCurrentCourse = ref();

const selectedGroups = ref([]);

const changeCourse = function (course) {
  currentCourse.value = course;
};

const checkboxStateToStudent = function () {
  checkboxState.value = "Student";
};

const checkboxStateToTeacher = function () {
  checkboxState.value = "Teacher";
};

const get_timetable = async function () {
  const temp = await toServer.timetable;
  return temp;
};

function getGroupIdsAndNames(data) {
  let courses = [];
  let i = 0;
  for (let course of data) {
    courses.push({
      course: course.course,
      groups: [],
    });
    for (let group of course.groups) {
      courses[i].groups.push({
        id: group.id,
        name: group.name,
      });
    }
    i += 1;
  }

  return courses;
}

function getForCourse(data, course) {
  let groups = [];
  for (let courses of data) {
    if (courses.course === course) {
      groups = courses.groups;
    }
  }
  return groups;
}

function selectGroup(group) {
  selectedGroups.value.push(group);
  console.log(group);
}

onMounted(() => {
  get_timetable()
    .then((temp) => {
      timetable.value = temp;
      groupIdsAndNames.value = getGroupIdsAndNames(timetable.value);
      groupsForCurrentCourse.value = getForCourse(
        groupIdsAndNames.value,
        currentCourse.value
      );
      console.log(timetable.value);
      isLoading.value = false;
    })
    .catch((error) => {
      console.log(error);
    });
});

// console.log(groupIdsAndNames.value);
</script>

<template>
  <div class="loading" v-if="isLoading"><p>Загрузка</p></div>
  <div class="timetable__settings">
    <div class="nav__panel container">
      <button
        id="burger"
        onclick="open('index.html', '_self', false); window.close() "
      >
        <img src="/img/arrow.svg" alt="" />
      </button>
      <h1>Расписание</h1>
      <button onclick="">
        <img src="/img/settings-icon.svg" alt="" />
      </button>
    </div>
    <h3>Настройки</h3>
    <div class="timetable__settings__block container">
      <form class="timetable__settings__type__select" action="">
        <input
          type="radio"
          name="timetable-settings-btn"
          id="timetable-settings-student-btn"
          @click="checkboxStateToStudent()"
        />
        <label
          for="timetable-settings-student-btn"
          :class="{ 'active-users': checkboxState === 'Student' }"
          >Студент</label
        >
        <input
          type="radio"
          name="timetable-settings-btn"
          id="timetable-settings-teacher-btn"
          @click="checkboxStateToTeacher()"
        />
        <label
          for="timetable-settings-teacher-btn"
          :class="{ 'active-users': checkboxState === 'Teacher' }"
          >Преподаватель</label
        >
      </form>

      <search-teachers-form v-show="checkboxState === 'Teacher'" />
      <selectGroups
        @changeCourse="changeCourse"
        @changeGroup="selectGroup"
        :course="currentCourse"
        :groups="groupIdsAndNames"
        :isLoading="isLoading"
        :currentGroups="selectedGroups"
        v-show="checkboxState === 'Student'"
      ></selectGroups>
    </div>
  </div>
</template>

<style scoped>
.active-users {
  background: rgb(77, 76, 76);
}
</style>
