// "use client";

// import {
//   Box,
//   Button,
//   Stack,
//   TextField,
//   Paper,
//   Typography,
// } from "@mui/material";

// import React from "react";
// import { useState, useEffect, useRef } from "react";

// export default function Home() {
//   const [messages, setMessages] = useState([
//     {
//       role: "assistant",
//       content:
//         "Talk to your idea's personal service chatbot below! default: FitnessOne - fitness app",
//     },
//   ]);

//   const [message, setMessage] = useState("");
//   const [idea, setIdea] = useState("");
//   const [systemPrompt, setSystemPrompt] = useState("");
//   const bottomRef = useRef(null);

//   useEffect(() => {
//     if (bottomRef.current) {
//       bottomRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   const sendMessage = async () => {
//     setMessages((messages) => [
//       ...messages,
//       { role: "user", content: message },
//     ]);
//     setMessage("");
//     const response = await fetch("/api/chat", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         messages: [...messages, { role: "user", content: message }],
//         systemPrompt,
//       }),
//     });
//     const data = await response.json();
//     setMessages((messages) => [
//       ...messages,
//       { role: "assistant", content: data.message },
//     ]);
//   };

//   const updateSystemPrompt = async () => {
//     const response = await fetch("/api/update-prompt", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ idea }),
//     });
//     const data = await response.json();
//     setSystemPrompt(data.newSystemPrompt);
//     setMessages([
//       {
//         role: "assistant",
//         content:
//           "Talk to your idea's personal service chatbot below! default: FitnessOne - fitness app",
//       },
//     ]);
//   };

//   return (
//     <Box
//       width="100vw"
//       height="100vh"
//       display="flex"
//       flexDirection="column"
//       justifyContent="center"
//       alignItems="center"
//       bgcolor="#f0f0f0"
//       p={2}
//     >
//       <Stack
//         direction="column"
//         width="500px"
//         height="70vh"
//         border="1px solid #ccc"
//         borderRadius="8px"
//         bgcolor="white"
//         p={2}
//         boxShadow={3}
//         overflow="auto"
//       >
//         <Stack direction="column" spacing={2}>
//           {messages.map((message, index) => (
//             <Box
//               key={index}
//               display="flex"
//               justifyContent={
//                 message.role === "assistant" ? "flex-start" : "flex-end"
//               }
//             >
//               <Paper
//                 elevation={3}
//                 sx={{
//                   bgcolor:
//                     message.role === "assistant"
//                       ? "primary.main"
//                       : "secondary.main",
//                   color: "white",
//                   borderRadius: 2,
//                   p: 2,
//                   maxWidth: "70%",
//                 }}
//               >
//                 <Typography>{message.content}</Typography>
//               </Paper>
//             </Box>
//           ))}
//           <Box ref={bottomRef} />
//         </Stack>
//       </Stack>
//       <Stack direction="row" spacing={2} width="500px" mt={2}>
//         <TextField
//           label="Message"
//           fullWidth
//           variant="outlined"
//           value={message}
//           onChange={(e) => {
//             setMessage(e.target.value);
//           }}
//         />
//         <Button variant="contained" color="primary" onClick={sendMessage}>
//           Send
//         </Button>
//       </Stack>
//       <Stack direction="column" spacing={2} width="500px" mt={2}>
//         <TextField
//           label="Enter your idea for the service chatbot"
//           fullWidth
//           variant="outlined"
//           value={idea}
//           onChange={(e) => {
//             setIdea(e.target.value);
//           }}
//         />
//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={updateSystemPrompt}
//         >
//           Update System Prompt
//         </Button>
//       </Stack>
//     </Box>
//   );
// }

"use client";

import { useRouter } from "next/navigation";
import { Box, Button, Typography } from "@mui/material";

export default function LandingPage() {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100vw"
      height="100vh"
      bgcolor="#f0f0f0"
      p={2}
    >
      <Typography variant="h3" mb={4}>
        Welcome to Your Service Chatbot
      </Typography>
      <Typography variant="h5" mb={4}>
        Please log in to continue
      </Typography>
      <Button variant="contained" color="primary" onClick={handleLoginRedirect}>
        Go to Login
      </Button>
    </Box>
  );
}
