import fs from 'fs';
import { Connection, PublicKey, Keypair, Transaction, sendAndConfirmTransaction, clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { getOrCreateAssociatedTokenAccount, getMint, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token';
import { TOKEN_ADDR } from './common.js';

// Read Alice's private key from alice.json
const alicePrvKey=JSON.parse(fs.readFileSync("alice.json")).slice(0,32);

const aliceKeypair = Keypair.fromSeed(Uint8Array.from(alicePrvKey));
const mint_acc = new PublicKey(TOKEN_ADDR);

(async () => {
    try {

		const connection = new Connection(
			clusterApiUrl('devnet'),
			'confirmed'
		);
		const mintAddress = new PublicKey(process.argv[2]);

		const tokenAccount = await getOrCreateAssociatedTokenAccount(
			connection,
			aliceKeypair,
			mintAddress,
			aliceKeypair.publicKey,
			true,
			undefined,
			undefined,
			TOKEN_2022_PROGRAM_ID,
		  );
		  
		console.log('Alice Token Account: ', tokenAccount.address.toBase58());

    } catch (error) {
        console.error('Error creating associated token account:', error);
    }
})();