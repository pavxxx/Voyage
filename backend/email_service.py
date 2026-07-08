"""
email_service.py
----------------
Modular email sender for the Forgot Password flow.

In development (SMTP not configured): the reset link is printed to the console.
In production: set the following variables in backend/.env

  SMTP_HOST=smtp.example.com
  SMTP_PORT=587
  SMTP_USER=noreply@example.com
  SMTP_PASS=your_password
  SMTP_FROM=Voyage <noreply@example.com>

The function signature is stable — swapping to a different provider only
requires editing `_send_via_smtp` below.
"""

import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

SMTP_HOST = os.getenv("SMTP_HOST", "")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASS = os.getenv("SMTP_PASS", "")
SMTP_FROM = os.getenv("SMTP_FROM", "Voyage <noreply@voyage.app>")

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")


def send_reset_email(to_email: str, raw_token: str) -> bool:
    """
    Send a password-reset email.
    Returns True on success, False on failure.
    In dev mode (SMTP not configured), logs the link to stdout.
    """
    reset_link = f"{FRONTEND_URL}/reset-password?token={raw_token}"

    subject = "Reset your Voyage password"
    html_body = _build_html(reset_link)
    text_body = _build_text(reset_link)

    if not SMTP_HOST or not SMTP_USER:
        # ── Development fallback ──────────────────────────────────────────────
        print("\n" + "=" * 60)
        print("⚡ VOYAGE — PASSWORD RESET LINK (dev mode — no SMTP configured)")
        print("=" * 60)
        print(f"  To: {to_email}")
        print(f"  Link: {reset_link}")
        print("=" * 60 + "\n")
        return True

    return _send_via_smtp(to_email, subject, html_body, text_body)


def _send_via_smtp(
    to_email: str,
    subject: str,
    html_body: str,
    text_body: str,
) -> bool:
    """Send using Python's built-in smtplib with STARTTLS."""
    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = SMTP_FROM
        msg["To"] = to_email

        msg.attach(MIMEText(text_body, "plain"))
        msg.attach(MIMEText(html_body, "html"))

        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.ehlo()
            server.starttls()
            server.login(SMTP_USER, SMTP_PASS)
            server.sendmail(SMTP_FROM, [to_email], msg.as_string())

        return True
    except Exception as exc:
        print(f"[email_service] Failed to send email: {exc}")
        return False


def _build_html(reset_link: str) -> str:
    return f"""
<!DOCTYPE html>
<html>
<body style="font-family: 'DM Sans', Arial, sans-serif; background: #FAF8F4; margin: 0; padding: 40px 20px;">
  <div style="max-width: 480px; margin: 0 auto; background: #fff; border-radius: 12px;
              border: 1px solid #e8e2d6; padding: 40px;">
    <p style="font-size: 22px; font-weight: 600; color: #0D1117; margin: 0 0 8px;">
      Voyage
    </p>
    <p style="color: #C97B4B; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
              font-weight: 600; margin: 0 0 32px;">
      Password Reset
    </p>
    <p style="color: #0D1117; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
      We received a request to reset your password. Click the button below
      to set a new password. This link expires in <strong>30 minutes</strong>.
    </p>
    <a href="{reset_link}"
       style="display: inline-block; background: #C97B4B; color: #FAF8F4;
              text-decoration: none; padding: 12px 28px; border-radius: 8px;
              font-size: 13px; font-weight: 600; letter-spacing: 0.1em;
              text-transform: uppercase;">
      Reset Password
    </a>
    <p style="margin: 24px 0 0; color: #888; font-size: 12px; line-height: 1.5;">
      If you didn't request a password reset, you can safely ignore this email.
      Your password will not be changed.
    </p>
    <hr style="border: none; border-top: 1px solid #e8e2d6; margin: 32px 0 16px;" />
    <p style="color: #aaa; font-size: 11px;">
      © {__import__('datetime').datetime.now().year} Voyage. All rights reserved.
    </p>
  </div>
</body>
</html>
"""


def _build_text(reset_link: str) -> str:
    return (
        "Voyage — Password Reset\n\n"
        "We received a request to reset your password.\n"
        f"Click this link to reset it (expires in 30 minutes):\n{reset_link}\n\n"
        "If you didn't request this, you can safely ignore this email."
    )
