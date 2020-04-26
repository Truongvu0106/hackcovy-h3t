import I18n from "react-native-i18n";
import { get } from "lodash";
import { Navigation } from "react-native-navigation";
import { appStyleNoNavBar } from "../themes";

const links = [
  "mytelpaycse://cashout/", //{type_cash_out}/bank_code,
  "mytelpaycse://pack/", //{pack_id},
  "mytelpaycse://transfer/", //{},
  "mytelpaycse://promotions", //{},
  "mytelpaycse://promotion/", //{id},
  "mytelpaycse://notification/", //{id_notifcation},
  "mytelpaycse://notifications/", //{},
  "mytelpaycse://cashInForAgent/",
  "mytelpaycse://registerForAgent/",
  "mytelpaycse://requestFunding/",
  "mytelpaycse://reduceLiability/",
  "mytelpaycse://myAgent/",
  "mytelpaycse://takeCareAgent/"
];

type Data = {
  payload: Object,
  link: string
};

export const registerDeepLink = (data: Data) => {
  if (data?.link) {
    Navigation.handleDeepLink({
      payload: data.payload || {},
      link: data.link
    });
  }
};

export const navigateTo = ({ navigator, link }) => {
  console.log("link cc  ", link);
  link = String(link);
  link = link.trim().replace("mytelpaycse://", "");
  if (link.length === 0) {
    return;
  }
  const path = link.split("/");
  if (path.length === 0) {
    return;
  }
  switch (path[0]) {
    case "home":
      if (!path[1]) {
        navigator.popToRoot();
        navigator.switchToTab({ tabIndex: 0 });
        return;
      }
      break;
    case "notifications":
      navigator.popToRoot();
      navigator.switchToTab({ tabIndex: 3 });
      // navigator.push({
      //   screen: 'tabNotifications',
      //   navigatorStyle: { ...appStyleNoNavBar, tabBarHidden: true }
      // });
      break;
    // case 'notification':
    //   if (path[1]) {
    //     navigator.popToRoot();
    //     navigator.switchToTab({ tabIndex: 0 });
    //     navigator.push({
    //       screen: 'notificationDetails',
    //       navigatorStyle: { ...appStyleNoNavBar, tabBarHidden: true },
    //       passProps: {
    //         notificationId: path[1]
    //       }
    //     });
    //     return;
    //   }

    // break;˝
    case "cashInForAgent":
      navigator.popToRoot();
      navigator.switchToTab({ tabIndex: 0 });
      navigator.push({
        screen: "cashInForAgent",
        navigatorStyle: { ...appStyleNoNavBar, tabBarHidden: true }
      });
      break;
    case "registerForAgent":
      navigator.popToRoot();
      navigator.switchToTab({ tabIndex: 0 });
      navigator.push({
        screen: "registerForAgent",
        navigatorStyle: { ...appStyleNoNavBar, tabBarHidden: true }
      });
      break;
    case "requestFunding":
      navigator.popToRoot();
      navigator.switchToTab({ tabIndex: 0 });
      navigator.push({
        screen: "requestFunding",
        navigatorStyle: { ...appStyleNoNavBar, tabBarHidden: true }
      });
      break;
    case "reduceLiability":
      navigator.popToRoot();
      navigator.switchToTab({ tabIndex: 0 });
      navigator.push({
        screen: "reduceLiability",
        navigatorStyle: { ...appStyleNoNavBar, tabBarHidden: true }
      });
      break;
    case "myAgent":
      navigator.popToRoot();
      navigator.switchToTab({ tabIndex: 0 });
      navigator.push({
        screen: "agentList",
        navigatorStyle: { ...appStyleNoNavBar, tabBarHidden: true }
      });
      break;
    case "takeCareAgent":
      navigator.popToRoot();
      navigator.switchToTab({ tabIndex: 0 });
      navigator.push({
        screen: "takeCareAgent",
        navigatorStyle: { ...appStyleNoNavBar, tabBarHidden: true }
      });
      break;
    default:
      break;
  }
};
