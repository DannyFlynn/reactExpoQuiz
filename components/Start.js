import { StyleSheet, Text, View, Button } from 'react-native';

function Start({ startGame }) {
    return (
        <View style={styles.headerWrapper}>
            <View style={{ height: '40%', display: 'flex' }}>
                <Text style={styles.title}>
                    Quizilla!!!
                    {"\n"}

                </Text>
                <Text style={styles.saying}>
                    Challenge your mind and unlock your knowledge with our epic quiz!
                </Text>
            </View>
            <View style={{ width: 300, height: '40%' }}>
                <Button title='Start' color="#841584" onPress={startGame} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerWrapper: {
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,

    },
    title: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    saying: {
        color: 'white',
        textDecorationLine: 'none',
        fontSize: 20,
        textAlign: 'center',
    }
})

export default Start