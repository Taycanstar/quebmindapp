import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import Colors from '@utils/constants/Colors';

type Props = {};

const LoadingButton = (props: Props) => {
  return (
    <View
      style={{
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        backgroundColor: Colors.navy2,
      }}>
      <ActivityIndicator />
    </View>
  );
};

export default LoadingButton;
