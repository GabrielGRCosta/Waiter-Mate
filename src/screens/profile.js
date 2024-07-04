import React, { useState, useContext } from 'react';
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import { Layout, Text, Input, Button } from '@ui-kitten/components';
import { AuthContext } from '../context/auth';

export const ProfileScreen = () => {
  const [userName, setUserName] = useState('Nome do Usuário');
  const [userEmail, setUserEmail] = useState('email@exemplo.com');
  const [userPhone, setUserPhone] = useState('Número de Telefone');
  const [userRole, setUserRole] = useState('Função do Usuário');
  const [userAvatar, setUserAvatar] = useState('https://i.pravatar.cc/300');
  const { signOut } = useContext(AuthContext);

  const selectImage = () => {
    
    console.log('Abrir galeria para selecionar uma nova imagem');
  };

  const saveProfile = () => {
    console.log('Salvar modificações do perfil');
  };

  return (
    <Layout style={styles.container}>
      <View style={styles.avatarSection}>
        <TouchableOpacity onPress={selectImage}>
          <Image source={{ uri: userAvatar }} style={styles.avatar} />
        </TouchableOpacity>
      </View>
      <Layout style={styles.inputSection}>
        <Input
          value={userName}
          label='Nome'
          placeholder='Digite seu nome'
          onChangeText={setUserName}
          style={styles.input}
        />
        <Input
          value={userEmail}
          label='Email'
          placeholder='Digite seu email'
          onChangeText={setUserEmail}
          style={styles.input}
        />
        <Input
          value={userPhone}
          label='Telefone'
          placeholder='Digite seu telefone'
          onChangeText={setUserPhone}
          style={styles.input}
        />
        <Input
          value={userRole}
          label='Função'
          placeholder='Digite sua função'
          onChangeText={setUserRole}
          style={styles.input}
        />

        <Button onPress={saveProfile} style={styles.saveButton}>
          Salvar Modificações
        </Button>

        <Button
            onPress={async () => {
                await signOut();
                navigation.navigate('Login');
            }}
            style={styles.exitButton}
        > Sair</Button>

      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  avatarSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputSection: {
    flex: 2,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  input: {
    marginVertical: 10,
  },
  saveButton: {
    marginTop: 20,
  },
  exitButton: {
    marginTop: 20,
    backgroundColor: 'red',
  },
});