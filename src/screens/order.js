import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Divider, List, ListItem, Card, Text, Icon, TopNavigation, TopNavigationAction, Layout, Button } from '@ui-kitten/components';

export const OrderScreen = ({ navigation, route }) => {
  const { order } = route.params;

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
            accessoryRight={
              <Icon name='trash' />
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
        title='Pedido'
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
          data={[ order ]}
          renderItem={renderOrder}
          keyExtractor={order => order.id}
          style={{ padding: 10 }}
        />
      </Layout>
      <Layout style={{ padding: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button
          status='danger'
          accessoryLeft={
            <Icon name='minus-circle-outline' />
          }
        >
          Cancelar
        </Button>
        <Button
          status='warning'
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
        />
      </Layout>
    </Layout>
  );
};
