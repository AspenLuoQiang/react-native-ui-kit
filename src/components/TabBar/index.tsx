import React, { Children, cloneElement } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import TabItem from './item';

type Props = {
  height?: number;
  iconSize?: number;
  activeColor?: string;
  inactiveColor?: string;
  backgroundColor?: string;
  showBorderTop?: boolean;
};

const TabBar: React.FC<Props> = props => {
  const {
    height = 50,
    iconSize = 20,
    activeColor = '#5098FF',
    inactiveColor = '#606266',
    showBorderTop = true,
    backgroundColor = '#FFFFFF',
    children,
  } = props;

  const getPanes = (showContent: boolean) => {
    let selectedIndex = 0;
    [].concat(children as any).forEach((child: any, idx: number) => {
      if (child.props.selected) {
        selectedIndex = idx;
      }
    });

    const newChildren: any[] = [];
    Children.map(children, (child: any, idx) => {
      if (showContent && selectedIndex === idx) {
        newChildren.push(<View key={idx}>{child.props.children}</View>);
      } else {
        newChildren.push(
          cloneElement(child, {
            key: idx,
            activeColor,
            inactiveColor,
            iconSize,
          }),
        );
      }
    });

    if (showContent) {
      return newChildren.filter((_, i) => i === selectedIndex);
    }

    return newChildren;
  };

  return (
    <SafeAreaView style={styles.page}>
      {getPanes(true)}
      <View style={[styles.tabBar, { backgroundColor, height }, showBorderTop ? styles.borderTop : {}]}>
        {getPanes(false)}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    position: 'relative',
    flex: 1,
  },
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#333',
  },
  borderTop: {
    borderTopColor: '#E4E7ED',
    borderTopWidth: 1,
  },
});

export default TabBar;
