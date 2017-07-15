import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Button, List, ListItem } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'


class Contatos extends React.Component {
    static navigationOptions ={
        title: "Contatos"
    }

    goChat(contato) {
        const { navigate } = this.props.navigation
        navigate('chat',{contato})
    }

    render() {
        const { contatos, ipServer } = this.props
        return (
            <View>
                <List>
                    {
                        contatos.map((contato, i) => (
                            <ListItem
                                roundAvatar
                                avatar={{ uri: `http://${ipServer}/faces/resources/user.png` }}
                                key={i}
                                title={contato.username}
                                subtitle={contato.online ? "Online" : null}
                                subtitleStyle={contato.online ? {color:'green'} : {}}
                                hideChevron={true}
                                onPress={()=>this.goChat(contato)}
                            />
                        ))
                    }
                </List>
            </View>
        )
    }

}

const mapStateToProps = state => ({
    contatos: state.general.contatos,
    ipServer: state.general.ipServer
})

export default connect(mapStateToProps)(Contatos)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})