'use client';

import React from 'react';
import {
  Container,
  Typography,
  Box,
  Breadcrumbs,
  Link,
} from '@mui/material';
import Navbar from '../components/Navbar';

export default function TerminosCondiciones() {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 8, mt: 8 }}>
        <Breadcrumbs sx={{ mb: 4 }}>
          <Link href="/" color="inherit">
            Inicio
          </Link>
          <Typography color="text.primary">Términos y Condiciones</Typography>
        </Breadcrumbs>

        <Typography variant="h3" gutterBottom sx={{ mb: 4, fontFamily: 'var(--font-playfair)' }}>
          Términos y Condiciones
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <section>
            <Typography variant="h5" gutterBottom>
              1. Aceptación de los Términos
            </Typography>
            <Typography paragraph>
              Al acceder y realizar un pedido a través de Osaka Sushi Lounge, usted acepta estar sujeto a estos Términos y Condiciones, todas las leyes y regulaciones aplicables, y acepta que es responsable del cumplimiento de las leyes locales aplicables.
            </Typography>
          </section>

          <section>
            <Typography variant="h5" gutterBottom>
              2. Pedidos y Pagos
            </Typography>
            <Typography paragraph>
              Al realizar un pedido a través de nuestra plataforma:
            </Typography>
            <ul>
              <Typography component="li" sx={{ ml: 3, mb: 1 }}>
                Usted confirma que toda la información proporcionada es precisa y completa
              </Typography>
              <Typography component="li" sx={{ ml: 3, mb: 1 }}>
                Los precios mostrados incluyen IVA y otros impuestos aplicables
              </Typography>
              <Typography component="li" sx={{ ml: 3, mb: 1 }}>
                Nos reservamos el derecho de rechazar pedidos en circunstancias excepcionales
              </Typography>
              <Typography component="li" sx={{ ml: 3, mb: 1 }}>
                El pago se realizará en el momento de la entrega
              </Typography>
            </ul>
          </section>

          <section>
            <Typography variant="h5" gutterBottom>
              3. Entrega
            </Typography>
            <Typography paragraph>
              Nuestro servicio de entrega está sujeto a:
            </Typography>
            <ul>
              <Typography component="li" sx={{ ml: 3, mb: 1 }}>
                Área de entrega limitada (consultar zonas disponibles)
              </Typography>
              <Typography component="li" sx={{ ml: 3, mb: 1 }}>
                Pedido mínimo de 15€
              </Typography>
              <Typography component="li" sx={{ ml: 3, mb: 1 }}>
                Tiempos de entrega estimados que pueden variar según la demanda
              </Typography>
              <Typography component="li" sx={{ ml: 3, mb: 1 }}>
                Dirección de entrega correcta y accesible
              </Typography>
            </ul>
          </section>

          <section>
            <Typography variant="h5" gutterBottom>
              4. Calidad y Seguridad Alimentaria
            </Typography>
            <Typography paragraph>
              Nos comprometemos a:
            </Typography>
            <ul>
              <Typography component="li" sx={{ ml: 3, mb: 1 }}>
                Mantener los más altos estándares de higiene y seguridad alimentaria
              </Typography>
              <Typography component="li" sx={{ ml: 3, mb: 1 }}>
                Utilizar ingredientes frescos y de calidad
              </Typography>
              <Typography component="li" sx={{ ml: 3, mb: 1 }}>
                Seguir todas las regulaciones de seguridad alimentaria
              </Typography>
            </ul>
          </section>

          <section>
            <Typography variant="h5" gutterBottom>
              5. Cancelaciones y Reembolsos
            </Typography>
            <Typography paragraph>
              Nuestra política de cancelaciones establece que:
            </Typography>
            <ul>
              <Typography component="li" sx={{ ml: 3, mb: 1 }}>
                Los pedidos pueden cancelarse sin cargo antes de comenzar su preparación
              </Typography>
              <Typography component="li" sx={{ ml: 3, mb: 1 }}>
                Una vez iniciada la preparación, no se aceptarán cancelaciones
              </Typography>
              <Typography component="li" sx={{ ml: 3, mb: 1 }}>
                Los reembolsos se procesarán en caso de problemas de calidad justificados
              </Typography>
            </ul>
          </section>

          <section>
            <Typography variant="h5" gutterBottom>
              6. Propiedad Intelectual
            </Typography>
            <Typography paragraph>
              Todo el contenido de nuestra web (imágenes, textos, logotipos, diseños) está protegido por derechos de autor y es propiedad de Osaka Sushi Lounge. No está permitida su reproducción sin autorización expresa.
            </Typography>
          </section>

          <section>
            <Typography variant="h5" gutterBottom>
              7. Limitación de Responsabilidad
            </Typography>
            <Typography paragraph>
              Osaka Sushi Lounge no será responsable de:
            </Typography>
            <ul>
              <Typography component="li" sx={{ ml: 3, mb: 1 }}>
                Retrasos causados por circunstancias fuera de nuestro control
              </Typography>
              <Typography component="li" sx={{ ml: 3, mb: 1 }}>
                Daños indirectos o consecuentes
              </Typography>
              <Typography component="li" sx={{ ml: 3, mb: 1 }}>
                Problemas técnicos del sitio web fuera de nuestro control
              </Typography>
            </ul>
          </section>

          <section>
            <Typography variant="h5" gutterBottom>
              8. Modificaciones
            </Typography>
            <Typography paragraph>
              Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio web.
            </Typography>
          </section>

          <section>
            <Typography variant="h5" gutterBottom>
              9. Contacto
            </Typography>
            <Typography paragraph>
              Para cualquier consulta sobre estos términos y condiciones, puede contactarnos en:
            </Typography>
            <Typography component="div" sx={{ ml: 3 }}>
              Email: legal@osaka-sushi.com<br />
              Teléfono: +34 666 666 666<br />
              Dirección: Calle Principal 123, Ciudad
            </Typography>
          </section>

          <section>
            <Typography variant="h5" gutterBottom>
              10. Ley Aplicable
            </Typography>
            <Typography paragraph>
              Estos términos y condiciones se rigen por la legislación española. Cualquier disputa estará sujeta a la jurisdicción exclusiva de los tribunales españoles.
            </Typography>
          </section>
        </Box>
      </Container>
    </>
  );
}