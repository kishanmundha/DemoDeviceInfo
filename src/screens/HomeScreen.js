import React, { Component } from 'react';
import {
  Platform,
  View,
  ScrollView,
  ListView,
  Text,
  Image,
  ActivityIndicator,
  AsyncStorage,
  TouchableNativeFeedback,
  TouchableHighlight,
  TouchableOpacity,
  RefreshControl,
  StatusBar,
  FlatList,
} from 'react-native';

import DeviceInfo from 'react-native-device-info';

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Device Info',
  });

  constructor(props) {
    super(props);

    this.state = {
      isPinOrFingerprintSet: null,
      ipAddress: null,
      macAddress: null,
    }
  }

  componentWillMount() {
    DeviceInfo.isPinOrFingerprintSet(isPinOrFingerprintSet => {
      this.setState({
        isPinOrFingerprintSet
      });
    });

    if (Platform.OS === 'ios') {
      this.setState({
        ipAddress: 'Not avaialble on ios',
        macAddress: 'Not available on ios',
      });
    } else {
      DeviceInfo.getIPAddress().then(ipAddress => this.setState({
        ipAddress
      })).catch(error => this.setState({
        ipAddress: false
      }));
      DeviceInfo.getMACAddress().then(macAddress => this.setState({
        macAddress
      })).catch(error => this.setState({
        macAddress: false
      }));
    }
  }

  /**
   * Convert date string to a specific format
   * @param {Date} date 
   */
  getDateTimeString(date) {
    date = new Date();
    return date.toString();
  }

  render() {
    const data = [{
      title: 'Device Unique ID',
      description: DeviceInfo.getUniqueID(), // string e.g. "FCDBD8EF-62FC-4ECB-B2F5-92C9E79AC7F9" This is IDFV on iOS so it will change if all apps from the current apps vendor have been previously uninstalled.
    }, {
      title: 'Device Manufacturer',
      description: DeviceInfo.getManufacturer(), // string e.g. "Apple"
    }, {
      title: 'Device Brand',
      description: DeviceInfo.getBrand(), // string e.g. "Apple / htc / Xiaomi"
    }, {
      title: 'Device Model',
      description: DeviceInfo.getModel(), // string e.g. "iPhone 6"
    }, {
      title: 'Device ID',
      description: DeviceInfo.getDeviceId(), // string e.g. "iPhone7,2" Or the board on Android e.g. goldfish
    }, {
      title: 'System Name',
      description: DeviceInfo.getSystemName(), // string e.g. "iPhone OS"
    }, {
      title: 'System Version',
      description: DeviceInfo.getSystemVersion(), // string e.g. "9.0"
    }, {
      title: 'Bundle ID',
      description: DeviceInfo.getBundleId(), // string e.g. "com.learnium.mobile"
    }, {
      title: 'Build Number',
      description: DeviceInfo.getBuildNumber(), // string e.g. "89"
    }, {
      title: 'App Version',
      description: DeviceInfo.getVersion(), // string e.g. "1.1.0"
    }, {
      title: 'App Version (Readable)',
      description: DeviceInfo.getReadableVersion(), // string e.g. "1.1.0.89"
    }, {
      title: 'Device Name',
      description: DeviceInfo.getDeviceName(), // string e.g. "Becca's iPhone 6"
    }, {
      title: 'User Agent',
      description: DeviceInfo.getUserAgent(), // string e.g. "Dalvik/2.1.0 (Linux; U; Android 5.1; Google Nexus 4 - 5.1.0 - API 22 - 768x1280 Build/LMY47D)"
    }, {
      title: 'Device Locale',
      description: DeviceInfo.getDeviceLocale(), // string e.g. "en-US"
    }, {
      title: 'Device Country',
      description: DeviceInfo.getDeviceCountry(), // string e.g. "US"
    }, {
      title: 'Timezone',
      description: DeviceInfo.getTimezone(), //	string e.g. "America/Mexico_City"	
    }, {
      title: 'App is running in emulator',
      description: DeviceInfo.isEmulator() ? 'YES' : 'NO', //		boolean e.g. true	if app is running in emulator return true
    }, {
      title: 'App is running on a tablet',
      description: DeviceInfo.isTablet() ? 'YES' : 'NO', //		boolean e.g. true	if app is running on a tablet return true
    }, {
      title: 'PIN or fingerprint set',
      description: this.state.isPinOrFingerprintSet === null ? 'Not available' : this.state.isPinOrFingerprintSet ? 'YES' : 'NO' , // Only supported in Android and iOS 9.0 and above
    }, {
      title: 'API Level',
      description: DeviceInfo.getAPILevel(), //		number e.g. 25	ANDROID ONLY - see API Levels
    }, {
      title: 'App Instance ID',
      description: DeviceInfo.getInstanceID(), //	string	ANDROID ONLY - see https://developers.google.com/instance-id/
    }, {
      title: 'Phone Number',
      description: DeviceInfo.getPhoneNumber(), //		?string e.g. "2348675309" or ""	Only supported in Android
    }, {
      title: 'First Install Time',
      description: this.getDateTimeString(DeviceInfo.getFirstInstallTime()), //		number e.g. 1505607068808	Only supported in Android
    }, {
      title: 'Last Install Time',
      description: this.getDateTimeString(DeviceInfo.getLastUpdateTime()), //		number e.g. 1505607068808	Only supported in Android
    }, {
      title: 'Serial Number',
      description: DeviceInfo.getSerialNumber(), //		string	Only supported in Android
    }, {
      title: 'IP Address',
      description: this.state.ipAddress === null ? '' : this.state.ipAddress === false ? 'Not available' : this.state.ipAddress, //	Only supported in Android
    }, {
      title: 'MAC Address',
      description: this.state.macAddress === null ? '' : this.state.macAddress === false ? 'Not available' : this.state.macAddress, // Only supported in Android
    }];

    return (
      <View>
        <StatusBar backgroundColor="#546E7A" hidden={false} />
        <FlatList
          data={data}
          ListHeaderComponent={() => (
            <View style={{ height: 8 }} />
          )}
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, backgroundColor: 'black', opacity: 0.12 }} />
          )}
          renderItem={itemInfo => (
            <TouchableNativeFeedback>
              <View style={{padding: 16}}>
                <Text style={{fontSize: 16, color: 'black', opacity: 0.87 }}>{itemInfo.item.title}</Text>
                <Text style={{fontSize: 14, color: 'black', opacity: 0.54 }}>{itemInfo.item.description}</Text>
              </View>
            </TouchableNativeFeedback>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    )
  }
}

export default HomeScreen;
