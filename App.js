import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useEffect, useState} from "react";

export default function App() {
    const [milliseconds, setMilliseconds] = useState(0);
    const [running, setRunning] = useState(false);
    const [title, setTitle] = useState('START')
    let interval;

    useEffect(() => {
        if (running) {
            interval = setInterval(() => {
                setMilliseconds(prevMilliseconds => prevMilliseconds + 10);
            }, 10);
        }

        return () => clearInterval(interval);
    }, [running]);

    const startStopwatch = () => {
        setRunning(true);
        setTitle('STOP')
    };

    const stopStopwatch = () => {
        clearInterval(interval);
        setTitle('CONTINUE')
        setRunning(false);
    };

    const resetStopwatch = () => {
        clearInterval(interval);
        setTitle('START')
        setMilliseconds(0);
        setRunning(false);
    };

    const formatTime = () => {
        const getMilliseconds = (`00${milliseconds % 1000}`).slice(-3);
        const seconds = Math.floor(milliseconds / 1000);
        const getSeconds = (`0${seconds % 60}`).slice(-2);
        const minutes = Math.floor(seconds / 60);
        const getMinutes = (`0${minutes % 60}`).slice(-2);
        const getHours = (`0${Math.floor(minutes / 60)}`).slice(-2);

        return `${getHours}:${getMinutes}:${getSeconds}.${getMilliseconds}`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.timer}>{formatTime()}</Text>
            <View style={styles.buttons}>
                <Pressable style={styles.button} onPress={running ? stopStopwatch : startStopwatch}>
                    <Text style={styles.text}>{title}</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={resetStopwatch}>
                    <Text style={styles.text}>RESET</Text>
                </Pressable>
            </View>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#111111',
    },
    timer: {
        fontSize: 60,
        marginBottom: 40,
        color: 'white'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        borderRadius: 8,
        elevation: 3,
        backgroundColor: '#404040',
        cursor: 'pointer',
        width: '40%'
    },
    text: {
        fontSize: 20,
        lineHeight: 26,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});