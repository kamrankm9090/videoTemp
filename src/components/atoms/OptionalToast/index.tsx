import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CloseCircle, Edit, Trash} from '~/assets/svgs';
import {Colors} from '~/styles';
import {fontFamily, scale, verticalScale} from '~/utils/style';

const OptionalToast = ({
  text1,
  text2,
  onClose,
  onEdit,
  onDelete,
  backgroundColor = Colors.INFO,
}: {
  text1?: string;
  text2?: string;
  onClose?: any;
  onEdit?: any;
  onDelete?: any;
  backgroundColor?: string;
}) => {
  const onDeleteHandler = () => {
    onDelete?.();
  };

  return (
    <ScrollView style={[{backgroundColor}, styles.container]}>
      <View style={styles.direction}>
        <View style={styles.flexDirection}>
          {onClose && (
            <TouchableOpacity
              style={styles.iconContainer}
              activeOpacity={0.7}
              onPress={onClose}>
              <CloseCircle height={24} width={24} color={Colors.WHITE} />
            </TouchableOpacity>
          )}
          {text1 && <Text style={styles.text1}>{text1}</Text>}
        </View>
        {onDelete && (
          <TouchableOpacity
            style={styles.iconContainer}
            activeOpacity={0.7}
            onPress={onDeleteHandler}>
            <Trash fill={Colors.WHITE} />
          </TouchableOpacity>
        )}
        {onEdit && (
          <TouchableOpacity
            style={styles.iconContainer}
            activeOpacity={0.7}
            onPress={onEdit}>
            <Edit width={24} height={24} color={Colors.WHITE} />
          </TouchableOpacity>
        )}
      </View>
      {text2 && <Text style={styles.text2}>{text2}</Text>}
    </ScrollView>
  );
};

export default OptionalToast;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 18,
    paddingVertical: verticalScale(24),
    marginTop: 10,
  },
  direction: {
    flexDirection: 'row',
  },
  flexDirection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  text1: {
    flex: 1,
    fontFamily: fontFamily.medium,
    fontSize: scale(16),
    color: Colors.WHITE,
    marginHorizontal: 6,
  },
  text2: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: scale(12),
    color: Colors.WHITE,
  },
  iconContainer: {
    marginHorizontal: 6,
  },
});
