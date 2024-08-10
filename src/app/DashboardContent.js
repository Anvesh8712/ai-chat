// "use client";

// import {
//   Box,
//   Button,
//   Stack,
//   TextField,
//   Paper,
//   Typography,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   CircularProgress,
// } from "@mui/material";
// import React, { useState, useEffect, useRef } from "react";
// import { useAuth } from "../app/Authcontext";

// export default function DashboardContent({ user, onLogout }) {
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
//   const [isSaveChatModalOpen, setIsSaveChatModalOpen] = useState(false);
//   const [isClearChatModalOpen, setIsClearChatModalOpen] = useState(false);
//   const [isSystemPromptModalOpen, setIsSystemPromptModalOpen] = useState(false);
//   const [chatName, setChatName] = useState("");
//   const [savedChats, setSavedChats] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const bottomRef = useRef(null);

//   useEffect(() => {
//     if (bottomRef.current) {
//       bottomRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   useEffect(() => {
//     // Fetch saved chats from the API
//     const fetchChats = async () => {
//       const response = await fetch(`/api/getChats?userId=${user.uid}`);
//       if (response.ok) {
//         const data = await response.json();
//         setSavedChats(data);
//       } else {
//         console.error("Failed to fetch saved chats");
//       }
//     };

//     fetchChats();
//   }, [user]);

//   const sendMessage = async () => {
//     const newMessage = { role: "user", content: message };
//     setMessages((messages) => [...messages, newMessage]);
//     setMessage("");
//     setLoading(true);
//     const response = await fetch("/api/chat", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         messages: [...messages, newMessage],
//         systemPrompt,
//       }),
//     });
//     const data = await response.json();
//     const assistantMessage = { role: "assistant", content: data.message };
//     setMessages((messages) => [...messages, assistantMessage]);
//     setLoading(false);
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
//     setIdea("");
//     setIsSystemPromptModalOpen(false);
//   };

//   const handleSaveChat = () => {
//     setIsSaveChatModalOpen(true);
//   };

//   const handleSaveChatClose = () => {
//     setIsSaveChatModalOpen(false);
//   };

//   const handleSaveChatConfirm = async () => {
//     if (chatName.trim() === "" || messages.length === 0) return;

//     const response = await fetch("/api/saveChat", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         userId: user.uid,
//         chatName: chatName,
//         messages: messages,
//       }),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       console.log("Chat saved successfully:", data.chatId);
//       setSavedChats([...savedChats, { id: data.chatId, chatName, messages }]);
//     } else {
//       console.error("Failed to save chat:", data.error);
//     }

//     setChatName("");
//     setIsSaveChatModalOpen(false);
//   };

//   const handleClearChat = () => {
//     setIsClearChatModalOpen(true);
//   };

//   const handleClearChatClose = () => {
//     setIsClearChatModalOpen(false);
//   };

//   const handleClearChatConfirm = () => {
//     // Keep the first message and clear the rest
//     setMessages((messages) => [messages[0]]);
//     setIsClearChatModalOpen(false);
//   };

//   const handleNewChat = () => {
//     handleClearChatConfirm(); // Clears the chat
//   };

//   const handleSelectChat = (chat) => {
//     setMessages(chat.messages); // Load the selected chat's messages
//   };

//   const handleSystemPromptModalOpen = () => {
//     setIsSystemPromptModalOpen(true);
//   };

//   const handleSystemPromptModalClose = () => {
//     setIsSystemPromptModalOpen(false);
//   };

