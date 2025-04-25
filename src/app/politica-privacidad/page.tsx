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

export default function PoliticaPrivacidad() {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 8, mt: 8 }}>
        <Breadcrumbs sx={{ mb: 4 }}>
          <Link href="/" color="inherit">
            Inicio
          </Link>
          <Typography color="text.primary">Política de Privacidad</Typography>
        </Breadcrumbs>

        <Typography variant="h3" gutterBottom sx={{ mb: 4, fontFamily: 'var(--font-playfair)' }}>
          Política de Privacidad
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <section>
            <Typography variant="h5" gutterBottom>
              1. Información que Recopilamos
            </Typography>
            <Typography paragraph>
              En Osaka Sushi Lounge, recopilamos la siguiente información cuando realiza un pedido o se comunica con nosotros:
            </Typography>
            <ul>
              <Typography component="li" sx={{ ml: 3, mb: 1 }}>
                Nombre y apellidos
              </Typography>
              <Typography component="li" sx={{ ml: 3, mb: 1 }}>
                Dirección de entrega
              </Typography>
              <Typography component="li" sx={{ ml: 3, mb: 1 }}>
                Número de teléfono
              </Typography>
              <Typography component="li" sx={{ ml: 3, mb: 1 }}>
                Dirección de correo electrónico (si se proporciona)
              </Typography>
              <Typography component="li" sx={{ ml: 3, mb: 1 }}>
                Historial de pedidos
              </Typography>
            </ul>
          </section>

          <section>
            <Typography variant="h5" gutterBottom>
              2. Uso de la Información
            </Typography>
            <Typography paragraph>
              Utilizamos la información recopilada para:
            </Typography>
            <ul>
              <Typography component="li" sx={{ ml: 3, mb: 1 }}>
                Procesar y entregar sus pedidos
              </Typography>
              <Typography component="li" sx={{ ml: 3, mb: 1 }}>
                Comunicarnos con usted sobre su pedido
              </Typography>
              <Typography component="li" sx={{ ml: 3, mb: 1 }}>
                Mejorar nuestros servicios y productos
              </Typography>
              <Typography component="li" sx={{ ml: 3, mb: 1 }}>
                Enviar promociones y novedades (solo si ha dado su consentimiento)
              </Typography>
            </ul>
          </section>

          <section>
            <Typography variant="h5" gutterBottom>
              3. Protección de Datos
            </Typography>
            <Typography paragraph>
              Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger sus datos personales contra el acceso no autorizado, la modificación, divulgación o destrucción no autorizada.
            </Typography>
          </section>

          <section>
            <Typography variant="h5" gutterBottom>
              4. Compartir Información
            </Typography>
            <Typography paragraph>
              No vendemos ni compartimos su información personal con terceros, excepto cuando es necesario para:
            </Typography>
            <ul>
              <Typography component="li" sx={{ ml: 3, mb: 1 }}>
                Procesar sus pedidos (servicios de entrega)
              </Typography>
              <Typography component="li" sx={{ ml: 3, mb: 1 }}>
                Cumplir con requisitos legales
              </Typography>
            </ul>
          </section>

          <section>
            <Typography variant="h5" gutterBottom>
              5. Sus Derechos
            </Typography>
            <Typography paragraph>
              Usted tiene derecho a:
            </Typography>
            <ul>
              <Typography component="li" sx={{ ml: 3, mb: 1 }}>
                Acceder a sus datos personales
              </Typography>
              <Typography component="li" sx={{ ml: 3, mb: 1 }}>
                Rectificar sus datos
              </Typography>
              <Typography component="li" sx={{ ml: 3, mb: 1 }}>
                Solicitar la eliminación de sus datos
              </Typography>
              <Typography component="li" sx={{ ml: 3, mb: 1 }}>
                Oponerse al procesamiento de sus datos
              </Typography>
            </ul>
          </section>

          <section>
            <Typography variant="h5" gutterBottom>
              6. Contacto
            </Typography>
            <Typography paragraph>
              Para cualquier consulta relacionada con nuestra política de privacidad, puede contactarnos en:
            </Typography>
            <Typography component="div" sx={{ ml: 3 }}>
              Email: privacy@osaka-sushi.com<br />
              Teléfono: +34 666 666 666<br />
              Dirección: Calle Principal 123, Ciudad
            </Typography>
          </section>

          <section>
            <Typography variant="h5" gutterBottom>
              7. Actualizaciones de la Política
            </Typography>
            <Typography paragraph>
              Podemos actualizar esta política de privacidad ocasionalmente. La última actualización fue realizada el 25 de abril de 2025.
            </Typography>
          </section>
        </Box>
      </Container>
    </>
  );
}