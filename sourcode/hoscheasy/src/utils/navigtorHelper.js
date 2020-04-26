import { isIOS } from './iPhoneXHelper';
import { getIcon } from '../elements/Icon';

export const setIconTab = (navigator, index, iconName, iconSize = 24) =>
  !isIOS &&
  navigator.setTabButton({
    tabIndex: index,
    icon: getIcon(iconName, { fontName: 'ViettelIcons', fontSize: iconSize })
  });
