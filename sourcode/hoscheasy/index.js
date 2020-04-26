/** @format */
import {
  UIManager,
  StatusBar,
  YellowBox,
  Alert,
  Text,
  TextInput,
  AppRegistry
} from 'react-native';
import { persistStore } from 'redux-persist';
import { Navigation } from 'react-native-navigation';
// import Firebase from 'react-native-firebase';
import { Provider } from 'react-redux';
import I18n from 'react-native-i18n';
import locales from 'Root/src/assets/locales';
import store from 'Root/src/store';
import Routers from 'Root/src/router';
import ignoreScreen from 'Root/src/configs/ignoreScreenCheckInactive';
import { buildThemes, colors, fontFamilys } from './src/themes';
import { getIcon } from './src/elements/Icon';
import { authLogout } from './src/store/actions/auth';
// import { requestAndCheckPermissionNotification } from './src/utils/NotifcationsHelper';
import { markQuickLogin } from './src/store/actions/common';
import BgMessaging from './src/utils/NotifcationsHelper/BgMessaging';

/**
 *  config multi languages
 */
I18n.fallbacks = true;
I18n.translations = locales;

StatusBar.setBarStyle('light-content');
StatusBar.setTranslucent(true);
StatusBar.setBackgroundColor('transparent', true);

if (!Text.defaultProps) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;

if (!TextInput.defaultProps) TextInput.defaultProps = {};
TextInput.defaultProps.allowFontScaling = false;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

YellowBox.ignoreWarnings(['Require cycle:', 'unknown call: "relay:check"']);
console.ignoredYellowBox = ['Setting a timer', 'Require'];
console.disableYellowBox = true;

export const supportLanguage = [
  {
    name: "English",
    code: "en",
    fullCode: "en_US"
  },
  {
    code: "en_MM",
    name: "မြန်မာ (U)",
    fullCode: "en_MM"
  },
  {
    name: 'ျမန္မာ (Z)',
    code: "my",
    fullCode: "my_MM"
  }
];

export const startSingleScreen = () => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'homeHackCovy',
      // screen: "login",
      navigatorStyle: {
        navBarHidden: true
      }
    },
    appStyle: {
      hideBackButtonTitle: true,
      screenBackgroundColor: 'white', // Default screen color, visible before the actual react view is rendered
      orientation: 'portrait'
    },
    animationType: 'none'
  });
};

const navigatorStyle = {
  screenBackgroundColor: '#fff',
  navBarBackgroundColor: colors.orange,
  navBarTitleTextCentered: true,
  // navBarTextFontSize: appThemeConfig.fontScale(20),
  navBarTextFontBold: false,
  navBarTextColor: '#fff',
  topBarElevationShadowEnabled: true,
  navBarNoBorder: false,
  navBarHidden: true,
  // navBarButtonFontSize: appThemeConfig.fontScale(20),
  navBarButtonFontWeight: '500',
  paddingLeft: 0
};

