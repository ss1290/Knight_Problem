import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const MIN_SIZE = 4;
const MAX_SIZE = 12;

export default function BoardSizeSelector({boardSize, onChange}) {
  const canDecrease = boardSize > MIN_SIZE;
  const canIncrease = boardSize < MAX_SIZE;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Board Size</Text>

      <View style={styles.controls}>
        {/* Decrease */}
        <TouchableOpacity
          onPress={() => canDecrease && onChange(boardSize - 1)}
          disabled={!canDecrease}
          style={[styles.btn, !canDecrease && styles.btnDisabled]}
          activeOpacity={0.5}
          accessibilityLabel="Decrease board size"
          accessibilityRole="button"
        >
          <Text style={styles.btnText}>−</Text>
        </TouchableOpacity>

        <Text style={styles.value}>
          {boardSize} × {boardSize}
        </Text>

        <TouchableOpacity
          onPress={() => canIncrease && onChange(boardSize + 1)}
          disabled={!canIncrease}
          style={[styles.btn, !canIncrease && styles.btnDisabled]}
          activeOpacity={0.5}
          accessibilityLabel="Increase board size"
          accessibilityRole="button"
        >
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  btn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDisabled: {
    opacity: 0.3,
  },
  btnText: {
    fontSize: 22,
    color: '#F1F5F9',
    fontWeight: '600',
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F1F5F9',
    minWidth: 72,
    textAlign: 'center',
  },
});