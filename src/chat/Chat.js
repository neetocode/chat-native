import React from 'react'
import { View, Text, StyleSheet } from 'react-native'


class Chat extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <Text>Chat</Text>
            </View>
        )
    }
}

export default Chat



const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})