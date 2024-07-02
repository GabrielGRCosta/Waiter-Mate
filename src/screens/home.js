import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View } from 'react-native';
import { Divider, ListItem, Icon, Text, TopNavigation, Layout } from '@ui-kitten/components';

const mesas = new Array(20).fill(null).map((_, index) => ({
  id: index + 1,
  title: `Mesa ${index + 1}`,
  description: 'Livre',
}));

export const HomeScreen = ({ navigation }) => {

  const renderItemIcon = (props) => (
    <Icon
      {...props}
      name='person'
      style={[props.style, styles.iconStyle]}
    />
  );

  const CustomTitle = ({ text }) => (
    <Text style={styles.customTitle}>{text}</Text>
  );


  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('DetalhesMesa', { mesaId: item.id })}>
      <ListItem
        title={() => ( <>
          <View style={{alignItems: 'center'}}>
            <CustomTitle style={styles.customTitle} text={item.title} /> 
            <View>
              <Text>
              {renderItemIcon({ style: {} })}
              </Text> 
            </View>
          </View>
           </>
          )}
        style={styles.listItem}
      />
    </TouchableOpacity>
  );

      //<Layout>
      //</Layout>
  return (
    <View>
        <TopNavigation
          alignment='center'
          title='MESAS'
          style={styles.pageTitle}
        />
      <FlatList
        data={mesas}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={3}
        ItemSeparatorComponent={Divider}
        contentContainerStyle={styles.listContentContainer}
        style={styles.container}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin:"auto",
  },
  listItem: {
    flex: 1,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
  },
  iconStyle: {
    width: 40,
    height: 20,
    alignSelf: 'center',
  },
  customTitle: {
    marginBottom:10
  },
  pageTitle: {
    marginTop: 20,
  },
});
