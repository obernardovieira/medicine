# nabo
###run
geth --datadir ".ethereum_private/" --identity "Private" --networkid 15 --nodiscover --maxpeers 3 init genesis.json
geth --networkid "15" --datadir ".ethereum_private/" --ipcpath "/home/<your_username>/.ethereum/geth.ipc" --nat=extip:<ip> console