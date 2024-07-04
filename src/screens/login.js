import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button, Layout, Text } from '@ui-kitten/components';
import { AuthContext } from '../context/auth'; 

export const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn,test } = useContext(AuthContext);




useEffect(() => {
    test()
}, [test]);


    return (
        <Layout style={styles.container}>
        <Text category='h1' style={styles.title}>WaiterMate</Text>
        <Input
            placeholder='Email'
            value={email}
            onChangeText={setEmail}
            style={styles.input}
        />
        <Input
            placeholder='Password'
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
        />
        <Button onPress={() => signIn(email,password) } style={styles.button}>
            Entrar
        </Button>


        </Layout>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        marginBottom: 20,
    },
    input: {
        marginBottom: 10,
    },
    button: {
        marginTop: 10,
    },
    });
