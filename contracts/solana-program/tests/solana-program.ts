import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { assert } from "chai";
import { SolanaProgram } from "../target/types/solana_program";

describe("solana-program", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.solanaProgram as Program<SolanaProgram>;
  const authority = provider.wallet;
  const studentProfile = anchor.web3.Keypair.generate();

  it("crea un perfil de estudiante", async () => {
    await program.methods
      .initStudent()
      .accountsPartial({
        studentProfile: studentProfile.publicKey,
        authority: authority.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([studentProfile])
      .rpc();

    const account = await program.account.studentProfile.fetch(
      studentProfile.publicKey
    );

    assert.ok(account.authority.equals(authority.publicKey));
    assert.equal(account.attemptsCount, 0);
    assert.equal(account.passedCount, 0);
    assert.equal(account.badgeIssued, false);
  });

  it("actualiza intentos cuando se envía un intento válido", async () => {
    await program.methods
      .submitAttempt(true)
      .accountsPartial({
        studentProfile: studentProfile.publicKey,
        authority: authority.publicKey,
      })
      .rpc();

    const account = await program.account.studentProfile.fetch(
      studentProfile.publicKey
    );

    assert.equal(account.attemptsCount, 1);
    assert.equal(account.passedCount, 1);
    assert.equal(account.badgeIssued, false);
  });

  it("actualiza intentos cuando se envía un intento inválido", async () => {
    await program.methods
      .submitAttempt(false)
      .accountsPartial({
        studentProfile: studentProfile.publicKey,
        authority: authority.publicKey,
      })
      .rpc();

    const account = await program.account.studentProfile.fetch(
      studentProfile.publicKey
    );

    assert.equal(account.attemptsCount, 2);
    assert.equal(account.passedCount, 1);
  });

  it("cierra el perfil del estudiante", async () => {
    await program.methods
      .closeStudent()
      .accountsPartial({
        studentProfile: studentProfile.publicKey,
        authority: authority.publicKey,
      })
      .rpc();

    try {
      await program.account.studentProfile.fetch(studentProfile.publicKey);
      assert.fail("La cuenta debería estar cerrada");
    } catch (error) {
      assert.ok(error);
    }
  });
});
