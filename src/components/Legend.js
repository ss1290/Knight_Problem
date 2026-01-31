import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ITEMS = [
  {color: '#F59E0B', symbol: '♞', label: 'Knight'},
  {color: '#6366F1', symbol: '●', label: 'Valid Move'},
  {color: '#10B981', symbol: '◆', label: 'Path'},
  {color: '#EF4444', symbol: '★', label: 'Target'},
];

export default function Legend() {
  return (
    <View style={styles.row}>
      {ITEMS.map(item => (
        <View key={item.label} style={styles.item}>
          <View style={[styles.swatch, {backgroundColor: item.color}]}>
            <Text style={styles.swatchIcon}>{item.symbol}</Text>
          </View>
          <Text style={styles.label}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 14,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  swatch: {
    width: 24,
    height: 24,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swatchIcon: {
    fontSize: 13,
    color: '#1E293B',
    fontWeight: '700',
  },
  label: {
    fontSize: 13,
    color: '#CBD5E1',
    fontWeight: '500',
  },
});