import React from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput, Dimensions, KeyboardAvoidingView, Button } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Icon } from 'react-native-elements'

import { enviarMensagem } from './../general/generalActions'

class Chat extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => {
        const params = navigation.state.params || {}
        return {
            title: params.contato.username || ''
        }
    }

    state = {
        msg: '',
        height: Dimensions.get('window').height
    }
    
    componentDidMount(){
        console.log('componentDidMount')
        setTimeout(()=>{
            this._scrollView.scrollToEnd()
        },200)
    }
    componentWillReceiveProps() {
        this._scrollView.scrollToEnd()
    }

    renderBalao(msg, i) {
        return (
            <View key={i} style={[styles.balaoChat, msg.sameOrigin ? styles.balaoSameOrigin : styles.balaoContato]}>
                <Text>{msg.text}</Text>
            </View>
        )
    }

    handleEnviarMensagem(){
        const { navigation, enviarMensagem } = this.props
        const contato = navigation.state.params.contato
        const { msg } = this.state
        enviarMensagem({mensagem: msg, destino: contato.id})
        this.setState({msg:''})
    }

    render() {
        const { chats, navigation } = this.props
        const params = navigation.state.params || {}
        const mensagens = chats[params.contato.id || 0] || []
        return (
            <KeyboardAwareScrollView style={styles.container}>
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
                        returnKeyType='send'
                    />
                    <Icon name='send' style={styles.iconSend} onPress={this.handleEnviarMensagem.bind(this)} />
                </View>
            </KeyboardAwareScrollView>
        )
    }
}

const mapStateToProps = state => ({
    chats: state.general.chats
})
const mapDispatchToProps = dispatch => bindActionCreators({ enviarMensagem }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Chat)



const styles = StyleSheet.create({
    iconSend:{
        paddingTop: 5,
        paddingHorizontal:10
        //paddingRight: 2,
    },
    inputText: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        paddingLeft: 5,
        flex: 1
    },
    containerInput: {
        //flex: 1,
        //position: 'absolute',
        //bottom: 0,
        width: '100%',
        height: 40,
        flexDirection: "row"
    },
    scrollViewContainer: {
        flex: 1,
        backgroundColor: '#E5DDD5',
        flexDirection: 'column-reverse',
        height: Dimensions.get('screen').height - 100
    },
    container: {
        //flex: 1,
        //flexDirection:'column'
    },
    balaoChat: {
        //flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 12,
        marginVertical: 3,
        width: '80%'
    },
    balaoSameOrigin: {
        backgroundColor: '#DCF9C6',
        marginRight: 3,
        alignSelf: 'flex-end'
    },
    balaoContato: {
        backgroundColor: '#FFFFFF',
        marginLeft: 3
    }
})