//   return (
//     <Box width="100vw" height="100vh" display="flex">
//       {/* Sidebar for Saved Chats */}
//       <Drawer
//         variant="permanent"
//         anchor="left"
//         sx={{
//           width: 240,
//           flexShrink: 0,
//           [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
//         }}
//       >
//         <Box p={2}>
//           <Button
//             variant="contained"
//             sx={{ bgcolor: "#004385", color: "white" }}
//             fullWidth
//             onClick={handleNewChat}
//           >
//             New Chat
//           </Button>
//         </Box>
//         <Typography variant="h6" p={2}>
//           Saved Chats
//         </Typography>
//         <List>
//           {savedChats.length > 0 ? (
//             savedChats.map((chat) => (
//               <ListItem
//                 button
//                 key={chat.id}
//                 onClick={() => handleSelectChat(chat)}
//               >
//                 <ListItemText primary={chat.chatName} />
//               </ListItem>
//             ))
//           ) : (
//             <Typography variant="body2" p={2}>
//               No saved chats. Start a conversation and save it.
//             </Typography>
//           )}
//         </List>
//       </Drawer>

//       <Box
//         flexGrow={1}
//         display="flex"
//         flexDirection="column"
//         p={2}
//         bgcolor="#f0f0f0"
//       >
//         <Box
//           width="100%"
//           display="flex"
//           justifyContent="space-between"
//           alignItems="center"
//           bgcolor="#031a6b"
//           color="white"
//           p={2}
//           boxShadow={3}
//           mb={2}
//         >
//           <Typography variant="h6">Welcome, {user.displayName}</Typography>
//           <Button
//             variant="contained"
//             sx={{ bgcolor: "#05b2dc", color: "white" }}
//             onClick={onLogout}
//           >
//             Logout
//           </Button>
//         </Box>
//         <Box
//           flexGrow={1}
//           display="flex"
//           justifyContent="center"
//           alignItems="center"
//         >
//           <Stack
//             direction="column"
//             width="100%"
//             height="100%"
//             maxWidth="900px"
//             border="1px solid #ccc"
//             borderRadius="8px"
//             bgcolor="white"
//             p={2}
//             boxShadow={3}
//             overflow="auto"
//           >
//             <Stack direction="column" spacing={2} flexGrow={1}>
//               {messages.map((message, index) => (
//                 <Box
//                   key={index}
//                   display="flex"
//                   justifyContent={
//                     message.role === "assistant" ? "flex-start" : "flex-end"
//                   }
//                 >
//                   <Paper
//                     elevation={3}
//                     sx={{
//                       bgcolor:
//                         message.role === "assistant" ? "#033860" : "#087ca7",
//                       color: "white",
//                       borderRadius: 2,
//                       p: 2,
//                       maxWidth: "70%",
//                     }}
//                   >
//                     <Typography>{message.content}</Typography>
//                   </Paper>
//                 </Box>
//               ))}
//               {loading && (
//                 <Box display="flex" justifyContent="flex-start">
//                   <Paper
//                     elevation={3}
//                     sx={{
//                       bgcolor: "#033860",
//                       color: "white",
//                       borderRadius: 2,
//                       p: 2,
//                       maxWidth: "70%",
//                       display: "flex",
//                       alignItems: "center",
//                     }}
//                   >
//                     <CircularProgress size={20} sx={{ mr: 2 }} />
//                     <Typography>Loading...</Typography>
//                   </Paper>
//                 </Box>
//               )}
//               <Box ref={bottomRef} />
//             </Stack>
//             <Stack direction="row" spacing={2} width="100%" mt={2}>
//               <TextField
//                 label="Message"
//                 fullWidth
//                 variant="outlined"
//                 value={message}
//                 onChange={(e) => {
//                   setMessage(e.target.value);
//                 }}
//               />
//               <Button
//                 variant="contained"
//                 sx={{ bgcolor: "#004385", color: "white" }}
//                 onClick={sendMessage}
//               >
//                 Send
//               </Button>
//             </Stack>
//             <Stack direction="row" spacing={2} width="100%" mt={2}>
//               <Button
//                 variant="contained"
//                 sx={{ bgcolor: "#05b2dc", color: "white" }}
//                 onClick={handleSystemPromptModalOpen}
//                 fullWidth
//               >
//                 Update System Prompt
//               </Button>
//               <Button
//                 variant="contained"
//                 sx={{ bgcolor: "#033860", color: "white" }}
//                 onClick={handleSaveChat}
//                 fullWidth
//               >
//                 Save Chat
//               </Button>
//               <Button
//                 variant="contained"
//                 sx={{ bgcolor: "#087ca7", color: "white" }}
//                 onClick={handleClearChat}
//                 fullWidth
//               >
//                 Clear Chat
//               </Button>
//             </Stack>
//           </Stack>
//         </Box>

