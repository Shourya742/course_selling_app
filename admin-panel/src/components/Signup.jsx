/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Card, TextField, Button } from "@mui/material";
import { BASE_URL } from "../config";
import { userState } from "../store/atoms/user";
import axios from "axios";
import { useSetRecoilState } from "recoil";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  return (
    <>
      <div
        style={{
          display: "flex",
          paddingTop: 150,
          marginBottom: 10,
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">Welcome to Coursera. Sign up below</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card variant="outlined" style={{ width: 400, padding: 20 }}>
          <TextField
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            fullWidth={true}
            label="Email"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            fullWidth={true}
            label="Password"
            type="password"
            variant="outlined"
          />
          <br />
          <br />
          <Button
            size={"large"}
            variant="contained"
            onClick={async () => {
              const response = await axios.post(`${BASE_URL}/admin/signup`, {
                username: email,
                password: password,
              });
              let data = response.data;
              localStorage.setItem("token", data.token);
              setUser({ userEmail: email, isLoading: false });
              navigate("/courses");
            }}
          >
            Signup
          </Button>
        </Card>
      </div>
    </>
  );
};

export default Signup;
