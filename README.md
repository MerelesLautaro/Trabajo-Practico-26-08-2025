# Consiga

## Debés crear una API REST para un que cumpla con los siguientes requisitos:

* Modelo de datos (sin persistencia real, solo arrays en memoria):
* usuarios con atributos: id, nombre, rol (admin o cliente).
* pedidos con atributos: id, usuarioId, items (array de strings), estado (pendiente, en_proceso, entregado).

## Endpoints obligatorios:
* POST /usuarios → crear usuario.
* POST /pedidos → crear un pedido (solo puede hacerlo un cliente).
* PUT /pedidos/:id/estado → cambiar el estado del pedido (solo puede hacerlo un admin).
* GET /pedidos → listar pedidos. Si es admin, ve todos; si es cliente, solo los suyos.

## Middlewares complejos a implementar (mínimo 3):
* Antes de POST /pedidos, validar que el array items no esté vacío y que cada item sea un string. Si no cumple, devolver un error claro.
* Crear un middleware requireRole(rol) que reciba el rol como parámetro y bloquee el acceso a rutas que no correspondan.
* Cada vez que se cambie el estado de un pedido, registrar en consola un log con: usuario que realizó la acción, id del pedido y nuevo estado.

# Desarrollo

1. POST /usuarios → crear usuario.
```
localhost:3000/api/v1/user/create
```
Body de la request esperado (validado con JOI)
```
{
    "name":"Lautaro",
    "rol":"admin"
}
```

Response:
```
{
    "message": "User created",
    "user": {
        "id": "8f6cd424-c4f9-4c03-bbd0-b263dd0c74d3",
        "name": "Lautaro",
        "rol": "admin"
    }
}
```
#
2.  POST /pedidos → crear un pedido (solo puede hacerlo un cliente).
Como es un ejercicio básico y no se implementa JWT, para visualizar en acción el middleware implementando se pasa por request param si es admin o no (para cumplir con el requerimiento).
```
localhost:3000/api/v1/order/create?isAdmin=false
```
Body de la request esperado (validado con JOI)
```
{
    "userId":"5912f306-105e-4b90-b256-650499eaf47d",
    "items":["leche"],
    "status":"pending"
}
```

Response:

```
{
    "message": "Order created",
    "user": {
        "id": "42c63a29-6d57-4794-a92b-3e4d2e5c6b5f",
        "userId": "5912f306-105e-4b90-b256-650499eaf47d",
        "items": [
            "leche"
        ],
        "status": "pending"
    }
}
```
#

* PUT /pedidos/:id/estado → cambiar el estado del pedido (solo puede hacerlo un admin).
#### Para este endpoint decidí utilzar PATCH, ya que se está modificando un recurso de manera parcial.
#### La url se compone de la siguiente forma /api/v1/order/{orderId}/state?userId={userId}
```
PATCH localhost:3000/api/v1/order/3cacf995-8cb6-4d60-811a-38e0ea6251b7/state?userId=5912f306-105e-4b90-b256-650499eaf47d
```

Body de la request esperado (validado con JOI)
```
{
    "status":"pending"
}
```
Response:
```
{
    "message": "Order status updated",
    "order": {
        "id": "3cacf995-8cb6-4d60-811a-38e0ea6251b7",
        "userId": "50a41edf-a713-42aa-abdc-6fb642d8f4ed",
        "items": [
            "play5",
            "labubu"
        ],
        "status": "pending"
    }
}
```
#
* GET /pedidos → listar pedidos. Si es admin, ve todos; si es cliente, solo los suyos.
```
localhost:3000/api/v1/order?userId=50a41edf-a713-42aa-abdc-6fb642d8f4ed
```

Response:

```
[
    {
        "id": "3cacf995-8cb6-4d60-811a-38e0ea6251b7",
        "userId": "50a41edf-a713-42aa-abdc-6fb642d8f4ed",
        "items": [
            "play5",
            "labubu"
        ],
        "status": "pending"
    },
    {
        "id": "8076c81b-a5bc-400d-ba4b-2a3fbfbc6c96",
        "userId": "50a41edf-a713-42aa-abdc-6fb642d8f4ed",
        "items": [
            "celular"
        ],
        "status": "pending"
    }
]
```
