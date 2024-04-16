import { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import CS571 from '@cs571/mobile-client'
import * as SecureStore from 'expo-secure-store';
import BadgerChatroomScreen from './screens/BadgerChatroomScreen';
import BadgerRegisterScreen from './screens/BadgerRegisterScreen';
import BadgerLoginScreen from './screens/BadgerLoginScreen';
import BadgerLandingScreen from './screens/BadgerLandingScreen';
import { Alert } from 'react-native';
import BadgerLogoutScreen from './screens/BadgerLogoutScreen';
import BadgerConversionScreen from './screens/BadgerConversionScreen';


const ChatDrawer = createDrawerNavigator();

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false);
  const [chatrooms, setChatrooms] = useState([]);
  const [guest, setGuest] = useState(false);

  const handleConvert = () => {
    setIsLoggedIn(false);
    setIsRegistering(true);
    setGuest(false);
  }

  const isGuest = () => {
    setGuest(true);
    setIsLoggedIn(true);
  }

  const logout = () => {
    setIsLoggedIn(false);
    setIsRegistering(false);
  }

  useEffect(() => {
    fetch("https://cs571.org/api/s24/hw9/chatrooms", {
      method: "GET",
      headers: {
        "X-CS571-ID": "bid_a6c06f452051e5d64e278142151b3279c2bfa0fb2f7fc1ace03af60504d5df60",
        "Content-Type": "application/json"
      } 
    }).then(res => res.json())
    .then(data => {
      setChatrooms(data);
    })
  }, []);

  function handleLogin(username, password) {
    fetch("https://cs571.org/api/s24/hw9/login", {
      method: "POST",
      headers: {
        "X-CS571-ID": "bid_a6c06f452051e5d64e278142151b3279c2bfa0fb2f7fc1ace03af60504d5df60",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
    })
    }).then(res => {
      if (res.status === 200) {
        return res.json().then(data => {
          setIsLoggedIn(true); 
          setGuest(false);
          SecureStore.setItemAsync("jwt", data.token);
          SecureStore.setItemAsync("user", data.user.username)
        });
      } else {
        return res.json().then(data => {
          Alert.alert(data.msg)
        })
      }
    })
  }

  function handleSignup(username, password) {
    fetch("https://cs571.org/api/s24/hw9/register", {
      method: "POST",
      headers: {
        "X-CS571-ID": "bid_a6c06f452051e5d64e278142151b3279c2bfa0fb2f7fc1ace03af60504d5df60",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
    })
    }).then(res => {
      if (res.status === 200) {
        return res.json().then(data => {
          setIsLoggedIn(true); 
          setGuest(false);
          SecureStore.setItemAsync("jwt", data.token);
          SecureStore.setItemAsync("user", data.user.username);
        });
      } else {
        return res.json().then(data => {
          Alert.alert(data.msg)
        })
      }
    })
  }

  if (isLoggedIn) {
    return (
      <NavigationContainer>
        <ChatDrawer.Navigator>
          <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
          {
            chatrooms.map(chatroom => {
              return <ChatDrawer.Screen key={chatroom} name={chatroom}>
                {(props) => <BadgerChatroomScreen name={chatroom} guest={guest}/>}
              </ChatDrawer.Screen>
            })
          }
          {guest ? 
          <ChatDrawer.Screen name="Signup">
             {(props) => <BadgerConversionScreen {...props} handleConvert={handleConvert}/>}
          </ChatDrawer.Screen>
          : 
          <ChatDrawer.Screen name="Logout">
            {(props) => <BadgerLogoutScreen {...props} logout={logout}/>}
          </ChatDrawer.Screen>
          }
        </ChatDrawer.Navigator>
      </NavigationContainer>
    );
  } else if (isRegistering) {
    return <BadgerRegisterScreen handleSignup={handleSignup} setIsRegistering={setIsRegistering} />
  } else {
    return <BadgerLoginScreen handleLogin={handleLogin} setIsRegistering={setIsRegistering} isGuest={isGuest}/>
  }
}