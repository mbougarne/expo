import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import ButtonGroup from './src/ButtonGroup';
import getMainButtonList from './src/MainButtonGroup';
import getStickyGroupButtonList from './src/StickyGroup';
import getCategoryButtonslist from './src/CategoryGroup';
import getChannelButtonList from './src/ChannelGroup';
import getPushButtonList from './src/PushGroup';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    Notifications.addOnForegroundNotificationListener('testScreen',
      (foregroundNotification: Notifications.LocalNotification) => {
        console.log(foregroundNotification);
      }
    );
    Notifications.addOnUserInteractionListener('testScreen',
      (userInteraction: Notifications.UserInteraction) => {
        console.log(userInteraction);
      }
    );
  }

  componentDidMount() {
    this._obtainUserFacingNotifPermissionsAsync();
  }

  render() {
    return (
      <View>
        <ScrollView>
          <ButtonGroup title="Main list" buttonList={getMainButtonList()} />
          <ButtonGroup title="Sticky list" buttonList={getStickyGroupButtonList()} />
          <ButtonGroup title="Category List" buttonList={getCategoryButtonslist()} />
          <ButtonGroup title="Channel List" buttonList={getChannelButtonList()} />
          <ButtonGroup title="Push List" buttonList={getPushButtonList()} />
        </ScrollView>
      </View>
    );
  }

  _obtainUserFacingNotifPermissionsAsync = async () => {
    let permission = await Permissions.getAsync(
      Permissions.USER_FACING_NOTIFICATIONS
    );
    if (permission.status !== 'granted') {
      permission = await Permissions.askAsync(
        Permissions.USER_FACING_NOTIFICATIONS
      );
      if (permission.status !== 'granted') {
        alert(`We don't have permission to present notifications.`);
      }
    }
    return permission;
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});