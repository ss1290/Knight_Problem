import React from 'react';
import {View, StyleSheet} from 'react-native';
import Cell from './Cell';


export default function Board({boardState, boardSize, onCellPress, containerWidth}) {
  const cellSize = Math.floor((containerWidth - 16) / boardSize);

  return (
    <View style={styles.board}>
      {boardState.map((row, rIdx) => (
        <View key={rIdx} style={styles.row}>
          {row.map(cell => (
            <Cell
              key={`${cell.row}-${cell.col}`}
              cell={cell}
              cellSize={cellSize}
              onPress={onCellPress}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
});