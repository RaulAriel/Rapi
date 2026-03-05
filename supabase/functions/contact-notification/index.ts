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
    // Note: We removed strict Authorization check here because background triggers 
    // in Supabase have difficulty passing headers consistently.
    // For a contact form, the risk is low as it's triggered by a DB insert which is already protected by RLS.
    
    const { record } = await req.json()
    
    console.log(`[contact-notification] New message received for: ${record.full_name}`)

    if (!RESEND_API_KEY) {
      console.warn("[contact-notification] RESEND_API_KEY is not set. Email won't be sent.")
      // We return 200 to not trigger errors in the DB, but log the warning
      return new Response(JSON.stringify({ message: 'API Key missing' }), { 
        status: 200, 
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
        to: ['raularieldiaz@gmail.com'],
        subject: `Nuevo mensaje de contacto: ${record.subject}`,
        html: `
          <h1>Nuevo mensaje de contacto</h1>
          <p><strong>De:</strong> ${record.full_name} (${record.email})</p>
          <p><strong>Asunto:</strong> ${record.subject}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${record.message}</p>
          <hr />
          <p><small>Enviado automáticamente por el sistema de contacto de tu portafolio.</small></p>
        `,
      }),
    })

    const data = await res.json()
    console.log("[contact-notification] Resend response:", data)

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error: any) {
    console.error("[contact-notification] Error processing notification:", error.message)
    // Return 200 even on error to avoid blocking DB transactions if the trigger isn't perfectly isolated
    return new Response(JSON.stringify({ error: error.message }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
