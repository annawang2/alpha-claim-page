"use client";

import Image from "next/image";
import { client } from "./client";

import {
  ConnectButton,
  TransactionButton,
  useActiveAccount,
} from "thirdweb/react";

import { getContract, prepareContractCall } from "thirdweb";
import { ethereum } from "thirdweb/chains";
import { createWallet } from "thirdweb/wallets";

// Airdrop contract + token
const AIRDROP_CONTRACT_ADDRESS = "0x9b6704Eb66de9BC08076bff7e362Bdb5799e81e7";
const ALPHA_TOKEN_DECIMALS = 18n;
const ALPHA_PER_WALLET = 1000n;
const CLAIM_QUANTITY = ALPHA_PER_WALLET * 10n ** ALPHA_TOKEN_DECIMALS;

// Thirdweb contract instance
const airdropContract = getContract({
  client,
  address: AIRDROP_CONTRACT_ADDRESS,
  chain: ethereum,
});

// Wallet options (MetaMask + WalletConnect)
const wallets = [
  createWallet("io.metamask"),
  createWallet("walletConnect"),
];

export default function ClaimPage() {
  const account = useActiveAccount();

  return (
    <main className="page">
      <div className="card">
        <div className="header">
          <Image
            src="/alpha-network-logo.jpg"
            alt="ALPHA Network"
            width={80}
            height={80}
            className="logo"
          />
          <div>
            <h1 className="title">ALPHA Network Airdrop</h1>
            <p className="subtitle">
              Wave 1: First 100 founding members can claim 1,000 ALPHA.
            </p>
          </div>
        </div>

        <div className="connect">
          <ConnectButton
            client={client}
            wallets={wallets}
            theme="dark"
            connectButton={{ label: "Connect wallet to claim" }}
          />
        </div>

        {account ? (
          <>
            <div className="info">
              <p>
                Connected as{" "}
                <span className="mono">
                  {account.address.slice(0, 6)}...{account.address.slice(-4)}
                </span>
              </p>
              <p>
                Click the button below to claim your 1,000 ALPHA tokens. This is
                a one-time claim per wallet.
              </p>
            </div>

            <TransactionButton
              transaction={() => {
                if (!account) {
                  throw new Error("No wallet connected");
                }

                // Call the contract's claim function directly:
                // claim(address _receiver, uint256 _quantity, bytes32[] _proofs, uint256 _proofMaxQuantityForWallet)
                return prepareContractCall({
                  contract: airdropContract,
                  method:
                    "function claim(address _receiver, uint256 _quantity, bytes32[] _proofs, uint256 _proofMaxQuantityForWallet)",
                  params: [account.address, CLAIM_QUANTITY, [], 0n],
                });
              }}
              onTransactionSent={() => {
                alert("Transaction submitted! Confirm it in your wallet.");
              }}
              onTransactionConfirmed={() => {
                alert(
                  "Success! 🎉 Your 1,000 ALPHA tokens should arrive shortly."
                );
              }}
              onError={(err) => {
                console.error(err);
                alert(
                  (err as any)?.message ||
                    "Claim failed. You may have already claimed or the airdrop may be complete."
                );
              }}
              style={{
                width: "100%",
                marginTop: "4px",
                padding: "12px 16px",
                borderRadius: "999px",
                background: "#0b63ff",
                color: "#fff",
                fontWeight: 600,
                fontSize: "0.95rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              Claim 1,000 ALPHA
            </TransactionButton>

            <p className="footnote">
              Limit: 1,000 ALPHA per wallet • Only 100 spots available
            </p>
          </>
        ) : (
          <p className="hint">
            Connect your wallet above to check eligibility and claim your ALPHA
            tokens.
          </p>
        )}
      </div>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background: #000;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
            sans-serif;
        }

        .card {
          width: 100%;
          max-width: 560px;
          background: radial-gradient(circle at top left, #1f3cff 0, #000 55%);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.7);
          padding: 28px 24px 24px;
        }

        .header {
          display: flex;
          gap: 16px;
          align-items: center;
          margin-bottom: 24px;
        }

        .logo {
          border-radius: 999px;
          background: #0b63ff;
        }

        .title {
          font-size: 1.9rem;
          line-height: 1.1;
          font-weight: 700;
          margin: 0 0 4px;
        }

        .subtitle {
          margin: 0;
          font-size: 0.9rem;
          color: #d1d5db;
        }

        .connect {
          margin-bottom: 20px;
        }

        .info {
          font-size: 0.9rem;
          color: #e5e7eb;
          margin-bottom: 16px;
        }

        .info p {
          margin: 0 0 8px;
        }

        .mono {
          font-family: "SF Mono", ui-monospace, Menlo, Monaco, Consolas,
            "Liberation Mono", "Courier New", monospace;
          font-size: 0.8rem;
        }

        .hint {
          margin-top: 4px;
          font-size: 0.9rem;
          color: #9ca3af;
          text-align: center;
        }

        .footnote {
          margin-top: 12px;
          font-size: 0.75rem;
          color: #9ca3af;
          line-height: 1.5;
          text-align: center;
        }
      `}</style>
    </main>
  );
}
