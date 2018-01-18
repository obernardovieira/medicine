# medicine
###run
geth --datadir ".ethereum_private/" --identity "Private" --networkid 15 --nodiscover --maxpeers 3 console
geth --networkid "15" --datadir ".ethereum_private/" --ipcpath "/home/mist/.ethereum/geth.ipc" --nat=extip:<ip> console