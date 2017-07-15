import React from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { enviarMensagem } from './../general/generalActions'

class Chat extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params.contato.username
    })

    state = {
        msg: ''
    }

    componentWillReceiveProps() {
        this._scrollView.scrollToEnd()
        debugger
        //this._scrollView.scrollTo({x: 0, y: 1000000, animated: true})
    }

    renderBalao(msg, i) {
        return (
            <View key={i} style={[styles.balaoChat, msg.sameOrigin ? styles.balaoSameOrigin : styles.balaoContato]}>
                <Text>{msg.text}</Text>
            </View>
        )
    }

    render() {
        const { chats, enviarMensagem, navigation } = this.props
        const contato = navigation.state.params.contato
        const mensagens = chats[contato.id] || []
        return (
            <View style={styles.container}>
                <View style={styles.scrollViewContainer}>
                    <ScrollView ref={comp => this._scrollView = comp} contentContainerStyle={{ paddingBottom: 50 }}>
                        {mensagens.map((msg, i) => this.renderBalao(msg, i))}
                    </ScrollView>
                </View>
                <View style={styles.containerInput}>
                    <TextInput
                        placeholder='Digite'
                        style={styles.inputText}
                        onChangeText={(msg) => this.setState({ msg })}
                        value={this.state.msg}
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    chats: state.general.chats
})
const mapDispatchToProps = dispatch => bindActionCreators({ enviarMensagem }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Chat)



const styles = StyleSheet.create({
    inputText: {
        height: 40, borderColor: 'gray', borderTopLeftRadius: 5, borderTopRightRadius: 5, paddingLeft: 5
    },
    containerInput: {

    },
    scrollViewContainer: {
        flex: 4,
        backgroundColor: '#E5DDD5',
        flexDirection: 'column-reverse'
    },
    container: {
        flex: 1
    },
    balaoChat: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 12,
        marginVertical: 3,
        width: '80%'
    },
    balaoSameOrigin: {
        backgroundColor: '#DCF9C6',
        marginRight: 3
    },
    balaoContato: {
        backgroundColor: '#FFFFFF',
        marginLeft: 3
    }
})