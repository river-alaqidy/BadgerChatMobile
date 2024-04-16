import { Text, Button, View } from "react-native";
import BadgerCard from "./BadgerCard"

function BadgerChatMessage(props) {

    const dt = new Date(props.created);

    const deletePost = () => {
        props.delete(props.id);
    }

    return <BadgerCard style={{ marginTop: 16, padding: 8, marginLeft: 8, marginRight: 8 }}>
        <Text style={{fontSize: 28, fontWeight: 600}}>{props.title}</Text>
        <Text style={{fontSize: 12}}>by {props.poster} | Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</Text>
        <Text></Text>
        <Text>{props.content}</Text>
        { 
        props.user === props.poster ? 
        <View style={{ marginTop: 8, backgroundColor:"crimson"}}>
            <Button color="white" title="DELETE POST" onPress={() => deletePost()}></Button>
        </View>
        :
        ""
        }
    </BadgerCard>
}

export default BadgerChatMessage;