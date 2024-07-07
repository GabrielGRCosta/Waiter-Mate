import React, { useState, useEffect } from 'react';
import {  StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Layout, List, TopNavigation, Icon, Button,Input,Modal} from '@ui-kitten/components';
import {MenuItem} from './menuItem';
import { firestore } from '../config/firebaseConnection';
import {  doc,  getFirestore, getDoc, updateDoc, collection, addDoc, getDocs,query, deleteDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';


export const MenuScreen = () => {
  const [viewMode, setViewMode] = useState('cliente'); 
  const [menuItems, setMenuItems] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [userRole, setUserRole] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState(null);
  const [modalMode, setModalMode] = useState('add');
  const [currentItemId, setCurrentItemId] = useState(null);
  const db = getFirestore();
  let userStorage;

  const cardapioRef =  collection(firestore, 'cardapio');

  async function getUserIdFromStorage() {
    try {
      console.log('Recuperando ID de usuário do AsyncStorage');
      const userString = await AsyncStorage.getItem('user');
      if (userString !== null) {
        userStorage = JSON.parse(userString);
        return userStorage.email;
      } else {
        console.log('Nenhum ID de usuário encontrado no AsyncStorage');
        return null;
      }
    } catch (error) {
      console.error('Erro ao recuperar o usuário do AsyncStorage:', error);
      return null;
    }
  }
  
  async function fetchUserFromFirestore(user) {
    const userRef = doc(db, 'usuarios', user);
    try {
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log('Nenhum usuário encontrado com esse ID');
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar usuário no Firestore:', error);
      return null;
    }
  }

  const fetchPratos = async () => {
    const q = query(collection(db, "cardapio"));
    const querySnapshot = await getDocs(q);
    const pratosList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setMenuItems(pratosList);
  };
  
  async function getUserData() {
    const user = await getUserIdFromStorage();
    if (user) {
      const userData = await fetchUserFromFirestore(user);
      setUserRole(userData.role);
    }
  }

  useEffect(() => {
    getUserData();
    fetchPratos();
  }, []); 

  const savePrato = () => {
    console.log('Salvando prato');
    if (modalMode === 'add') {
      addPrato(); 
    } else if (modalMode === 'edit') {
      updatePrato(); 
    }
    setModalVisible(false);
  };


  const addPrato = async () => {
    const novoPrato = {
      nome,
      preco,
      imagem,
      descricao,
    };
  
    try {
      const docRef = await addDoc(cardapioRef, novoPrato);
      const novoPratoId = docRef.id;
      const novoPratoComId = { ...novoPrato, id: novoPratoId };
  
      Toast.show({
        type: 'success',
        text1: 'Prato adicionado',
        text2: 'O prato foi adicionado com sucesso ao cardápio.',
        visibilityTime: 4000
      });
      setMenuItems(currentItems => [...currentItems, novoPratoComId]);
      setNome('');
      setPreco('');
      setDescricao('');
      setImagem(null);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Houve um erro ao adicionar o prato.'
      });
    }
  };

  const updatePrato = async () => {
    console.log('Atualizando prato')
    const pratoRef = doc(db, "cardapio", currentItemId);
    const updatedPrato = {
      id: currentItemId,
      nome: nome,
      preco: parseFloat(preco), 
      descricao: descricao,
      imagem: imagem,
    };

    try {
      await updateDoc(pratoRef, {
        nome: updatedPrato.nome,
        preco: updatedPrato.preco, 
        descricao: updatedPrato.descricao,
        imagem: updatedPrato.imagem,
      });
      Toast.show({
        type: 'success',
        text1: 'Prato atualizado',
        text2: 'O prato foi atualizado com sucesso no cardápio.',
        visibilityTime: 4000
      });
      setMenuItems(currentItems =>
        currentItems.map(item =>
          item.id === updatedPrato.id ? { ...item, ...updatedPrato } : item
        )
      );
      console.log("Prato atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar o prato:", error);
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Houve um erro ao atualizar o prato.'
      });
    }
  };


  const handleEdit = (item) => {
    openEditModal(item);
  };

  const handleDelete = async (item) => {

    try {
      const itemRef = doc(db, "cardapio", item.id);

      await deleteDoc(itemRef);
      Toast.show({
        type: 'success',
        text1: 'Prato removido',
        text2: 'O prato foi removido com sucesso do cardápio.',
        visibilityTime: 4000
      });
      console.log("Item deletado com sucesso:", item.id);
      setMenuItems(menuItems.filter(i => i.id !== item.id));
    } catch (error) {
      console.error("Erro ao deletar o item:", error);
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Houve um erro ao remover o prato.'
      });
    }
  };

  const openAddModal = () => {
    setModalMode('add');
    setNome('');
    setPreco('');
    setDescricao('');
    setImagem(null);
    setModalVisible(true);
  };


  const openEditModal = (item) => {
    console.log('Abrindo modal de edição');
    setModalMode('edit');
    setCurrentItemId(item.id); 
    setNome(item.nome);
    setPreco(String(item.preco ?? ''));
    setDescricao(item.descricao);
    setImagem(item.imagem); 
    setModalVisible(true);
  };

  const selectImage = async () => {
    console.log('Selecionando imagem da galeria');
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 1,
  });

    if (!result.canceled) {
        console.log("avatar setado")
        setImagem(result.assets[0].base64);
      }
  };


  const toggleSearchBar = () => {
    setSearchVisible(!searchVisible);
    if (searchVisible) {
      setSearchText(''); 
    }
  };

  const renderSearchButton = () => (
    <Button appearance='ghost' onPress={toggleSearchBar} accessoryLeft={<Icon name="search-outline" />}>
      {searchVisible ? 'Cancel' : 'Search'}
    </Button>
  );

  const filteredMenuItems = searchText
    ? menuItems.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.description.toLowerCase().includes(searchText.toLowerCase()),
      )
    : menuItems;

  return (
    <Layout style={styles.container}>
      <TopNavigation
        alignment="center"
        accessoryLeft={() => (
          <>
            <Button appearance='ghost' onPress={() => setViewMode('cliente')}>Cliente</Button>
            <Button appearance='ghost' onPress={() => setViewMode('garcom')}>Garçom</Button>
          </>
        )}
        accessoryRight={renderSearchButton}
        style={styles.pageTitle}
      />

      {searchVisible && (
        <Input
          placeholder="Search..."
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
        />
      )}

      <List
        style={styles.listMenu}
        data={filteredMenuItems}
        renderItem={({ item }) => (
          <MenuItem
            key={item.id} 
            item={item}
            viewMode={viewMode}
            role={userRole}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />

      {userRole === 'gerente' ? <TouchableOpacity
          style={styles.fab}
          onPress={() => openAddModal()}>
          <Icon name="plus" fill="#fff" style={styles.icon} />
        </TouchableOpacity> : <></>}

      

      <Modal
        animationType='slide'
        visible={modalVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setModalVisible(false)}>
        <Layout style={styles.modalView}>
          <TouchableOpacity onPress={selectImage} style={styles.imagePicker}>
              {imagem ? (
                <Image  source={{ uri: `data:image/png;base64,${imagem}` }} style={styles.image} />
              ) : (
                <Icon name="image-outline" width={32} height={32} fill="#8F9BB3" />
              )}
            </TouchableOpacity>
            <Input
              placeholder="Nome do Item"
              value={nome}
              onChangeText={setNome}
              style={styles.input}
            />
            <Input
              placeholder="Preço"
              keyboardType="numeric"
              value={preco}
              onChangeText={setPreco}
              style={styles.input}
            />
            <Input
              placeholder="Descrição"
              value={descricao}
              onChangeText={setDescricao}
              multiline={true}
              textStyle={{ minHeight: 64 }}
              style={styles.input}
            />
            <Button style={{marginTop:60}} onPress={() => (savePrato())}>Salvar</Button>
        </Layout>
      </Modal>

      <Toast />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  fab: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    borderRadius: 30,
    zIndex: 10, 
    elevation: 6,
  },
  icon: {
    width: 32,
    height: 32,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imagePicker: {
    marginTop:0,
    marginBottom: 15,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  input: {
    width: 200,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pageTitle: {
    marginVertical: 30,
  },
  listMenu: {
    flex: 1,
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E9F2',
  },
});
