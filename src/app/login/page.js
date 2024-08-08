"use client";

import { useEffect } from "react";
import { useAuth } from "../Authcontext";
import { useRouter } from "next/navigation";
import { Box, Button, Typography } from "@mui/material";

export default function Login() {
  const { user, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error("Failed to sign in with Google:", error);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100vw"
      height="100vh"
    >
      <Typography variant="h4" mb={2}>
        Login with Google
      </Typography>
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Sign in with Google
      </Button>
    </Box>
  );
}
