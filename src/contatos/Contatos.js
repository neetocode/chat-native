import React from 'react'
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { Button, List, ListItem, Icon } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { sair } from './../login/loginActions'

class Contatos extends React.Component {
    static navigationOptions = ({ navigation }) => {

        const { params } = navigation.state
        return {
            headerRight: <Text style={{ color: 'red', paddingRight: 10 }} onPress={() => params.sair() }>Sair</Text>,
            headerLeft: <Icon name='settings' style={{ paddingLeft: 10 }} onPress={() => params.goSettings() } />
        };
    };

    componentDidMount() {
        this.props.navigation.setParams({
            goSettings: this.goSettings.bind(this),
            sair: this.sair.bind(this)
        });
    }

    goSettings() {
        const { navigate } = this.props.navigation
        navigate('configuracao')
    }

    goChat(contato) {
        const { navigate } = this.props.navigation
        navigate('chat', { contato })
    }

    sair() {
        this.props.sair()
        this.props.navigation.navigate('login')
    }

    render() {
        const { contatos, ipServer } = this.props
        return (
            <ScrollView>
                <List>
                    {
                        contatos.map((contato, i) => (
                            <ListItem
                                roundAvatar
                                avatar={{ uri: `http://${ipServer}/faces/resources/user.png` }}
                                key={i}
                                title={contato.username}
                                subtitle={contato.online ? "Online" : null}
                                subtitleStyle={contato.online ? { color: 'green' } : {}}
                                hideChevron={true}
                                onPress={() => this.goChat(contato)}
                            />
                        ))
                    }
                </List>

                {/* <Button title="Sair" style={{ marginTop: 10 }} onPress={() => this.sair()} /> */}
            </ScrollView>
        )
    }

}

const mapStateToProps = state => ({
    contatos: state.general.contatos,
    ipServer: state.general.ipServer
})
const mapDispacthToProps = dispatch => bindActionCreators({ sair }, dispatch)

export default connect(mapStateToProps, mapDispacthToProps)(Contatos)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})