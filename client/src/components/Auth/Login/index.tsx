"use client";

import React from "react";

import { Box, Input, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { globalAxios } from "@/utils/axios";
import { setCookie } from "@/utils/cookie";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const Login = () => {
  return (
    <Box
      width="100%"
      height="100%"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <LoginCard />
    </Box>
  );
};

function LoginCard() {
  const [credentials, setCredentials] = React.useState({});

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = () => {
    globalAxios
      .post("login", credentials)
      .then((resp) => {
        toast.success("Logged in successfully");
        router.push("/dashboard");
        setCookie("token", resp.data.token, 1);
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  return (
    <Card sx={{ minWidth: 275, padding: "1rem" }}>
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          marginBottom="2rem"
        >
          <Typography variant="h4" fontWeight="bold">
            Login
          </Typography>
        </Box>
        <Box marginBottom="2rem">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
        </Box>
        <Box marginBottom="1rem">
          <Input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
      </CardActions>
    </Card>
  );
}

export default Login;
