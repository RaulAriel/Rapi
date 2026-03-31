-- SCRIPT PARA ACTUALIZAR EL TRIGGER DE NOTIFICACIONES DE CONTACTO
-- Ejecuta esto en el SQL Editor de tu Dashboard de Supabase

-- 1. (OPCIONAL) Si aún no has guardado el secreto en el Vault, descomenta y ejecuta esto primero:
-- SELECT vault.create_secret('TU_SECRETO_REAL_AQUI', 'CONTACT_NOTIFICATION_SECRET');

-- 2. Actualización de la función del trigger para incluir el secreto de forma segura:
CREATE OR REPLACE FUNCTION public.handle_contact_insert()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public, vault
AS $function$
DECLARE
  contact_secret text;
BEGIN
  -- Recuperamos el secreto de forma segura desde el Vault de Supabase
  SELECT decrypted_secret INTO contact_secret 
  FROM vault.decrypted_secrets 
  WHERE name = 'CONTACT_NOTIFICATION_SECRET';

  -- Realizamos la petición POST a la Edge Function incluyendo el header 'x-contact-secret'
  PERFORM
    net.http_post(
      url := 'https://akwlgcghwgrulymouckd.supabase.co/functions/v1/contact-notification',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'x-contact-secret', COALESCE(contact_secret, '')
      ),
      body := jsonb_build_object('record', row_to_json(NEW))
    );
    
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- En caso de error (por ejemplo, si falla la red), permitimos que el insert continúe
  -- para que el usuario no vea un error al enviar su mensaje.
  RETURN NEW;
END;
$function$;