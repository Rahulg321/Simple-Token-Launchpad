"use client";

import React, { useState, useTransition } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { createInitializeMint2Instruction, getMinimumBalanceForRentExemptMint, MINT_SIZE, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useToast } from '@/hooks/use-toast';

const TokenLaunchpad = () => {

  const wallet = useWallet()
  const { toast } = useToast()
  // connection to the RPC
  const { connection } = useConnection()
  const [isPending, startTransition] = useTransition()
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    url: '',
    supply: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const createToken = async () => {
  startTransition(async ()=>{
      try {
        if (!wallet.connected || !wallet.publicKey) {
          toast({
            title: "Please connect your wallet first",
            variant: "destructive"
          });
          return;
        }


        console.log(formData);
        console.log("mint size is ", MINT_SIZE);
        const lamports = await getMinimumBalanceForRentExemptMint(connection);

        //generate a new keypair from the mint token that will be used by the end user
        const keypair = Keypair.generate();

        const transaction = new Transaction().add(
          // creates a new account on the blockchain
          SystemProgram.createAccount({
            fromPubkey: wallet.publicKey!,
            newAccountPubkey: keypair.publicKey,
            space: MINT_SIZE,
            lamports,
            // owner of this account, which is the SOLANA_TOKEN_PROGRAM which provides a standard for dealing with tokens in Solana
            programId: TOKEN_PROGRAM_ID,
          }),

          // which sets up the new account as a token mint
          createInitializeMint2Instruction(
            keypair.publicKey,
            6,
            // mint authority
            wallet.publicKey!,
            // freeze authority
            wallet.publicKey!,
            TOKEN_PROGRAM_ID
          )
        );


        // in solana only the recent transactions get picked up, if we want to send a transaction on the blockchain we need to send the hash of the recent block as well
        const recentBlockhash = await connection.getLatestBlockhash()
        transaction.recentBlockhash = recentBlockhash.blockhash

        transaction.feePayer = wallet.publicKey!

        // since we dont have the end users private key we will partially sign the transactions ourselfs using the mint keypair
        transaction.partialSign(keypair);

        // ask phantom for signing the transaction with the connected wallets private key
        let response = await wallet.sendTransaction(transaction, connection);


        console.log("phantom response", response);
        toast({
          title:"Successfully created token",
          variant:"default"
        })
      } catch (error) {
        console.error("an error occured while creating token", error)
        toast({
          title:"Error",
          variant:"destructive"
        })
      }
  })
  };

  return (
    <div>
      <form className="mt-4 md:mt-8 lg:mt-12 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Token Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter token name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="symbol">Token Symbol</Label>
          <Input
            id="symbol"
            name="symbol"
            placeholder="Enter token symbol"
            value={formData.symbol}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="url">Image URL</Label>
          <Input
            id="url"
            name="url"
            placeholder="Enter image URL"
            value={formData.url}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="supply">Initial Supply</Label>
          <Input
            id="supply"
            name="supply"
            placeholder="Enter initial supply"
            value={formData.supply}
            onChange={handleInputChange}
          />
        </div>

        <Button type="button" onClick={createToken} disabled={isPending}>
          {isPending ? "Minting....." : "Create Token"}
        </Button>
      </form>
    </div>
  );
};

export default TokenLaunchpad;