//         {/* Save Chat Modal */}
//         <Dialog open={isSaveChatModalOpen} onClose={handleSaveChatClose}>
//           <DialogTitle>Save Chat</DialogTitle>
//           <DialogContent>
//             <TextField
//               autoFocus
//               margin="dense"
//               label="Chat Name"
//               fullWidth
//               variant="outlined"
//               value={chatName}
//               onChange={(e) => setChatName(e.target.value)}
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleSaveChatClose} sx={{ color: "#031a6b" }}>
//               Cancel
//             </Button>
//             <Button onClick={handleSaveChatConfirm} sx={{ color: "#031a6b" }}>
//               Save
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Clear Chat Confirmation Modal */}
//         <Dialog open={isClearChatModalOpen} onClose={handleClearChatClose}>
//           <DialogTitle>Clear Chat</DialogTitle>
//           <DialogContent>
//             <Typography>
//               Are you sure you want to clear the chat? This action cannot be
//               undone.
//             </Typography>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleClearChatClose} sx={{ color: "#031a6b" }}>
//               Cancel
//             </Button>
//             <Button onClick={handleClearChatConfirm} sx={{ color: "#031a6b" }}>
//               Clear
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* System Prompt Update Modal */}
//         <Dialog
//           open={isSystemPromptModalOpen}
//           onClose={handleSystemPromptModalClose}
//         >
//           <DialogTitle>Update System Prompt</DialogTitle>
//           <DialogContent>
//             <TextField
//               autoFocus
//               margin="dense"
//               label="Enter your idea for the service chatbot"
//               fullWidth
//               variant="outlined"
//               value={idea}
//               onChange={(e) => setIdea(e.target.value)}
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button
//               onClick={handleSystemPromptModalClose}
//               sx={{ color: "#031a6b" }}
//             >
//               Cancel
//             </Button>
//             <Button onClick={updateSystemPrompt} sx={{ color: "#031a6b" }}>
//               Update
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//     </Box>
//   );
// }

"use client";

