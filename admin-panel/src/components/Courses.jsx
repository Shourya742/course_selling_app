/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import axios from "axios";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const init = async () => {
    const response = await axios.get(`${BASE_URL}/admin/courses`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setCourses(response.data.courses);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div>
      {courses.map((course, index) => {
        return <h1 key={index}>hello</h1>;
      })}
    </div>
  );
};

export default Courses;
