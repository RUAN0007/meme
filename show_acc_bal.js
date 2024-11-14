import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

async function showAccountBalance() {
	// Connect to the Solana network
	const connection = new Connection(
		clusterApiUrl('devnet'),
		'confirmed'
	  );
	// Specify the account public key
	const accountPublicKey = new PublicKey(process.argv[2]);

	try {
		// Get the account balance
		const balance = await connection.getBalance(accountPublicKey);

		// Display the account balance

		// 9bYRKeD3D1z1FreYn3empcJLcr6i9JsXir7icMS8AZHn
		console.log(`Account ${accountPublicKey} balance: ${balance} SOL`);
	} catch (error) {
		console.error('Failed to retrieve account balance:', error);
	}
}

showAccountBalance();