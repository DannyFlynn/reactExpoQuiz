import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import Start from './components/Start';
import Game from './components/Game';
import Diffuculty from './components/Diffuculty';
import { useState } from 'react';


export default function App() {
  const [start, setStart] = useState(false);
  const [chosen, setChosen] = useState(false);
  const [diffuculty, setDiffuculty] = useState();

  const startGame = () => {
    setStart(true)
  }

  const whatLevel = (level) => {
    console.log(level)
    setDiffuculty(level)
    setChosen(true)
  }

  const backToStart = () => {
    setStart(false)
    setChosen(false)
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      {start === false ?
        <Start startGame={startGame} />
        :
        <Diffuculty whatLevel={whatLevel} chosen={chosen} backToStart={backToStart} />
      }


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(127, 0, 255)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
