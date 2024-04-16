import { useState } from "react";
import { Alert, Button, StyleSheet, Text, View, TextInput } from "react-native";

function BadgerRegisterScreen(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>Join BadgerChat!</Text>
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
        <Text>Confirm Password</Text>
        <TextInput
            style={styles.input}
            secureTextEntry={true}
            value={repeatPassword}
            onChangeText={setRepeatPassword}
            autoCapitalize="none"
        />
        <Button color="crimson" title="Signup" onPress={() => {
            if (password === "") {
                Alert.alert("Please enter a password")
            } else if (password !== repeatPassword) {
                Alert.alert("Passwords do not match")
            } else {
                props.handleSignup(username, password);
            }  
        }} />
        <Button color="grey" title="Nevermind!" onPress={() => props.setIsRegistering(false)} />
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

export default BadgerRegisterScreen;