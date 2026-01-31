import React, {useState, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';

import {
  getValidMoves,
  findShortestPath,
  buildBoardState,
} from '../utils/knightEngine';

import Board from '../components/Board';
import Legend from '../components/Legend';
import BoardSizeSelector from '../components/BoardSizeSelector';

const MODE = Object.freeze({MOVE: 'MOVE', PATH: 'PATH'});

export default function KnightScreen() {
  const {width} = useWindowDimensions();

  const [boardSize, setBoardSize] = useState(8);
  const [knightPos, setKnightPos] = useState({row: 0, col: 0});
  const [mode, setMode] = useState(MODE.MOVE);
  const [target, setTarget] = useState(null);
  const [path, setPath] = useState(null);


  const validMoves = useMemo(
    () => getValidMoves(knightPos.row, knightPos.col, boardSize),
    [knightPos, boardSize],
  );

  const boardState = useMemo(
    () => buildBoardState(boardSize, knightPos, validMoves, path, target),
    [boardSize, knightPos, validMoves, path, target],
  );

  const handleSizeChange = useCallback((newSize) => {
    setBoardSize(newSize);
    setKnightPos({row: 0, col: 0});
    setTarget(null);
    setPath(null);
  }, []);

  const handleModeToggle = useCallback((newMode) => {
    setMode(newMode);
    setTarget(null);
    setPath(null);
  }, []);


  const handleCellPress = useCallback(
    (cell) => {
      if (mode === MODE.MOVE) {

        const isValid = validMoves.some(
          (m) => m.row === cell.row && m.col === cell.col,
        );
        if (isValid) {
          setKnightPos({row: cell.row, col: cell.col});
        }
      } else {
        if (!target) {
          const computed = findShortestPath(knightPos, cell, boardSize);
          setTarget({row: cell.row, col: cell.col});
          setPath(computed);
        } else {
          setTarget(null);
          setPath(null);
        }
      }
    },
    [mode, validMoves, knightPos, target, boardSize],
  );

  const handleReset = useCallback(() => {
    setKnightPos({row: 0, col: 0});
    setTarget(null);
    setPath(null);
  }, []);

  const statusText = useMemo(() => {
    if (mode === MODE.PATH) {
      if (!target) return 'Tap any square to set a target';
      if (path) {
        const moves = path.length - 1;
        return `Shortest path: ${moves} move${moves !== 1 ? 's' : ''}`;
      }
      return 'No path found';
    }
    return `Valid moves: ${validMoves.length}`;
  }, [mode, target, path, validMoves]);

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Knight Problem</Text>
      <Text style={styles.subtitle}>Chessboard Movement Engine</Text>

      <BoardSizeSelector boardSize={boardSize} onChange={handleSizeChange} />

      <View style={styles.modeBar}>
        {[MODE.MOVE, MODE.PATH].map((m) => (
          <TouchableOpacity
            key={m}
            onPress={() => handleModeToggle(m)}
            style={[styles.modeBtn, mode === m && styles.modeBtnActive]}
            activeOpacity={0.55}
            accessibilityLabel={m === MODE.MOVE ? 'Move mode' : 'Path mode'}
            accessibilityRole="button"
          >
            <Text style={[styles.modeBtnText, mode === m && styles.modeBtnTextActive]}>
              {m === MODE.MOVE ? '♞  Move Mode' : '◆  Path Mode'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.status}>{statusText}</Text>

      <Board
        boardState={boardState}
        boardSize={boardSize}
        onCellPress={handleCellPress}
        containerWidth={width}
      />

      <Legend />

      <TouchableOpacity
        onPress={handleReset}
        style={styles.resetBtn}
        activeOpacity={0.55}
        accessibilityLabel="Reset board"
        accessibilityRole="button"
      >
        <Text style={styles.resetBtnText}>↺  Reset</Text>
      </TouchableOpacity>

      <Text style={styles.hint}>
        Knight at ({knightPos.row + 1}, {knightPos.col + 1})
      </Text>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  scrollContent: {
    alignItems: 'center',
    paddingTop: 56,
    paddingBottom: 40,
    gap: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#F1F5F9',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginTop: -14,
  },

  modeBar: {
    flexDirection: 'row',
    gap: 10,
  },
  modeBtn: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
  },
  modeBtnActive: {
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
  },
  modeBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94A3B8',
  },
  modeBtnTextActive: {
    color: '#FFFFFF',
  },

  status: {
    fontSize: 15,
    color: '#F59E0B',
    fontWeight: '600',
    textAlign: 'center',
  },

  resetBtn: {
    marginTop: 4,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#475569',
  },
  resetBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94A3B8',
  },

  hint: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '500',
  },
});
