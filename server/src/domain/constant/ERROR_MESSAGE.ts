enum ERROR_MESSAGE {
  EMPTY_GOMAOKI = '備用區沒棋不能 新',
  OUTSIDE_HAN = '不能放在棋盤外',
  OVER_HEIGHT = '不能疊超過高度',
  TOO_FAR = '不能超過我方最遠的棋子',
  NOT_EXIST_GOMA = '沒有這個棋子',
  NOT_YOUR_GOMA = '不是你的棋子',
  BELOW_NOT_EXIST_GOMA = '下面沒有棋子不能疊',
  CANNOT_SET_ON_OSHO = '不能放在帥上',
  INVALID_SIDE = '無效的 side',
  NOT_YOUR_TURN = '不是你的回合',
  POSITION_OCCUPIED = '這個位置已經有棋子了',
  CANNOT_SET_ON_OPPONENT_GOMA = '下面的棋子不能有對方棋子',
  UNKNOWN_GAME_STATE = '未知的遊戲狀態',
}

export { ERROR_MESSAGE };
