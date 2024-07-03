import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Divider, List, ListItem, Icon, TopNavigation, TopNavigationAction, Layout, useTheme } from '@ui-kitten/components';

const items = [
    { id: 1, name: '1 Pizza Mozzarella G'   },
    { id: 2, name: '1/2 Pizza Pepperoni G'  },
    { id: 3, name: '1/2 Pizza Margherita G' },
]

export const BillScreen = ({ navigation }) => {
  const theme = useTheme();

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
      <ListItem
        title={`${item.id}#  ${item.name}`}
        description={item.observation || ''}
        accessoryLeft={
          <Icon name='clock-outline' />
        }
        style={{ backgroundColor: theme['background-basic-color-2']}}
      />
    </TouchableOpacity>
  );

  return (
    <Layout>
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
      <Layout style={{ padding: 15 }}>
        <List
          data={items}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={Divider}
          style={{ padding: 10, minHeight: '80%' }}
        />
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
    // i inlined all styles lol
});
