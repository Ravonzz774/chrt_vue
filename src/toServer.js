import axios from "axios";

const base = "http://127.0.0.1:5000/";
const timetable_url = base + "api/timetable";
const timetableNext_url = base + "api/timetable_next";

const requestData = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

const timetable = requestData(timetable_url);
const timetableNext = requestData(timetableNext_url);

export default {
  timetable,
  timetableNext,
};
