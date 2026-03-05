import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { record } = await req.json()
    
    console.log(`[contact-notification] New message from ${record.full_name} (${record.email})`)

    if (!RESEND_API_KEY) {
      console.error("[contact-notification] RESEND_API_KEY is not set")
      return new Response(JSON.stringify({ error: 'RESEND_API_KEY not set' }), { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      })
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Contact Form <onboarding@resend.dev>',
        to: ['raularieldiaz@gmail.com'], // The user's email
        subject: `Nuevo mensaje de contacto: ${record.subject}`,
        html: `
          <h1>Nuevo mensaje de contacto</h1>
          <p><strong>De:</strong> ${record.full_name} (${record.email})</p>
          <p><strong>Asunto:</strong> ${record.subject}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${record.message}</p>
        `,
      }),
    })

    const data = await res.json()
    console.log("[contact-notification] Email sent successfully", data)

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error: any) {
    console.error("[contact-notification] Error processing notification", error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
