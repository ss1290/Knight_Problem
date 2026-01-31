# Knight Problem — React Native (Community CLI)

A chessboard-based knight movement engine built with React Native

# About the Assignment

Given an N×N chessboard and a knight's starting position the engine:

1. Calculates every valid L-shaped move from the current position while
   respecting board boundaries.
2. Finds the shortest path (BFS) between the knight and any user-chosen
   target square.
3. Renders an interactive board where the user can move the knight,
   resize the board (4–12), and visualise shortest paths.

# Assumptions

1. Default board is 8 × 8; user can resize between 4 and 12 via the +/− stepper.
2. Knight starts at 1, 1 (top-left) on every reset or board-size change.
3. In Move Mode the knight can only land on squares the engine marks as valid.
4. In Path Mode BFS guarantees the shortest path measured in number of hops.
5. Standard chess knight L-shape: 2 squares on one axis, 1 on the other.

# Setup

# Install dependencies

npm install

# iOS — install CocoaPods


cd ios
pod install

# Running the App

# Android

npx react-native run-android


# iOS (macOS only)

npx react-native run-ios

