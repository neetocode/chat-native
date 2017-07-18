import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, AsyncStorage, ScrollView } from 'react-native'
import { FormLabel, FormInput, Button, Icon, FormValidationMessage } from 'react-native-elements'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import axios from 'axios'

import { setToken } from './loginActions'
import { alterIpServer } from './../general/generalActions'

class Login extends React.Component {
    state = {
        login: 'Miguel Neto',
        senha: '1234',
        loginIncorreto: false,
        loading: false,
        error:'',
        errorResume: ''
    }

    async componentDidMount(){
        const ipServer = await AsyncStorage.getItem('ipServer') || ''
        console.log(ipServer)
        this.props.alterIpServer(ipServer)
    }

    alterLogin(login) {
        this.setState({ login })
    }

    alterSenha(senha) {
        this.setState({ senha })
    }

    goSettings() {
        const { navigate } = this.props.navigation
        navigate('configuracao',{inicio:true})
    }

    async sendLogin() {
        const { navigation: { navigate }, setToken, ipServer } = this.props
        const { login, senha } = this.state
        debugger
        try {
            this.setState({
                loginIncorreto: false,
                loading: true,
                error: '',
                errorResume:''
            })
            const result = await axios.post(`http://${ipServer}webresources/login`, { nome: login, senha },{timeout: 10000})

            if (result.r) {
                setToken(result.data.token)
                
                navigate('mainFlux')
                this.setState({
                    loginIncorreto: false,
                    senha: '',
                    loading: false
                })
            } else {
                this.setState({
                    loginIncorreto: true,
                    senha: '',
                    loading: false
                })
            }
        } catch (ex) {
            this.setState({
                loading: false,
                error: JSON.stringify(ex.request),
                errorResume: ex.request._response
            })
            console.log(JSON.stringify(ex.request))
        }
    }

    render() {
        const { loading, loginIncorreto, senha, login, error, errorResume } = this.state
        const { ipServer } = this.props
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Icon name="chat" iconStyle={styles.iconChat} />


                <View style={styles.containerInputs}>
                    <FormLabel>Login</FormLabel>
                    <FormInput
                        containerStyle={{}}
                        multiline={true}
                        placeholder="Digite seu login"
                        onChangeText={this.alterLogin.bind(this)}
                        value={login}
                        editable={!loading}
                    />

                    <FormLabel>Senha</FormLabel>
                    <FormInput
                        multiline={false}
                        placeholder="Digite sua senha"
                        onChangeText={this.alterSenha.bind(this)}
                        secureTextEntry={true}
                        value={senha}
                        editable={!loading}
                    />
                    {loginIncorreto && !loading ?
                        <FormValidationMessage labelStyle={{ textAlign: 'center' }}>Login ou senha inválida</FormValidationMessage>
                        :
                        null
                    }

                    { !loading ?
                        <Button
                            style={{ marginTop: 20 }}
                            iconRight
                            icon={{ name: 'send' }}
                            title='ENTRAR'
                            onPress={this.sendLogin.bind(this)}
                        />
                        :
                        <ActivityIndicator
                            animating={true}
                            style={{marginTop:20}}
                        />
                    }

                    <Button
                    title="Configuracoes"
                    style={{ marginTop: 10 }}
                    buttonStyle={{backgroundColor:'#4E342E'}}
                    onPress={() => this.goSettings()} />

                    <Text style={styles.ipServer}>{ipServer}</Text>

                    {
                        error !== ''?
                        (
                            <View>
                                <Text style={styles.errorResume}>{errorResume}</Text>
                                <Text style={styles.error}>{error}</Text>
                            </View>
                        ):
                        null
                    }
                </View>
            </ScrollView>
        )
    }

}

const mapDispatchToProps = dispatch => bindActionCreators({ setToken, alterIpServer }, dispatch)
const mapStateToProps = state => ({
    ipServer: state.general.ipServer
})
export default connect(mapStateToProps, mapDispatchToProps)(Login)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 40,
        paddingRight: 40

    },
    containerInputs: {
        width: '120%'
    },
    iconChat: {
        color: 'gray',
        fontSize: 36,
        marginBottom: 10
    },
    ipServer:{
        marginTop: 15,
        textAlign:'center',
        color:'gray'
    },
    error:{
        marginTop:5,
        textAlign:'center',
        fontSize:12,
        color:'#FFCDD2'
    },
    errorResume:{
        marginTop:5,
        textAlign:'center',
        fontSize:12,
    }
})