export const startTabBase = passProps => {
  Navigation.startTabBasedApp({
    tabs: [
      {
        label: I18n.t('NAV_HOME'),
        screen: 'tabHome',
        icon: getIcon('home-unactive', {
          fontName: 'ViettelIcons',
          fontSize: 24
        }),
        selectedIcon: getIcon('home', {
          fontName: 'ViettelIcons',
          fontSize: 24
        }),
        navigatorStyle
      },
      {
        label: I18n.t('history'),
        screen: 'tabHistory',
        icon: getIcon('history', {
          fontSize: 24,
          fontName: 'ViettelIcons'
        }),
        navigatorStyle
      },
      {
        label: I18n.t('agent'),
        screen: 'tabAgents',
        icon: getIcon('earth-unactive', {
          fontName: 'ViettelIcons',
          fontSize: 24
        }),
        selectedIcon: getIcon('earth', {
          fontName: 'ViettelIcons',
          fontSize: 24
        }),
        navigatorStyle
      },
      {
        label: I18n.t('notifications'),
        screen: 'tabNotifications',
        icon: getIcon('bell-unactive', {
          fontName: 'ViettelIcons',
          fontSize: 24
        }),
        selectedIcon: getIcon('bell', {
          fontName: 'ViettelIcons',
          fontSize: 24
        }),
        navigatorStyle
      },
      {
        label: I18n.t('NAV_ACCOUNT'),
        screen: 'tabMore',
        icon: getIcon('ios-menu', { fontName: 'Ionicons', fontSize: 30 }),
        // icon: getIcon('more', {
        //   fontName: 'ViettelIcons',
        //   fontSize: 16
        // }),
        navigatorStyle
      }
    ],
    tabsStyle: {
      tabBarButtonColor: colors.grey,
      tabBarTextFontFamily: fontFamilys.medium,
      tabBarSelectedButtonColor: colors.orange,
      tabFontSize: 10,
      selectedTabFontSize: 10,
      tabBarBackgroundColor: '#fff',
      initialTabIndex: 0,
      tabBarLabelColor: colors.grey, // iOS only. change the color of tab text
      tabBarSelectedLabelColor: colors.orange,
      navBarHidden: true,
      statusBarBlur: true,
      keepStyleAcrossPush: true
    },
    appStyle: {
      orientation: 'portrait',
      bottomTabBadgeTextColor: 'white',
      bottomTabBadgeBackgroundColor: 'red',
      forceTitlesDisplay: true,
      hideBackButtonTitle: true,
      tabFontFamily: fontFamilys.medium,
      tabFontSize: 10,
      selectedTabFontSize: 10,
      tabBarButtonColor: colors.grey,
      tabBarSelectedButtonColor: colors.orange,
      // navbar
      navBarTextColor: '#fff', // change the text color of the title (remembered across pushes)
      navBarTextFontSize: 18, // appThemeConfig.fontScale(18), // change the font size of the title
      // navBarTextFontFamily: appThemeConfig.fontFamily.semiBold, // Changes the title font
      navBarBackgroundColor: colors.orange,

      navBarTitleTextCentered: true,
      navBarButtonColor: '#FFF',
      navBarLeftButtonColor: '#fff',
      screenBackgroundColor: 'white', // Default screen color, visible before the actual react view is rendered
      navBarNoBorder: false,
      keepStyleAcrossPush: true,
      navBarHidden: true,
      statusBarColor: 'transparent',
      statusBarBlur: true,
      drawUnderStatusBar: false
    },
    passProps,
    animationType: 'none'
  });
};

export const registerComponent = (key, component) =>
  Navigation.registerComponent(key, component, store, Provider);

buildThemes();

for (const key in Routers) {
  registerComponent(key, () => Routers[key]);
}

if (!__DEV__) {
}

global.InactiveUser = new class {
  constructor() {
    this.timeInApp = 10000; // 10s
    this.timeOut = undefined;
  }
  startTracking(screen) {
    this.clearAllTracking();
    if (ignoreScreen.indexOf(screen) === -1) {
      this.timeOut = setTimeout(() => {
        Alert.alert(
          "Thông báo",
          "Sắp đến giờ khám của bạn, hãy chuẩn bị sẵn sàng!",
          [
            {
              text: I18n.t('ok'),
              onPress: () => {

              }
            }
          ],
        );
        this.clearAllTracking();
      }, this.timeInApp);
    }
  }
  clearAllTracking() {
    this.timeOut && clearTimeout(this.timeOut);
  }
}();

persistStore(store, null, async () => {
  const { auth, locale } = store.getState();
  I18n.locale = locale;
  // await requestAndCheckPermissionNotification();
  // if (auth.isLogged) {
  //   startTabBase();
  // } else {
  //   startSingleScreen();
  // }
  startSingleScreen();
});

AppRegistry.registerHeadlessTask(
  'RNFirebaseBackgroundMessage',
  () => BgMessaging
);
