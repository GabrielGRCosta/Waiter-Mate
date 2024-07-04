import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity,View } from 'react-native';
import { Divider, ListItem, Icon, Text, TopNavigation, Layout } from '@ui-kitten/components';

const tables = new Array(20).fill(null).map((_, index) => ({
  id: index + 1,
  title: `Mesa ${index + 1}`,
  description: 'Livre',
}));


export const HomeScreen = ({ navigation }) => {

  const ItemSeparator = () => (
    <View style={{ height: 1, width: "100%", backgroundColor: "#CED0CE" }} />
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Bill', { tableId: item.id })}>
      <ListItem
        title={() => (
          <Layout style={{alignItems: 'center'}}>
            <Text style={styles.customTitle} category='s1'>
              {item.title}
            </Text>
            <Icon
              name='person'
              fill='#FFD700' 
              style={styles.iconStyle}
            />
          </Layout>
        )}
        style={styles.listItem}
      />
    </TouchableOpacity>
  );

  return (
    <Layout style={{flex: 1}}>
      <TopNavigation
        alignment='center'
        title='Mesas'
        style={styles.pageTitle}
      />
      <FlatList
        data={tables}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={3}
        ItemSeparatorComponent={ItemSeparator} 
        contentContainerStyle={styles.listContentContainer}
        style={styles.container}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 'auto',
  },
  listItem: {
    flex: 1,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    backgroundColor: '#222B45', 
    borderWidth: 1, 
    borderColor: '#FFFFFF',
  },
  iconStyle: {
    width: 40,
    height: 20,
  },
  customTitle: {
    marginBottom: 10,
    color: '#FFFFFF',
  },
  pageTitle: {
    marginTop: 30,
  },
});