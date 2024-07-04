import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Divider, List, ListItem, Card, Text, Icon, TopNavigation, TopNavigationAction, Layout, Button, useTheme } from '@ui-kitten/components';

const orders = [
  {
    id: 0, ord: 1,
    status: 'served',
    items: [
      { id: 0, name: '1/2 Pizza Mozzarella G' },
      { id: 1, name: '1/2 Pizza Pepperoni G'  },
      { id: 2, name: '1 Jar Lemonade'         },
    ],
  },
  {
    id: 1, ord: 2,
    status: 'waiting',
    items: [
      { id: 0, name: '1 Jar Orange'           },
    ],
  },
];

export const BillScreen = ({ navigation }) => {
  const theme = useTheme();

  const renderOrder = ({ item: order }) => (
    <Card
      status={order.status === 'served' ? 'success' : order.status == 'waiting' ? 'warning' : 'danger' }
      header={<Text>Pedido #{order.ord}</Text>}
      style={{ marginBottom: 5 }}
    >
      <List
        data={order.items}
        renderItem={({ index, item }) => (
          <ListItem
            title={`${item.name}`}
            description={item.observation || ''}
            accessoryLeft={
              <Icon name='chevron-right-outline' />
            }
          />
        )}
        keyExtractor={item => item.id}
      />
    </Card>
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
          data={orders}
          renderItem={renderOrder}
          keyExtractor={order => order.id}
          style={{ padding: 10 }}
        />
      </Layout>
      <Layout style={{ padding: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button
          status='danger'
          accessoryLeft={
            <Icon name='trash-2-outline' />
          }
          styles={{ flex: 3 }}
        >
          Encerrar
        </Button>
        <Button
          accessoryLeft={
            <Icon name='bell-outline' />
          }
          styles={{ flex: 3 }}
        >
          Cozinha
        </Button>
        <Button onPress={() => navigation.navigate('Order')}
          accessoryLeft={
            <Icon name='plus' />
          }
          styles={{ flex: 1 }}
        />
      </Layout>
    </Layout>
  );
};
