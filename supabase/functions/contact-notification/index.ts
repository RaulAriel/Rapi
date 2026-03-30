// @ts-nocheck
import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const CONTACT_NOTIFICATION_SECRET = Deno.env.get('CONTACT_NOTIFICATION_SECRET')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-contact-secret',
}

// Simple HTML escaping function to prevent injection
const escapeHtml = (unsafe: string) => {
  if (!unsafe) return "";
  return unsafe
    .toString()
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Security check: Verify the custom secret header
    const receivedSecret = req.headers.get('x-contact-secret')
    
    if (!CONTACT_NOTIFICATION_SECRET || receivedSecret !== CONTACT_NOTIFICATION_SECRET) {
      console.error("[contact-notification] Unauthorized access attempt. Secret mismatch or missing.")
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
        status: 401, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      })
    }

    const { record } = await req.json()
    
    console.log(`[contact-notification] Authorized message processing for: ${record.email}`)

    if (!RESEND_API_KEY) {
      console.warn("[contact-notification] RESEND_API_KEY is not set. Email won't be sent.")
      return new Response(JSON.stringify({ message: 'API Key missing' }), { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      })
    }

    // Escape all user inputs before using them in HTML
    const safeName = escapeHtml(record.full_name);
    const safeEmail = escapeHtml(record.email);
    const safeSubject = escapeHtml(record.subject);
    const safeMessage = escapeHtml(record.message);
    const safePhone = escapeHtml(record.phone_number || 'No proporcionado');

    // --- Phone Normalization Logic ---
    let cleanPhone = record.phone_number?.replace(/\s/g, '') || '';
    
    if (!cleanPhone.startsWith('+') && !cleanPhone.startsWith('00')) {
      const digitsOnly = cleanPhone.replace(/\D/g, '');
      if (digitsOnly.length === 9) {
        cleanPhone = '34' + digitsOnly;
      } else {
        cleanPhone = digitsOnly;
      }
    } else {
      cleanPhone = cleanPhone.replace(/\D/g, '');
    }

    // --- WhatsApp Message Pre-fill ---
    const whatsappMessage = `Hola ${record.full_name}, he recibido tu mensaje a través de Rapi Websites.

*Resumen de tu contacto:*
*Asunto:* ${record.subject}
*Email:* ${record.email}
*Mensaje:* ${record.message}

¿Cómo puedo ayudarte?`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappLink = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Rapi Websites <onboarding@resend.dev>',
        to: ['raularieldiaz@gmail.com'],
        subject: `Nuevo mensaje de contacto: ${record.subject}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h1 style="color: #6366f1;">Nuevo mensaje de contacto</h1>
            <p><strong>De:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Teléfono:</strong> ${safePhone}</p>
            <p><strong>Asunto:</strong> ${safeSubject}</p>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p><strong>Mensaje:</strong></p>
              <p style="white-space: pre-wrap;">${safeMessage}</p>
            </div>
            
            ${record.phone_number ? `
              <div style="margin-top: 30px; text-align: center;">
                <a href="${whatsappLink}" style="background-color: #25D366; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                  Contactar por WhatsApp
                </a>
                <p style="font-size: 12px; color: #666; margin-top: 10px;">Abre un chat con la info del cliente ya escrita</p>
              </div>
            ` : ''}
            
            <hr style="margin-top: 40px; border: 0; border-top: 1px solid #eee;" />
            <p style="font-size: 12px; color: #999; text-align: center;">
              Enviado automáticamente desde Rapi Websites
            </p>
          </div>
        `,
      }),
    })

    const data = await res.json()
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error: any) {
    console.error("[contact-notification] Error processing notification:", error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})