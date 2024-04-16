import { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Button, Modal, TextInput, Alert } from "react-native";
import BadgerChatMessage from "../helper/BadgerChatMessage";
import * as SecureStore from 'expo-secure-store';

function BadgerChatroomScreen(props) {

    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [postTitle, setPostTitle] = useState("");
    const [postBody, setPostBody] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [token, setToken] = useState("");
    const [user, setUser] = useState("");

    const handleDelete = (id) => {
        fetch(`https://cs571.org/api/s24/hw9/messages?id=${id}`, {
            method: "DELETE",
            headers: {
                "X-CS571-ID": "bid_a6c06f452051e5d64e278142151b3279c2bfa0fb2f7fc1ace03af60504d5df60",
                "Authorization": "Bearer " + token,
            },
        })
        .then(res => {
            if (res.status === 200) {
                return res.json().then(data => {
                    refresh()
                    Alert.alert(data.msg)
                })
            }
        })
    }

    const handleUser = async () => {
        const userID = await SecureStore.getItemAsync("user");
        setUser(userID)
    }

    const handleJWT = async () => {
        const tok = await SecureStore.getItemAsync("jwt");
        setToken(tok);
    }

    const handleCreatePost = () => {
        fetch(`https://cs571.org/api/s24/hw9/messages?chatroom=${props.name}`, {
            method: "POST",
            headers: {
                "X-CS571-ID": "bid_a6c06f452051e5d64e278142151b3279c2bfa0fb2f7fc1ace03af60504d5df60",
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: postTitle,
                content: postBody
            })
        })
        .then(res => {
            if (res.status === 200) {
                return res.json().then(data => {
                refresh()
                Alert.alert(data.msg)
                setModalVisible(modal => !modal)
                });
            } 
        })     
    }

    const addPost = () => {
        setModalVisible(modal => !modal);
    }

    function refresh() {
        setIsLoading(true);
        fetch(`https://cs571.org/api/s24/hw9/messages?chatroom=${props.name}`, {
            headers:{  
                "X-CS571-ID": "bid_a6c06f452051e5d64e278142151b3279c2bfa0fb2f7fc1ace03af60504d5df60",
                "Content-Type": "application/json"
            }
            })
            .then(res => res.json())
            .then(data => {
                setMessages(data.messages)
                setIsLoading(false);
            })
    }

    useEffect(() => {
        fetch(`https://cs571.org/api/s24/hw9/messages?chatroom=${props.name}`, {
        headers:{  
            "X-CS571-ID": "bid_a6c06f452051e5d64e278142151b3279c2bfa0fb2f7fc1ace03af60504d5df60",
            "Content-Type": "application/json"
        }
        })
        .then(res => res.json())
        .then(data => {
            setMessages(data.messages)
            handleUser()
            handleJWT()
        })
    }, [])
    

    return <View style={{ flex: 1 }}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(modal => !modal);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text>Create A Post</Text>
                    <Text>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={postTitle}
                        onChangeText={setPostTitle}
                        autoCapitalize="none"
                        />
                    <Text>Body</Text>
                    <TextInput
                        style={styles.input}
                        value={postBody}
                        onChangeText={setPostBody}
                        autoCapitalize="none"
                    />
                    <View style={{flexDirection:"row"}}>
                        <Button title="CREATE POST" disabled={postTitle === "" || postBody === ""} onPress={handleCreatePost}></Button>
                        <Button title="CANCEL" onPress={() => setModalVisible(modal => !modal)}/>
                    </View>
                </View>
            </View>
        </Modal>
        <FlatList
            data={messages}
            onRefresh={refresh}
            refreshing={isLoading}
            keyExtractor={message => message.id}
            renderItem={message => <BadgerChatMessage user={user} {...message.item} delete={handleDelete}/>}
        />
        { props.guest ? "" :
        <View style={{ padding: 20, backgroundColor:"crimson" }}>
          <Button onPress={addPost} title="ADD POST" color="white"/>
        </View>
        }
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
      input: { // this styling was used from React Native's TextInput documentation page
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    }
});

export default BadgerChatroomScreen;