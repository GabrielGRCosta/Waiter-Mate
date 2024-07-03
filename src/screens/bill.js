import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Divider, List, ListItem, Icon, Text, TopNavigation, Layout, Card } from '@ui-kitten/components';

const items = [
    { id: 1, name: '1 Pizza Mozzarella G'   },
    { id: 2, name: '1/2 Pizza Pepperoni G'  },
    { id: 3, name: '1/2 Pizza Margherita G' },
]

export const BillScreen = ({ navigation }) => {

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
      <ListItem
        title={`${item.id}#  ${item.name}`}
        description={item.observation || ''}
        accessoryLeft={
          <Icon
            name='clock-outline'
          />
        }
      />
    </TouchableOpacity>
  );

  return (
    <Layout>
      <TopNavigation
        alignment='center'
        title='Comanda'
        style={styles.pageTitle}
      />
      <Card>
        <List
          data={items}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={Divider}
        />
      </Card>
    </Layout>
  );
};

const styles = StyleSheet.create({
  pageTitle: {
    marginTop: 30,
  },
});
