# Card Issuance Event-Driven Architecture

Proyecto desarrollado con una arquitectura orientada a eventos utilizando Node.js, NestJS, Kafka y PostgreSQL.

La solución implementa un flujo distribuido de emisión de tarjetas bancarias donde:

- un API REST recibe solicitudes de emisión
- se publican eventos Kafka
- un consumidor procesa la solicitud
- se aplican reintentos exponenciales
- los errores son enviados a una DLQ
- los resultados exitosos generan eventos de emisión


