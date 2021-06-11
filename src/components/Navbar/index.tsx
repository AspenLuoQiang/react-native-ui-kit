import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StyleProp,
  ViewStyle,
  StatusBar,
  StatusBarStyle,
  TextStyle,
  TouchableHighlight,
} from 'react-native';
import Icon from '../Icon';
import { COLORS, FONT_WEIGHT } from '../style/theme';

type Props = {
  height?: number;
  title: string;
  titleSize?: number;
  titleBold?: boolean;
  titleColor?: string;
  showBack?: boolean;
  backIconSize?: number;
  backIconColor?: string;
  backIconName?: string;
  backText?: string;
  backTextStyle?: TextStyle;
  backgroundColor?: string;
  barStyle?: StatusBarStyle;
  showBorderBottom?: boolean;
  onBack?: () => void;
};

const Navbar: React.FC<Props> = props => {
  const {
    height = 44,
    title,
    titleSize = 20,
    titleColor = COLORS.textMainColor,
    titleBold = false,
    showBack = false,
    backIconSize = 24,
    backIconColor = COLORS.textMainColor,
    backIconName = 'arrow-left-bold',
    backText = '返回',
    backTextStyle = {},
    backgroundColor,
    barStyle = 'dark-content',
    showBorderBottom = true,
    onBack,
  } = props;
  const statusBarHeight = StatusBar.currentHeight;

  const statusBarStyle: StyleProp<ViewStyle> = {};
  if (backgroundColor) {
    statusBarStyle.backgroundColor = backgroundColor;
  }
  if (showBorderBottom) {
    statusBarStyle.borderBottomColor = COLORS.borderColor;
    statusBarStyle.borderBottomWidth = 0.5;
  }

  return (
    <View style={statusBarStyle}>
      <StatusBar translucent barStyle={barStyle} backgroundColor="transparent" />
      <View style={{ height: statusBarHeight }} />
      <View style={{ ...styles.container, height }}>
        {showBack && (
          <TouchableHighlight
            style={styles.backIconWrap}
            activeOpacity={0.6}
            underlayColor={COLORS.backgroundColor}
            onPress={() => onBack && onBack()}>
            <>
              <Icon name={backIconName} color={backIconColor} size={backIconSize} />
              {backText && <Text style={{ ...styles.backText, ...backTextStyle }}>{backText}</Text>}
            </>
          </TouchableHighlight>
        )}
        <Text
          style={{
            ...styles.title,
            color: titleColor,
            fontSize: titleSize,
            fontWeight: titleBold ? FONT_WEIGHT.BOLD : FONT_WEIGHT.NORMAL,
          }}>
          {title}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 6,
    paddingRight: 12,
  },
  backIconWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    borderRadius: 40,
  },
  backText: {
    fontSize: 18,
    marginLeft: 6,
    color: COLORS.textMainColor,
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
});

export default Navbar;
