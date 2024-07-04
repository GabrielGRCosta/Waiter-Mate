import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Divider, List, ListItem, Icon, TopNavigation, TopNavigationAction, Layout, Button, useTheme } from '@ui-kitten/components';

const items = [
    { name: '1 Pizza Mozzarella G'   },
    { name: '1 Pizza Pepperoni G'    },
    { name: '1 Pizza Pepperoni G'    },
    { name: '1/2 Pizza Margherita G' },
    { name: '1/2 Pizza Portuguese G'   },
    { name: '1 Pizza Chicken G'      },
    { name: '1/4 Pizza Chocolate G'  },
    { name: '1/4 Pizza White Chocolate G'  },
    { name: '1/4 Pizza Pineapple G'  },
    { name: '1/4 Pizza Vanilla Icecream G' },
].map((e, i) => ({ id: i+1, ...e }));

export const BillScreen = ({ navigation }) => {
  const theme = useTheme();

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
      <ListItem
        title={`${item.id}#--  ${item.name}`}
        description={item.observation || ''}
        accessoryLeft={
          <Icon name='clock-outline' />
        }
        style={{ backgroundColor: theme['background-basic-color-2']}}
      />
    </TouchableOpacity>
  );

  return (
    <Layout style={{ minHeight: '100%' }}>
      <TopNavigation
        alignment='center'
        title='Comanda'
        accessoryLeft={
          <TopNavigationAction
            icon={
              <Icon name='arrow-back' />
            }
            onPress={navigation.goBack}
          />
        }
        style={{ marginTop: 30 }}
      />
      <Divider />
      <Layout style={{ padding: 15, flex: 1 }}>
        <List
          data={items}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={Divider}
          style={{ padding: 10 }}
        />
      </Layout>
      <Layout style={{ padding: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button
          status='danger'
          styles={{ flex: 3 }}
          accessoryLeft={
            <Icon name='trash-2-outline' />
          }
        >
          Encerrar
        </Button>
        <Button
          status='warning'
          styles={{ flex: 3 }}
          accessoryLeft={
            <Icon name='bell-outline' />
          }
        >
          Cozinha
        </Button>
        <Button
          accessoryLeft={
            <Icon name='plus' />
          }
          styles={{ flex: 1 }}
        />
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
    //i simply inlined all styles lol
});
