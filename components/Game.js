import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { quizData } from './Data';



function Game({ diffuculty, backToStart }) {
    const [data, setData] = useState(quizData);
    const [count, setCount] = useState(0);
    const [answers, setAnswers] = useState([]);
    const answerAlpha = ['A', 'B', 'C', 'D'];
    const [timeLeft, setTimeLeft] = useState(15); // 15 seconds timer
    const [score, setScore] = useState(0);
    const [message, setMessage] = useState("");

    const [answerCheck, setAnswerCheck] = useState([])
    const [resultToggle, setResultToggle] = useState(false);


    useEffect(() => {
        // Combine incorrect and correct answers into one array
        const allAnswers = quizData[count].incorrect_answers.concat(quizData[count].correct_answer);
        // Shuffle the array
        const shuffledAnswers = shuffleArray(allAnswers);
        // Set the shuffled array as the state
        setAnswers(shuffledAnswers);

    }, [count]);

    useEffect(() => {
        // Exit the game if the timer runs out
        if (count < 9) {
            if (timeLeft === 0) {

                console.log('Time is up');
                // Reset the timer
                setTimeLeft(15);
                // Move on to the next question
                setCount(prev => prev + 1);
            }
            // Decrease the timer every second
            const timer = setTimeout(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
            // Clear the timer when the component unmounts
            return () => clearTimeout(timer);
        }
    }, [timeLeft]);


    // Shuffle array function
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const answerSelected = (answer) => {
        console.log(answer)

        const correctAnswer = quizData[count].correct_answer
        if (correctAnswer === answer) {
            const qstObject = {
                correct: true,
                question: quizData[count].question,
                answer: answer
            }
            setAnswerCheck(prev => [...prev, qstObject])
            setCount(prev => prev + 1)
            setScore(prev => prev + 1)
        } else {
            console.log('wrong answer')
            setCount(prev => prev + 1)
            const qstObjects = {
                correct: false,
                question: quizData[count].question,
                answer: answer
            }
            setAnswerCheck(prev => [...prev, qstObjects])
        }
        winningMessage(score)
        // Reset the timer
        setTimeLeft(15);
        console.log(answerCheck)


    }

    const winningMessage = (score) => {
        if (score < 5) {

            setMessage("Very poor, revision is a must")

        } else if (score === 5) {

            setMessage("Evens Stevens better luck next time")

        } else if (score < 8) {
            setMessage("Average Joe fancy one more crack?")
        }
        else {
            setMessage("Well done quizzer thats a tremendous score!")
        }
    }

    const retry = () => {
        setCount(0)
        setTimeLeft(16)
        setScore(0)
    }

    const mainMenu = () => {
        backToStart()
    }

    const checkAnswers = () => {
        setResultToggle(true)
    }
    return (
        <View style={styles.gameWrapper}>
            {count < 9 ?
                <View style={styles.gameFlex}>
                    <View style={{ width: '100%', display: 'flex', alignItems: 'flex-end' }}>
                        <View style={{ width: 60, borderWidth: 3, borderColor: 'white', borderRadius: 15 }}>
                            <Text style={{ color: 'white', textAlign: 'center', fontSize: 26, padding: 5 }}>
                                {timeLeft}
                            </Text>
                        </View>
                    </View>
                    <Text style={{ color: styles.text.color, textAlign: 'center', fontSize: 22, textDecorationLine: 'underline' }}>
                        {data[count].category}
                    </Text>
                    <Text style={{ color: styles.text.color, textAlign: 'center', fontSize: 22 }}>
                        {data[count].question}
                    </Text>
                    {answers.map((choice, idx) => (
                        <View key={idx} style={{ width: '80%' }}>
                            <Button title={answerAlpha[idx] + ".  " + choice}
                                color="#841584"
                                onPress={() => answerSelected(choice)} />
                        </View>
                    ))}
                </View> :
                <View style={{ height: '100%', display: 'flex', justifyContent: 'center', padding: 20 }}>
                    <Text style={{ color: 'white', fontSize: 26, textAlign: 'center' }}>{score}/10</Text>
                    <Text style={{ color: 'white', fontSize: 26, textAlign: 'center' }}>{message}</Text>
                    <View style={{ display: 'flex', alignItems: 'center' }}>
                        <View style={{ width: 320, marginTop: 50 }}>
                            <Button title='Check Answers' color="#841584" onPress={checkAnswers} />
                        </View>
                        <View style={{ width: 320, marginTop: 50 }}>
                            <Button onPress={retry} title='Retry' color="#841584" />
                        </View>
                        <View style={{ width: 320, marginTop: 50 }}>
                            <Button onPress={mainMenu} title='Exit' color="#841584" />
                        </View>
                    </View>

                </View>

            }

        </View>
    )
}
const styles = StyleSheet.create({
    gameWrapper: {
        height: '100%',
    },
    gameFlex: {
        marginTop: 40,
        height: '90%',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        color: 'white',
        fontSize: 18,
    },

});
export default Game