import {
  Box,
  Button,
  Stack,
  TextField,
  Paper,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../app/Authcontext";

export default function DashboardContent({ user, onLogout }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Talk to your idea's personal service chatbot below! default: FitnessOne - fitness app",
    },
  ]);
  const [message, setMessage] = useState("");
  const [idea, setIdea] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [isSaveChatModalOpen, setIsSaveChatModalOpen] = useState(false);
  const [isClearChatModalOpen, setIsClearChatModalOpen] = useState(false);
  const [isSystemPromptModalOpen, setIsSystemPromptModalOpen] = useState(false);
  const [chatName, setChatName] = useState("");
  const [savedChats, setSavedChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
    console.log(messages);
  }, [messages]);

  useEffect(() => {
    // Fetch saved chats from the API
    const fetchChats = async () => {
      const response = await fetch(`/api/getChats?userId=${user.uid}`);
      if (response.ok) {
        const data = await response.json();
        setSavedChats(data);
      } else {
        console.error("Failed to fetch saved chats");
      }
    };

    fetchChats();
  }, [user]);

  const sendMessage = async () => {
    const newMessage = { role: "user", content: message };
    setMessages((messages) => [...messages, newMessage]);
    setMessage("");
    setLoading(true);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [...messages, newMessage],
        systemPrompt,
      }),
    });

    const data = await response.json();
    const assistantMessage = { role: "assistant", content: "" };

    // Start printing the message with animation
    setMessages((messages) => [...messages, assistantMessage]);
    printMessage(assistantMessage, data.message);
    setLoading(false);
  };

  const printMessage = (message, fullContent) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullContent.length) {
        setMessages((messages) => {
          const updatedMessages = [...messages];
          const lastMessage = updatedMessages[updatedMessages.length - 1];
          updatedMessages[updatedMessages.length - 1] = {
            ...lastMessage,
            content: fullContent.slice(0, index + 1),
          };
          return updatedMessages;
        });
        index++;
      } else {
        clearInterval(interval);
      }
    }, 3);
  };

  const updateSystemPrompt = async () => {
    const response = await fetch("/api/update-prompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idea }),
    });
    const data = await response.json();
    setSystemPrompt(data.newSystemPrompt);
    setMessages([
      {
        role: "assistant",
        content:
          "Talk to your idea's personal service chatbot below! default: FitnessOne - fitness app",
      },
    ]);
    setIdea("");
    setIsSystemPromptModalOpen(false);
  };

  const handleSaveChat = () => {
    setIsSaveChatModalOpen(true);
  };

  const handleSaveChatClose = () => {
    setIsSaveChatModalOpen(false);
  };

  const handleSaveChatConfirm = async () => {
    if (chatName.trim() === "" || messages.length === 0) return;

    const response = await fetch("/api/saveChat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.uid,
        chatName: chatName,
        messages: messages,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Chat saved successfully:", data.chatId);
      setSavedChats([...savedChats, { id: data.chatId, chatName, messages }]);
    } else {
      console.error("Failed to save chat:", data.error);
    }

    setChatName("");
    setIsSaveChatModalOpen(false);
  };

  const handleClearChat = () => {
    setIsClearChatModalOpen(true);
  };

  const handleClearChatClose = () => {
    setIsClearChatModalOpen(false);
  };

  const handleClearChatConfirm = () => {
    // Keep the first message and clear the rest
    setMessages((messages) => [messages[0]]);
    setIsClearChatModalOpen(false);
  };

  const handleNewChat = () => {
    handleClearChatConfirm(); // Clears the chat
  };

  const handleSelectChat = (chat) => {
    setMessages(chat.messages); // Load the selected chat's messages
  };

  const handleSystemPromptModalOpen = () => {
    setIsSystemPromptModalOpen(true);
  };

  const handleSystemPromptModalClose = () => {
    setIsSystemPromptModalOpen(false);
  };

  const interpretText = (text) => {
    // Replace bold, italic, and other markdown-like syntax with appropriate HTML tags
    let interpretedText = text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold
      .replace(/\*(.*?)\*/g, "<em>$1</em>") // Italic
      .replace(/`(.*?)`/g, "<code>$1</code>") // Inline code
      .replace(/\|/g, "<br/>") // Replace | with line breaks for simplicity
      .replace(/(?:\r\n|\r|\n)/g, "<br />"); // Newlines to <br />

    return { __html: interpretedText };
  };

  return (
    <Box width="100vw" height="100vh" display="flex">
      {/* Sidebar for Saved Chats */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            bgcolor="#031a6b"
            color="white"
            p={2}
          >
            <Typography variant="h6">Welcome, {user.displayName}</Typography>
          </Box>
          <Typography variant="h6" p={2}>
            Saved Chats
          </Typography>
          <List>
            {savedChats.length > 0 ? (
              savedChats.map((chat) => (
                <React.Fragment key={chat.id}>
                  <ListItem button onClick={() => handleSelectChat(chat)}>
                    <ListItemText primary={chat.chatName} />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))
            ) : (
              <Typography variant="body2" p={2}>
                No saved chats. Start a conversation and save it.
              </Typography>
            )}
          </List>
        </Box>
        <Box p={2}>
          <Button
            variant="contained"
            sx={{ bgcolor: "#004385", color: "white" }}
            fullWidth
            onClick={handleNewChat}
          >
            New Chat
          </Button>
        </Box>
      </Drawer>

      <Box
        flexGrow={1}
        display="flex"
        flexDirection="column"
        p={2}
        bgcolor="#f0f0f0"
      >
        <Box
          flexGrow={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Stack
            direction="column"
            width="100%"
            height="100%"
            maxWidth="900px"
            border="1px solid #ccc"
            borderRadius="8px"
            bgcolor="white"
            p={2}
            boxShadow={3}
            overflow="auto"
          >
            <Stack direction="column" spacing={2} flexGrow={1}>
              {messages.map((message, index) => (
                <Box
                  key={index}
                  display="flex"
                  justifyContent={
                    message.role === "assistant" ? "flex-start" : "flex-end"
                  }
                >
                  <Paper
                    elevation={3}
                    sx={{
                      bgcolor:
                        message.role === "assistant" ? "#033860" : "#087ca7",
                      color: "white",
                      borderRadius: 2,
                      p: 2,
                      maxWidth: "70%",
                    }}
                  >
                    <Typography
                      dangerouslySetInnerHTML={interpretText(message.content)}
                    ></Typography>
                  </Paper>
                </Box>
              ))}
              {loading && (
                <Box display="flex" justifyContent="flex-start">
                  <Paper
                    elevation={3}
                    sx={{
                      bgcolor: "#033860",
                      color: "white",
                      borderRadius: 2,
                      p: 2,
                      maxWidth: "70%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress size={20} sx={{ mr: 2 }} />
                    <Typography>Loading...</Typography>
                  </Paper>
                </Box>
              )}
              <Box ref={bottomRef} />
            </Stack>
            <Stack direction="row" spacing={2} width="100%" mt={2}>
              <TextField
                label="Message"
                fullWidth
                variant="outlined"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
              <Button
                variant="contained"
                sx={{ bgcolor: "#004385", color: "white" }}
                onClick={sendMessage}
              >
                Send
              </Button>
            </Stack>
            <Stack direction="row" spacing={2} width="100%" mt={2}>
              <Button
                variant="contained"
                sx={{ bgcolor: "#05b2dc", color: "white" }}
                onClick={handleSystemPromptModalOpen}
                fullWidth
              >
                Update System Prompt
              </Button>
              <Button
                variant="contained"
                sx={{ bgcolor: "#033860", color: "white" }}
                onClick={handleSaveChat}
                fullWidth
              >
                Save Chat
              </Button>
              <Button
                variant="contained"
                sx={{ bgcolor: "#087ca7", color: "white" }}
                onClick={handleClearChat}
                fullWidth
              >
                Clear Chat
              </Button>
            </Stack>
          </Stack>
        </Box>

        {/* Save Chat Modal */}
        <Dialog open={isSaveChatModalOpen} onClose={handleSaveChatClose}>
          <DialogTitle>Save Chat</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Chat Name"
              fullWidth
              variant="outlined"
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSaveChatClose} sx={{ color: "#031a6b" }}>
              Cancel
            </Button>
            <Button onClick={handleSaveChatConfirm} sx={{ color: "#031a6b" }}>
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Clear Chat Confirmation Modal */}
        <Dialog open={isClearChatModalOpen} onClose={handleClearChatClose}>
          <DialogTitle>Clear Chat</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to clear the chat? This action cannot be
              undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClearChatClose} sx={{ color: "#031a6b" }}>
              Cancel
            </Button>
            <Button onClick={handleClearChatConfirm} sx={{ color: "#031a6b" }}>
              Clear
            </Button>
          </DialogActions>
        </Dialog>

        {/* System Prompt Update Modal */}
        <Dialog
          open={isSystemPromptModalOpen}
          onClose={handleSystemPromptModalClose}
        >
          <DialogTitle>Update System Prompt</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Enter your idea for the service chatbot"
              fullWidth
              variant="outlined"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleSystemPromptModalClose}
              sx={{ color: "#031a6b" }}
            >
              Cancel
            </Button>
            <Button onClick={updateSystemPrompt} sx={{ color: "#031a6b" }}>
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
