import React, {ReactElement} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  ViewProps,
} from 'react-native';
import {AgoraDivider, AgoraStyle, AgoraText, AgoraView} from '~/components/ui';
import {height, width} from '~/utils/style';

interface Props {
  name: string;
  renderConfiguration?: () => ReactElement | undefined;
  renderChannel?: () => ReactElement | undefined | null;
  renderUsers?: () => ReactElement | undefined;
  renderAction?: () => ReactElement | undefined;
  containerStyle?: ViewProps['style'];
}

export default function BaseComponent({
  name,
  renderConfiguration,
  renderChannel,
  renderUsers,
  renderAction,
  containerStyle = styles.container,
}: Props) {
  const users = renderUsers ? renderUsers() : undefined;
  const configuration = renderConfiguration ? renderConfiguration() : undefined;
  return (
    <KeyboardAvoidingView
      style={[AgoraStyle.fullSize]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <AgoraView style={AgoraStyle.fullWidth}>{renderChannel?.()}</AgoraView>
      {users ? (
        <AgoraView style={containerStyle}>{users}</AgoraView>
      ) : undefined}
      {configuration ? (
        <>
          <AgoraDivider />
          <AgoraText style={styles.title}>
            {`The Configuration of ${name}`}
          </AgoraText>
          <AgoraDivider />
          <ScrollView style={AgoraStyle.fullSize}>{configuration}</ScrollView>
        </>
      ) : undefined}
      <AgoraView style={AgoraStyle.float}>
        {renderAction ? renderAction() : undefined}
      </AgoraView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  title: {
    marginVertical: 10,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    height: height,
    width: width,
  },
});
