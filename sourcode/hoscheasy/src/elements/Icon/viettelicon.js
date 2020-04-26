/**
 * viettel icon set component.
 * Usage: <icomoon name="icon-name" size={20} color="#4F8EF7" />
 */

import createIconSet from 'react-native-vector-icons/lib/create-icon-set';
import selection from 'Root/src/assets/fonts/ViettelIcons.json';

export const glyphMap = selection;

const iconSet = createIconSet(glyphMap, 'ViettelIcons', 'ViettelIcons.ttf');

export default iconSet;
