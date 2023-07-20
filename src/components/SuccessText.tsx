import {View, Text} from 'react-native';
import React from 'react';
import Colors from '@utils/constants/Colors';
import Feather from 'react-native-vector-icons/Feather';

type Props = {
  text: string;
};

const SuccessText: React.FC<Props> = ({text}) => {
  return (
    <View style={{flexDirection: 'row', marginBottom: 10}}>
      <View style={{marginRight: 5}}>
        <Feather size={18} name={'check-circle'} color={Colors.success} />
      </View>
      <Text style={{fontSize: 14, color: Colors.success, fontWeight: '600'}}>
        {text}
      </Text>
    </View>
  );
};

export default SuccessText;
