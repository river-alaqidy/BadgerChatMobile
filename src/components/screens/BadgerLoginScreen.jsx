import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, View, TextInput } from "react-native";

function BadgerLoginScreen(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const asGuest = () => {
        props.isGuest();
    }

    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>BadgerChat Login</Text>
        <Text style={{marginTop: 20}}>Username</Text>
        <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        />
        <Text>Password</Text>
        <TextInput
        style={styles.input}
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        />
        <Button color="crimson" title="Login" onPress={() => {
            props.handleLogin(username, password)
        }} />
        <Text style={{marginTop:8, marginBottom:8}}>New Here?</Text>
        <View style={{flexDirection: "row"}}>
            <Button color="grey" title="Signup" onPress={() => props.setIsRegistering(true)} />
            <Button color="grey" title="Continue As Guest" onPress={() => asGuest()}/>
        </View>
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }, 
    input: { // this styling was used from React Native's TextInput documentation page
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      }
});

export default BadgerLoginScreen;