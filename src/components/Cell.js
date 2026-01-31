import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Platform} from 'react-native';


const ROLE_STYLE = {
  knight: {bg: '#F59E0B', border: '#D97706', text: '#1E293B', symbol: '♞'},
  move:   {bg: '#6366F1', border: '#4F46E5', text: '#FFFFFF', symbol: '●'},
  path:   {bg: '#10B981', border: '#059669', text: '#FFFFFF', symbol: '◆'},
  target: {bg: '#EF4444', border: '#DC2626', text: '#FFFFFF', symbol: '★'},
  empty:  {bg: null,      border: null,      text: null,      symbol: ''},
};

const CHECKER = {light: '#F1F5F9', dark: '#CBD5E1'};

export default function Cell({cell, cellSize, onPress}) {
  const {row, col, role} = cell;
  const isLight = (row + col) % 2 === 0;

  const bg     = role === 'empty' ? (isLight ? CHECKER.light : CHECKER.dark) : ROLE_STYLE[role].bg;
  const border = role === 'empty' ? (isLight ? '#E2E8F0'  : '#94A3B8')       : ROLE_STYLE[role].border;

  const {symbol, text: textColor} = ROLE_STYLE[role];

  return (
    <TouchableOpacity
      onPress={() => onPress(cell)}
      activeOpacity={0.55}
      style={[
        styles.cell,
        {
          width:           cellSize,
          height:          cellSize,
          backgroundColor: bg,
          borderColor:     border,
        },
      ]}
      accessibilityLabel={`Row ${row + 1}, Column ${col + 1}, ${role}`}
      accessibilityRole="button"
      accessibilityHint={role !== 'empty' ? `${role} square` : undefined}
    >
      {symbol ? (
        <Text
          style={[styles.symbol, {color: textColor, fontSize: cellSize * 0.54}]}
          numberOfLines={1}
        >
          {symbol}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cell: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbol: {
    fontWeight: '700',
    textAlign: 'center',
    ...Platform.select({
      ios:     {fontFamily: 'System'},
      android: {fontFamily: 'sans-serif'},
    }),
  },
});