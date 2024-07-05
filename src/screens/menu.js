import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, List, TopNavigation } from '@ui-kitten/components';
import {MenuItem} from './menuItem';

const menuItems = [
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
];



export const MenuScreen = () => {


    return (
      <Layout>
        <TopNavigation
        alignment='center'
        title='Cardapio'
        style={styles.pageTitle}
        />
        <List
          style={styles.ListMenu}
          data={menuItems}
          renderItem={({ item }) => <MenuItem item={item} />}
          keyExtractor={item => item.id.toString()}
        />
      </Layout>
    );
  };

  const styles = StyleSheet.create({
    ListMenu: {
      verticalAlign: 'center',
    },
    pageTitle: {
      marginTop: 30,
    },
  });