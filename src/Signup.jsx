import React, { useState } from 'react';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const Navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = async() => {
    // Validate email using a simple regex
    try {
        const emailRegex = /^[^\s@]+@gmail\.com$/;
        if (!emailRegex.test(email)) {
          setErrorMessage('Invalid email. Please use a valid @gmail.com address.');
          return;
        }
    
        // Validate password using a regex
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
          setErrorMessage(
            'Invalid password. It must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.'
          );
          return;
        }
    
      const response  = await axios.post("http://localhost:5000/0auth/signup",{username,email,password});
      if(response.data.userCreated){
        setErrorMessage('registered successfully!');
          console.log('registered successful!');
          Navigate('/login')
          setErrorMessage('');

      }
      else{
        setErrorMessage(`${response.data.message}`);
      }
    
    
    
    } catch (error) {
        console.log("error from signup",error);
        setErrorMessage('Username already taken!');

    }
   
  };

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box width="400px" p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
        <Box textAlign="center">
          <Heading>Register</Heading>
        </Box>
        <FormControl mt={4} isRequired>
          <FormLabel>Username</FormLabel>
          <Input 
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl mt={4} isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter your @gmail.com email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl mt={4} isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        {errorMessage && (
          <Text color="red" mt={2} fontSize="sm">
            {errorMessage}
          </Text>
        )}
        <Button colorScheme="teal" width="full" mt={4} onClick={handleSignup}>
          Register
        </Button>
      </Box>
    </Flex>
  );
};

export default Signup;
