import React, { useContext } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import {
  Icon,
  Text,
  MenuItem,
  OverflowMenu,
  TopNavigation,
  TopNavigationAction,
  Layout,
  Avatar,
} from "@ui-kitten/components";
import { AuthContext } from "../context/auth";

const tables = new Array(20).fill(null).map((_, index) => ({
  id: index + 1,
  title: `Mesa ${index + 1}`,
  description: "Livre",
}));

export const HomeScreen = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const { signOut } = useContext(AuthContext);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderItem = (item) => (
    <TouchableOpacity
      key={item.id}
      onPress={() =>
        navigation.navigate("AppNav", { screen: "Bill", tableId: item.id })
      }
      style={styles.touchableArea}
      activeOpacity={0.7}
    >
      <View style={styles.listItem}>
        <Layout style={{ alignItems: "center" }}>
          <Text style={styles.customTitle} category="s1">
            {item.title}
          </Text>
          <Icon name="person" fill="#FFD700" style={styles.iconStyle} />
        </Layout>
      </View>
    </TouchableOpacity>
  );

  const renderMenuAction = () => (
    <TopNavigationAction icon={<Icon name="person" />} onPress={toggleMenu} />
  );

  const renderOverflowMenuAction = () => (
    <OverflowMenu
      anchor={renderMenuAction}
      visible={menuVisible}
      onBackdropPress={toggleMenu}
    >
      <MenuItem
        accessoryLeft={<Icon name="info" />}
        title="Perfil"
        onPress={() => navigation.navigate("HomeNav", { screen: "Profile" })}
      />
      <MenuItem
        accessoryLeft={<Icon name="log-out" />}
        title="Logout"
        onPress={async () => {
          await signOut();
        }}
      />
    </OverflowMenu>
  );

  return (
    <Layout style={{ flex: 1 }}>
      <TopNavigation
        title="Mesas"
        accessoryRight={renderOverflowMenuAction}
        style={styles.pageTitle}
      />
      <ScrollView contentContainerStyle={styles.container}>
        {tables.map(renderItem)}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 8,
  },
  touchableArea: {
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
  },
  listItem: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#222B45",
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  iconStyle: {
    width: 40,
    height: 20,
  },
  customTitle: {
    marginBottom: 10,
    color: "#FFFFFF",
  },
  pageTitle: {
    marginTop: 30,
    marginLeft: 8,
  },
});
