use anchor_lang::prelude::*;

declare_id!("8EfdrfReykRKAAX6ovKZeJM4eRbdVieGrBmbPnwgATgR");

#[program]
pub mod solana_program {
    use super::*;

    pub fn init_student(ctx: Context<InitStudent>) -> Result<()> {
        let student_profile = &mut ctx.accounts.student_profile;
        student_profile.authority = ctx.accounts.authority.key();
        student_profile.attempts_count = 0;
        student_profile.passed_count = 0;
        student_profile.badge_issued = false;

        Ok(())
    }

    pub fn submit_attempt(ctx: Context<SubmitAttempt>, is_valid: bool) -> Result<()> {
        let student_profile = &mut ctx.accounts.student_profile;

        student_profile.attempts_count += 1;

        if is_valid {
            student_profile.passed_count += 1;
        }

        Ok(())
    }

    pub fn close_student(_ctx: Context<CloseStudent>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitStudent<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + StudentProfile::INIT_SPACE
    )]
    pub student_profile: Account<'info, StudentProfile>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SubmitAttempt<'info> {
    #[account(mut, has_one = authority)]
    pub student_profile: Account<'info, StudentProfile>,

    pub authority: Signer<'info>,
}

#[derive(Accounts)]
pub struct CloseStudent<'info> {
    #[account(mut, has_one = authority, close = authority)]
    pub student_profile: Account<'info, StudentProfile>,

    #[account(mut)]
    pub authority: Signer<'info>,
}

#[account]
#[derive(InitSpace)]
pub struct StudentProfile {
    pub authority: Pubkey,
    pub attempts_count: u32,
    pub passed_count: u32,
    pub badge_issued: bool,
}