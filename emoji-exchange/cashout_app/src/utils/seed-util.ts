import * as anchor from "@project-serum/anchor";
import * as constants from './const';


export class SeedUtil {

    program: anchor.Program;
    vaultPda: anchor.web3.PublicKey;
    likePda: anchor.web3.PublicKey;
    likeMetadataPda: anchor.web3.PublicKey;
    retweetPda: anchor.web3.PublicKey;

    constructor(program: anchor.Program) {
        this.program = program;
    };

    async derivePda(seeds: Buffer[]) {
        return (await anchor.web3.PublicKey.findProgramAddress(
            seeds, this.program.programId
        ))[0]
    }

    async init() {
        this.vaultPda = await this.derivePda([
            Buffer.from(constants.VAULT_SEED_PREFIX),
        ]);
    }

    async getStoreEmojiPda(
        emojiSeed: string
    ): Promise<anchor.web3.PublicKey> {
        return await this.derivePda([
            Buffer.from(constants.STORE_EMOJI_SEED_PREFIX),
            Buffer.from(emojiSeed),
        ]);
    }

    async getUserMetadataPda(
        walletPubkey: anchor.web3.PublicKey
    ): Promise<anchor.web3.PublicKey> {
        return await this.derivePda([
            Buffer.from(constants.USER_METADATA_SEED_PREFIX),
            walletPubkey.toBuffer(),
        ]);
    }

    async getUserEmojiPda(
        emojiSeed: string,
        walletPubkey: anchor.web3.PublicKey
    ): Promise<anchor.web3.PublicKey> {
        return await this.derivePda([
            Buffer.from(constants.USER_EMOJI_SEED_PREFIX),
            Buffer.from(emojiSeed),
            walletPubkey.toBuffer(),
        ]);
    }
}
