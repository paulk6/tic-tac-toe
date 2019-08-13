import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      'cells': [
        [0, 0, 0,],
        [0, 0, 0,],
        [0, 0, 0,]
      ],
      'currentPlayer': 1
    };
  }

  // reset game method
  initializeGame = () => {
    this.setState({
      'cells': [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      'currentPlayer': 1
    })
  }

  renderIcon = (row, col) => {
    let value = this.state.cells[row][col];

    // return x if 1, return O if -1, return empty view if 0
    switch(value) {
        case 1: return <Icon name="close" style={styles.tileX} />;
        case -1: return <Icon name='circle-outline' style={styles.tileO} />
        default: return <View />
    }
  }

  onTilePress = (row, col) => {
    // if the value is not 0 within the cell chosen, return
    let value = this.state.cells[row][col];
    if (value != 0) { return; }

    // get state variables to alter locally
    let player = this.state.currentPlayer;
    let cells = this.state.cells;

    // alter the proper cell with the player value
    cells[row][col] = player;

    // change the current player
    let next_player = (player == 1) ? -1 : 1;

    this.setState({ cells, 'currentPlayer': next_player });

    // check for winner
    let winner = this.getWinner();
    if (winner == 1) {
      alert("Player 1 is the winner!");
      this.initializeGame();
    } else if (winner == -1) {
      alert("Player 2 is the winner!");
      this.initializeGame();
    }

    // check for tie
    let tie = this.checkTie();

    if (tie === true) {
      alert('No more moves left, you have tied!')
      this.initializeGame();
    }
}

// return 1 if player 1 won, -1 if player 2 won, or a 0 if no one has won
getWinner = () => {
  const NUM_TILES = 3;
  let cells = this.state.cells;
  let sum = 0;

  // check rows...
  for (let i = 0; i < NUM_TILES; i++) {
    sum = cells[i][0] + cells[i][1] + cells[i][2];
    if (sum == 3) { return 1; }
    else if (sum == -3) { return -1; }
  }

  // check cols...
  for (let i = 0; i < NUM_TILES; i++) {
    sum = cells[0][i] + cells[1][i] + cells[2][i];
    if (sum == 3) { return 1; }
    else if (sum == -3) { return -1; }
  }

  // check the diagonals...
  sum = cells[0][0] + cells[1][1] + cells[2][2];
  if (sum == 3) { return -1; }
  else if (sum == -3) { return -1; }

  sum = cells[0][2] + cells[1][1] + cells[2][0];
  if (sum == 3) { return -1; }
  else if (sum == -3) { return -1; }

  // if no winners
  return 0;
}

checkTie = () => {
  let cells = this.state.cells;

  // - represents empty cell to click on, no 0's means no more cells
  for (let i in cells) {
    for (let j in cells[i]) {
      if (cells[i][j] === 0) { return false;}
    }
  }

  return true;
}

  render() {
  return (
    <View style={styles.container}>
      <View style={{paddingBottom: 50}}>
        <Button title='reset' onPress={this.initializeGame}>New Game</Button>
      </View>
      <View style = {{ flexDirection: 'row'}}>
        <TouchableOpacity
        onPress={() => this.onTilePress(0, 0)}
        style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0}]}
        >
          {this.renderIcon(0, 0)}
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => this.onTilePress(0, 1)}
        style={[styles.tile, { borderTopWidth: 0}]}
        >
          {this.renderIcon(0, 1)}
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => this.onTilePress(0, 2)}
        style={[styles.tile, { borderRightWidth: 0, borderTopWidth: 0}]}
        >
          {this.renderIcon(0, 2)}
        </TouchableOpacity>
      </View>
      {/* end of first row */}
      <View style = {{ flexDirection: 'row'}}>
        <TouchableOpacity
        onPress={() => this.onTilePress(1, 0)}
        style={[styles.tile, { borderLeftWidth: 0}]}
        >
          {this.renderIcon(1, 0)}
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => this.onTilePress(1, 1)}
        style={styles.tile}
        >
          {this.renderIcon(1, 1)}
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => this.onTilePress(1, 2)}
        style={[styles.tile, { borderRightWidth: 0}]}
        >
          {this.renderIcon(1, 2)}
        </TouchableOpacity>
      </View>
      {/* end of second row */}
      <View style = {{ flexDirection: 'row'}}>
        <TouchableOpacity
        onPress={() => this.onTilePress(2, 0)}
        style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0}]}
        >
          {this.renderIcon(2, 0)}
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => this.onTilePress(2, 1)}
        style={[styles.tile, { borderBottomWidth: 0}]}
        >
          {this.renderIcon(2, 1)}
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => this.onTilePress(2, 2)}
        style={[styles.tile, { borderRightWidth: 0, borderBottomWidth: 0}]}
        >
          {this.renderIcon(2, 2)}
        </TouchableOpacity>
      </View>
      {/* end of third row */}

      <View style={{ paddingBottom: 50 }} />
        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
          Turn: Player {(this.state.currentPlayer == 1) ? 1 : 2}
        </Text>


    </View>
  );
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile: {
    width: 100,
    height: 100,
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileX: {
    color: 'red',
    fontSize: 60
  },
  tileO: {
    color: 'green',
    fontSize: 60
  },
});
