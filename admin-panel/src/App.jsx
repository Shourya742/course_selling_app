/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import Appbar from "./components/Appbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { userState } from "./store/atoms/user";
import { RecoilRoot, useSetRecoilState } from "recoil";
import axios from "axios";
import { BASE_URL } from "./config";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Landing from "./components/Landing";
import AddCourse from "./components/AddCourse";
import Courses from "./components/Courses";
import Course from "./components/Course";
const App = () => {
  return (
    <RecoilRoot>
      <div
        style={{ width: "100vw", height: "100vh", backgroundColor: "#eeeeee" }}
      >
        <Router>
          <Appbar />
          <InitUser />
          <Routes>
            <Route path={"/courses"} element={<Courses />} />
            <Route path={"/addcourse"} element={<AddCourse />} />
            <Route path={"/signin"} element={<Signin />} />
            <Route path={"/signup"} element={<Signup />} />
            <Route path={"/"} element={<Landing />} />
            <Route path={"/course/:courseId"} element={<Course />} />
          </Routes>
        </Router>
      </div>
    </RecoilRoot>
  );
};

const InitUser = () => {
  const setUser = useSetRecoilState(userState);
  const init = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/me`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.data.username) {
        setUser({
          isLoading: false,
          userEmail: response.data.username,
        });
      } else {
        setUser({ isLoading: false, userEmail: null });
      }
    } catch (error) {
      setUser({
        isLoading: false,
        userEmail: null,
      });
    }
  };
  useEffect(() => {
    init();
  }, []);
  return <></>;
};

export default App;
