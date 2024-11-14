# meme

## No-metadata Token
mint_addr=Cw4HnaWcdAiXqDJMPZfg5Z84RAkY9YD3QAJ1FqQAnfXT

spl-token mint ${mint_addr}

spl-token supply ${mint_addr}


## With-metadata Token
```
spl-token create-token --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb --enable-metadata

token_addr="3egm9YNvvsL2KrX1kg8p4ngWtm1P5AJJYruJrUSh87zP"

spl-token initialize-metadata "${token_addr}" "HAYDEN" "DEN" "https://raw.githubusercontent.com/RUAN0007/meme/refs/heads/main/meme_meta.json"

spl-token supply "$token_addr"

spl-token create-account "$token_addr"

token_account="apzaAjS9SJo9Nv1NtyzKuKv4P21rZZgRofEzKdK6BZf"

# mint towards the default address of solana cli: FwUbYxqazZ4mrxLHxNspuS6qdUmiSYLipvYoeaPnrhJt
spl-token mint "$token_addr" 1000

spl-token supply "$token_addr" // show 1000
```

## nodeJS
0. setup
```
mint_addr="3egm9YNvvsL2KrX1kg8p4ngWtm1P5AJJYruJrUSh87zP"
cli_acc="FwUbYxqazZ4mrxLHxNspuS6qdUmiSYLipvYoeaPnrhJt"

node show_acc_bal.js FwUbYxqazZ4mrxLHxNspuS6qdUmiSYLipvYoeaPnrhJt
```

1. create an account for Alice
```
solana-keygen new --outfile keypair.json
```

2. create the token account for Alice
```
node create_alice_token_acc.js ${mint_addr}

alice_token_acc="9bYRKeD3D1z1FreYn3empcJLcr6i9JsXir7icMS8AZHn"
```

3. mint some tokens to Alice
```
spl-token mint ${mint_addr} 50 ${alice_token_acc}
```

4. show the token balance
```
node show_alice_token_acc.js ${mint_addr}
```

4. transfer some amount from Alice to cli account
```

# the recipient token account address shall be apzaAjS9SJo9Nv1NtyzKuKv4P21rZZgRofEzKdK6BZf. 
node transfer_from_alice.js ${mint_addr} ${cli_acc}
```

5. observe the cli token amount has increased
```
# observe cli token amount has increased
spl-token balance $token_addr
```