/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { TextField, Card, Typography, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userState } from "../store/atoms/user";
import { useSetRecoilState } from "recoil";
import { BASE_URL } from "../config";
const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  return (
    <div>
      <div
        style={{
          paddingTop: 150,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant={"h6"}>
          Welcome to Coursera. Sign in below
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card variant={"outlined"} style={{ width: 400, padding: 20 }}>
          <TextField
            fullWidth={true}
            label="Email"
            variant="outlined"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />
          <br />
          <TextField
            fullWidth={true}
            label="Password"
            variant="outlined"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <br />
          <Button
            size={"large"}
            variant="contained"
            onClick={async () => {
              const res = await axios.post(
                `${BASE_URL}/admin/login`,
                {},
                {
                  headers: {
                    "Content-Type": "application/json",
                    username: email,
                    password: password,
                  },
                }
              );

              const data = res.data;
              localStorage.setItem("token", data.token);
              setUser({
                userEmail: email,
                isLoading: false,
              });
              navigate("/");
            }}
          >
            Signin
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Signin;
