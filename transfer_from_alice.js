import fs from 'fs';
import { Connection, PublicKey, Keypair,  clusterApiUrl } from '@solana/web3.js';
import { getAssociatedTokenAddressSync, transfer, TOKEN_2022_PROGRAM_ID, getAccount } from '@solana/spl-token';
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

        const tokenMintAddress = new PublicKey(process.argv[2]);
        const recipientAccAddress = new PublicKey(process.argv[3]);

        const aliceTokenAccAddr = getAssociatedTokenAddressSync(
            tokenMintAddress,
            aliceKeypair.publicKey,
            false,
            TOKEN_2022_PROGRAM_ID,
        );

        const recipientTokenAccAddr = getAssociatedTokenAddressSync(
            tokenMintAddress,
            recipientAccAddress,
            false,
            TOKEN_2022_PROGRAM_ID,
        );

        console.log('Alice Token Account: ', aliceTokenAccAddr.toBase58());
        console.log('Recipient Token Account: ', recipientTokenAccAddr.toBase58());

        // Fetch and display the token amount
        let signature = await transfer(
            connection,
            aliceKeypair,
            aliceTokenAccAddr,
            recipientTokenAccAddr,
            aliceKeypair.publicKey,
            13,
            [], 
            undefined,
            TOKEN_2022_PROGRAM_ID,
        );
        console.log("Txn Signature: ", signature);

    } catch (error) {
        console.error('Error creating associated token account:', error);
    }
})();