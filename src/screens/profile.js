import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Image, View } from "react-native";
import { Layout, Input, Toggle, Button, Icon } from "@ui-kitten/components";
import { AuthContext } from "../context/auth";
import { PreferencesContext } from "../context/preferences";
import { doc, getFirestore, getDoc, updateDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

export const ProfileScreen = () => {
  const [userName, setUserName] = useState("Nome do Usuário");
  const [userEmail, setUserEmail] = useState("email@exemplo.com");
  const [userPhone, setUserPhone] = useState("Número de Telefone");
  const [userRole, setUserRole] = useState("Função do Usuário");
  const [userAvatar, setUserAvatar] = useState("https://i.pravatar.cc/300");
  const [userFirestore, setUserFirestore] = useState({});
  const { signOut } = useContext(AuthContext);
  const { darkTheme, setDarkTheme } = useContext(PreferencesContext);
  const db = getFirestore();
  let userStorage;

  const selectImage = async () => {
    console.log("Selecionando imagem da galeria");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log("avatar setado");
      setUserAvatar(result.assets[0].base64);
    }
  };

  async function getUserIdFromStorage() {
    try {
      console.log("Recuperando ID de usuário do AsyncStorage");
      const userString = await AsyncStorage.getItem("user");
      if (userString !== null) {
        userStorage = JSON.parse(userString);
        return userStorage.email;
      } else {
        console.log("Nenhum ID de usuário encontrado no AsyncStorage");
        return null;
      }
    } catch (error) {
      console.error("Erro ao recuperar o usuário do AsyncStorage:", error);
      return null;
    }
  }

  async function fetchUserFromFirestore(user) {
    const userRef = doc(db, "usuarios", user);
    try {
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log("Nenhum usuário encontrado com esse ID");
        return null;
      }
    } catch (error) {
      console.error("Erro ao buscar usuário no Firestore:", error);
      return null;
    }
  }

  async function getUserData() {
    const user = await getUserIdFromStorage();
    if (user) {
      const userData = await fetchUserFromFirestore(user);
      setUserFirestore(userData);

      if (userData) {
        setUserName(userData.name);
        setUserEmail(userData.email);
        setUserPhone(userData.phone);
        setUserRole(userData.role);
        setUserAvatar(userData.avatar);
      }
    }
  }

  const saveProfile = async () => {
    console.log("Salvando as modificações do perfil");
    const userRef = doc(db, "usuarios", userFirestore.email);
    try {
      await updateDoc(userRef, {
        name: userName,
        email: userEmail,
        phone: userPhone,
        role: userRole,
        avatar: userAvatar,
      });
      console.log("Usuário atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout style={styles.container}>
      <TopNavigation
        alignment="center"
        title="Comanda"
        accessoryLeft={
          <TopNavigationAction
            icon={<Icon name="arrow-back" />}
            onPress={navigation.goBack}
          />
        }
        style={{ marginTop: 30 }}
      />
      <View style={styles.avatarSection}>
        <TouchableOpacity onPress={selectImage} style={styles.avatarContainer}>
          <Image
            source={{ uri: `data:image/png;base64,${userAvatar}` }}
            style={styles.avatar}
          />
          <View style={styles.iconOverlay}>
            <Icon name="camera-outline" width={30} height={30} fill="#000" />
          </View>
        </TouchableOpacity>
      </View>
      <Layout style={styles.inputSection}>
        <Input
          value={userName}
          label="Nome"
          placeholder="Digite seu nome"
          onChangeText={setUserName}
          style={styles.input}
        />
        <Input
          value={userEmail}
          label="Email"
          placeholder="Digite seu email"
          onChangeText={setUserEmail}
          disabled={true}
          style={styles.input}
        />
        <Input
          value={userPhone}
          label="Telefone"
          placeholder="Digite seu telefone"
          onChangeText={setUserPhone}
          style={styles.input}
        />
        <Input
          value={userRole}
          label="Função"
          placeholder="Digite sua função"
          onChangeText={setUserRole}
          disabled={true}
          style={styles.input}
        />
        <Toggle
          checked={darkTheme}
          onChange={setDarkTheme}
          style={styles.input}
        >
          Tema: {darkTheme ? "Escuro" : "Claro"}
        </Toggle>

        <Button onPress={saveProfile} style={styles.saveButton}>
          Salvar Modificações
        </Button>

        <Button
          onPress={async () => {
            await signOut();
            navigation.navigate("Login");
          }}
          style={styles.exitButton}
        >
          Sair
        </Button>
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
    alignItems: "center",
    justifyContent: "center",
  },
  inputSection: {
    flex: 2,
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 60,
  },
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  iconOverlay: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 30,
    position: "absolute",
    padding: 5,
    marginVertical: -20,
    bottom: 10,
    right: 10,
  },
  input: {
    marginVertical: 10,
  },
  saveButton: {
    marginTop: 20,
  },
  exitButton: {
    marginTop: 20,
    backgroundColor: "red",
  },
});
