import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { callRequestCommon } from 'Root/src/configs/RequestWithoutComponent';
import { colors, appStyleNoNavBar } from 'Root/src/themes';

export const withDataProvider = Component =>
  class extends React.PureComponent {
    state = {
      loading: false
    };
    static navigatorStyle = { ...appStyleNoNavBar, tabBarHidden: true };
    callAPICommon = (
      loading: Boolean = true,
      params: Object,
      callBack,
      config: Object
    ) => {
      this.setState({ loading }, async () => {
        const resultFromAPI = await callRequestCommon(config, params);

        console.log('resultFromAPI', resultFromAPI);

        if (!resultFromAPI || !resultFromAPI.success) {
          if (loading) {
            this.setState({ loading: false });
          }
          return callBack && callBack(resultFromAPI && resultFromAPI.message);
        }
        if (loading) {
          this.setState({ loading: false });
        }
        return callBack && callBack(null, resultFromAPI && resultFromAPI.data);
      });
    };

    render() {
      return (
        <React.Fragment>
          <Component {...this.props} callAPICommon={this.callAPICommon} />
          {this.state.loading ? (
            <View style={styles.loadingWrapper}>
              <View style={styles.loading}>
                <ActivityIndicator color={colors.orange} size="small" />
              </View>
            </View>
          ) : null}
        </React.Fragment>
      );
    }
  };

const styles = StyleSheet.create({
  loadingWrapper: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backDrop
  },
  loading: {
    padding: 10,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  }
});
