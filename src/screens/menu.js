import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, List, TopNavigation, Icon, Button,Input } from '@ui-kitten/components';
import {MenuItem} from './menuItem';

export const MenuScreen = () => {
  const [viewMode, setViewMode] = useState('cliente'); 
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: 'Pizza Margherita',
      price: '29.90',
      image: 'https://picsum.photos/200/300?random=1',
      description: 'Tomate, queijo mozzarella, manjericão fresco e azeite de oliva.',
    },
    {
      id: 2,
      name: 'Hambúrguer Clássico',
      price: '25.50',
      image: 'https://picsum.photos/200/300?random=2',
      description: 'Pão de brioche, carne bovina, queijo cheddar, alface, tomate e molho especial.',
    },
    {
      id: 3,
      name: 'Salada Caesar',
      price: '19.90',
      image: 'https://picsum.photos/200/300?random=3',
      description: 'Alface romana, frango grelhado, queijo parmesão, croutons e molho Caesar.',
    },
    {
      id: 4,
      name: 'Sorvete de Chocolate',
      price: '12.00',
      image: 'https://picsum.photos/200/300?random=4',
      description: 'Delicioso sorvete de chocolate cremoso.',
    },
    {
      id: 5,
      name: 'Sushi Combo',
      price: '45.00',
      image: 'https://picsum.photos/200/300?random=5',
      description: 'Variedade de sushis, incluindo nigiris, sashimis e makis.',
    },
    {
      id: 6,
      name: 'Taco Mexicano',
      price: '18.90',
      image: 'https://picsum.photos/200/300?random=6',
      description: 'Tortilla de milho, carne moída, alface, tomate, queijo cheddar e molho picante.',
    },
    {
      id: 7,
      name: 'Bolo de Cenoura',
      price: '15.00',
      image: 'https://picsum.photos/200/300?random=7',
      description: 'Bolo fofinho de cenoura com cobertura de chocolate.',
    },
    {
      id: 8,
      name: 'Lasanha à Bolonhesa',
      price: '32.00',
      image: 'https://picsum.photos/200/300?random=8',
      description: 'Massa de lasanha, molho bolonhesa, queijo mozzarella e parmesão gratinado.',
    },
    {
      id: 9,
      name: 'Café Espresso',
      price: '7.50',
      image: 'https://picsum.photos/200/300?random=9',
      description: 'Café espresso forte e aromático, perfeito para qualquer momento do dia.',
    },
    {
      id: 10,
      name: 'Suco de Laranja',
      price: '8.00',
      image: 'https://picsum.photos/200/300?random=10',
      description: 'Suco de laranja fresco e natural, sem açúcar adicionado.',
    },
  // Adicione mais itens conforme necessário
]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

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
        renderItem={({ item }) => <MenuItem item={item} viewMode={viewMode} />}
        keyExtractor={item => item.id.toString()}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
