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
import { signInStart,signInSuccess,signInFailure } from './redux/userSlice';
import {  useDispatch } from 'react-redux';
const Login = () => {
const Navigate = useNavigate();
const dispatch = useDispatch();
  const [identity, setidentity] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  
  const handleLogin = async() => {
      try {
          dispatch(signInStart());
          const response  = await axios.post("http://localhost:5000/0auth/login",{identity,password},{ withCredentials:true});
          dispatch(signInSuccess(response.data));
          
    if (response.data.isAuthenticated) {
       Navigate('/profile');
    }
    else{
        setErrorMessage("wrong credentials");
    }
} catch (error) {
    console.log("error from login",error);
    dispatch(signInFailure(error));

}
    }

  

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box width="400px" p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        <FormControl mt={4} isRequired>
          <FormLabel>Email or Username</FormLabel>
          <Input
            type="text"
            placeholder="Enter here..."
            value={identity}
            onChange={(e) => setidentity(e.target.value)}
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
        <Button colorScheme="teal" width="full" mt={4} onClick={handleLogin}>
          Log in
        </Button>
      </Box>
    </Flex>
  );
};

export default Login;
