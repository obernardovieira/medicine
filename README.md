# nabo
###run
```
$ geth --identity "MyTestNetNode" --nodiscover --networkid 19952002 --maxpeers 0 --datadir ~/.ethereum_private init genesis.json
$ geth account new --datadir ~/.ethereum_private/
$ geth removedb --datadir ~/.ethereum_private/
$ geth --identity "MyTestNetNode" --nodiscover --networkid 19952002 --maxpeers 0 --datadir ~/.ethereum_private init genesis.json
$ geth --mine --etherbase "0xc6ed48ca34517d7afc13a66d64695ca62c53e41f" -rpccorsdomain "*" --ipcpath ~/.ethereum/geth.ipc --rpc --networkid 19952002 --datadir ~/.ethereum_private -maxpeers 5 --minerthreads 1
```