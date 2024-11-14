import fs from 'fs';
import { Connection, PublicKey, Keypair,  clusterApiUrl } from '@solana/web3.js';
import { getAssociatedTokenAddressSync, getMint, TOKEN_2022_PROGRAM_ID, getAccount } from '@solana/spl-token';
import { TOKEN_ADDR } from './common.js';

// Read Alice's private key from alice.json

const alicePrvKey=JSON.parse(fs.readFileSync("alice.json")).slice(0,32);

const aliceKeypair = Keypair.fromSeed(Uint8Array.from(alicePrvKey));

(async () => {
    try {
        const connection = new Connection(
            clusterApiUrl('devnet'),
            'confirmed'
        );

        const tokenAccAddress = new PublicKey(process.argv[2]);

        const aliceTokenAccAddr = getAssociatedTokenAddressSync(
            tokenAccAddress,
            aliceKeypair.publicKey,
            false,
            TOKEN_2022_PROGRAM_ID,
        );

        const tokenAccount = await getAccount(
            connection,
            aliceTokenAccAddr, 
            undefined,
            TOKEN_2022_PROGRAM_ID,
        );

        console.log('Alice Token Account: ', tokenAccount.address.toBase58());

        // Fetch and display the token amount
        const accountInfo = await connection.getTokenAccountBalance(tokenAccount.address);
        console.log('Alice Token Amount: ', accountInfo.value.amount);

    } catch (error) {
        console.error('Error creating associated token account:', error);
    }
})();