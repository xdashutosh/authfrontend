import React from 'react';
import {
  Flex,
  Box,
  Text,
  Button,
  Spacer,
  Avatar,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { signOut } from './redux/userSlice';
const Header = () => {
   const {currentUser} = useSelector((state)=>state.user);
const dispatch = useDispatch();
const handleSignout = ()=>{
dispatch(signOut());
}

  return (
    <Flex p={4} align="center" bg="teal.500">
      <Box>
        <Text fontSize="xl" fontWeight="bold">
          Auth
        </Text>
      </Box>
      <Spacer />
      <Box>
       <Link to="/">
        <Button colorScheme="teal" mr={4}>
          Home
        </Button>
       </Link>
    
    {currentUser?(<><Button colorScheme="teal" mr={4} onClick={handleSignout}>Sign out</Button><Link to="/profile"><Button colorScheme="teal" mr={4} >Profile</Button></Link></>):(<><Link to="/login">
        <Button colorScheme="teal" mr={4}>
          Login
        </Button>
        </Link>
          <Link to="/register">
          <Button colorScheme="teal" mr={4}>
            Signup
          </Button>
          </Link>
        </>
        )}
        
      
      </Box>
      <Spacer />
      <Box>
        {/* Add your avatar image source in the src attribute */}
        <Link to="/profile">
        <Avatar size="sm" name="User" />
        </Link>
      </Box>
    </Flex>
  );
};

export default Header;
