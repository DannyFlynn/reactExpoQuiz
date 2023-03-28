import { StyleSheet, Text, View, Button } from 'react-native';
import Game from './Game';
function Diffuculty({ whatLevel, chosen, backToStart }) {
    return (
        <View>
            {chosen === false ?
                <View style={{ width: '100%' }}>
                    <View style={{ height: 120, width: 300 }}>
                        <Text style={{ color: 'white', fontSize: 26, textAlign: 'center' }}>Difficulty:</Text>
                    </View>
                    <View style={{ height: 120, width: 300 }}>
                        <Button title='Easy' color="#841584" onPress={() => whatLevel('easy')} />
                    </View>
                    <View style={{ height: 120 }}>
                        <Button title='Medium' color="#841584" onPress={() => whatLevel('medium')} />
                    </View>
                    <View style={{ height: 120 }}>
                        <Button title='Insane' color="#841584" onPress={() => whatLevel('hard')} />
                    </View>

                </View>
                :
                <Game backToStart={backToStart} />}
        </View>
    )
}

export default Diffuculty