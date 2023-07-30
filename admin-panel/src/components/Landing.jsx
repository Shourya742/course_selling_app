/* eslint-disable no-unused-vars */
import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userEmailState } from "../store/selectors/userEmail";
import { isUserLoading } from "../store/selectors/isUserLoading";

const Landing = () => {
  const navigate = useNavigate();
  const userEmail = useRecoilValue(userEmailState);
  const userLoading = useRecoilValue(isUserLoading);
  return (
    <>
      <Grid container style={{ padding: "5vw" }}>
        <Grid item xs={12} md={6} lg={6}>
          <div style={{ marginTop: 100 }}>
            <Typography variant="h2">Coursera Admin</Typography>
            <Typography variant="h5">
              A place to learn, earn and grow
            </Typography>
            {!userLoading && !userEmail && (
              <div style={{ display: "flex", marginTop: 20 }}>
                <div style={{ marginRight: 10 }}>
                  <Button
                    size={"large"}
                    variant="contained"
                    onClick={() => navigate("/signup")}
                  >
                    Signup
                  </Button>
                </div>
                <div>
                  <Button
                    size={"large"}
                    variant="contained"
                    onClick={() => navigate("/signin")}
                  >
                    Signin
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Grid>
        <Grid item xs={12} md={6} lg={6} style={{ marginTop: 20 }}>
          <img
            src={
              "https://raw.githubusercontent.com/100xDevs-hkirat/week-7/master/admin-client/public/class.jpeg"
            }
            width={"100%"}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Landing;
