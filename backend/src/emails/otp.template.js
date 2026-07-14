export function otpTemplate(otp) {
  return `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif; background:#f5f5f5; padding:40px;">
        <div style="max-width:500px; margin:auto; background:white; padding:30px; border-radius:10px;">
          <h2>LegacyVault Login Verification</h2>

          <p>Your One Time Password (OTP) is:</p>

          <h1 style="letter-spacing:8px; text-align:center;">
            ${otp}
          </h1>

          <p>This OTP is valid for <strong>5 minutes</strong>.</p>

          <p>If you didn't request this login, you can safely ignore this email.</p>

          <hr>

          <p style="font-size:12px;color:gray;">
            LegacyVault Security Team
          </p>

        </div>
      </body>
    </html>
  `;
}