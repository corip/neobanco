# Card Issuance Event-Driven Architecture

Proyecto desarrollado con una arquitectura orientada a eventos utilizando Node.js, NestJS, Kafka y PostgreSQL.

La solución implementa un flujo distribuido de emisión de tarjetas bancarias donde:

- un API REST recibe solicitudes de emisión
- se publican eventos Kafka
- un consumidor procesa la solicitud
- se aplican reintentos exponenciales
- los errores son enviados a una DLQ
- los resultados exitosos generan eventos de emisión

Se generaron los siguiente topicos:
- io.card.requested.v1
- io.cards.issued.v1
- io.card.requested.v1.dlq

## Como ejecutar

Posicionarse en la raíz del proyecto y ejecutar lo siguientes comandos:

docker compose up -d

cd card-issuer
npm install
npm run start:dev

cd card-processor
npm install
npm run start:dev

## Pruebas
Puede consultar Swagger en:
http://localhost:3001/swagger

Ejemplo de body para /cards/issue:

```json
{
  "customer": {
    "documentType": "DNI",
    "documentNumber": "59265759",
    "fullName": "Pedro Roman",
    "age": 25,
    "email": "pcoriroman@gmail.com"
  },

  "product": {
    "type": "VISA",
    "currency": "PEN"
  },

  "forceError": false
}
```
## Conexión a BD
Parametros de conexión para la bd
- host:localhost
- Port: 5433
- user: admin
- password: admin
- database: cardsdb

## Estrategia de reintentos

El consumidor implementa una estrategia de reintentos exponenciales:

- Retry 1: 1 segundo
- Retry 2: 2 segundos
- Retry 3: 4 segundos

Luego del tercer fallo:

* el estado pasa a FAILED
* el evento es publicado en la DLQ

