import { NextResponse } from "next/server"

const SENDGRID_API = "https://api.sendgrid.com/v3/mail/send"

export async function POST(req: Request) {
  const { name, email, message } = await req.json()

  const content = `
    Name: ${name}\r\n
    Email: ${email}\r\n
    Message: ${message}
  `

  const data = {
    personalizations: [
      {
        to: [
          {
            email: "zohaibhassanjafri5@gmail.com",
          },
        ],
        subject: `New message from ${name}`,
      },
    ],
    from: {
      email: "your-verified-sender@example.com", // Replace with your SendGrid verified sender email
    },
    content: [
      {
        type: "text/plain",
        value: content,
      },
    ],
  }

  try {
    const response = await fetch(SENDGRID_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      return NextResponse.json({ message: "Email sent successfully" }, { status: 200 })
    } else {
      const errorData = await response.json()
      console.error("SendGrid API error:", errorData)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }
  } catch (error) {
    console.error("Failed to send email:", error)
    let errorMessage = "An unexpected error occurred"
    if (error instanceof Error) {
      errorMessage = error.message
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

