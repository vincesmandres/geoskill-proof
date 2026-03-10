# Arquitectura

## Vision general

`GeoSkill Proof` separa la validacion tecnica off-chain del registro verificable on-chain.

- `services/python-validator/`: ejecuta calculos y reglas de validacion de la practica
- `contracts/solana-program/`: registra progreso verificable del estudiante con Anchor
- `app/`: frontend y experiencia de usuario
- `docs/`: decisiones de arquitectura y guias del proyecto

## Responsabilidad de Python

Python es el motor de validacion de la practica de granulometria.

Debe encargarse de:

- leer los datos de entrada
- calcular porcentajes y consistencia de la muestra
- determinar si la practica es valida
- producir un resultado resumido que pueda ser consumido por otras capas

Ejemplo de salida objetivo:

```json
{
  "student_id": "andres01",
  "practice_id": "granulo-001",
  "score": 1,
  "is_valid": true,
  "p_error": 1.4,
  "fines_percent": 6.67,
  "test_status": "Practica valida"
}
```

## Responsabilidad de Solana

Solana no hace el calculo granulometrico.

El programa Anchor mantiene solo estado verificable del estudiante:

- `authority`
- `attempts_count`
- `passed_count`
- `badge_issued`

CRUD minimo actual:

- `init_student`
- lectura desde cliente
- `submit_attempt`
- `close_student`

## Flujo esperado

1. El estudiante envia datos de practica a la capa off-chain.
2. Python valida la practica y produce un resultado.
3. Una capa cliente o backend transforma ese resultado en una instruccion simple para Anchor.
4. El programa actualiza el `StudentProfile` del estudiante.

## Regla de diseno

Para mantener el contrato simple, legible y apto para aprendizaje:

- no guardar calculos extensos on-chain
- no guardar textos largos si no son indispensables
- preferir almacenar solo estado resumido o, en una siguiente etapa, un hash verificable del resultado

## Estado actual

El modulo Anchor actual ya implementa la base minima para:

- crear perfiles de estudiantes
- registrar intentos validos o invalidos
- cerrar perfiles
- probar el flujo completo con `anchor test`

La siguiente evolucion razonable seria decidir si se agrega:

- un resumen del ultimo intento
- un identificador de practica
- un hash del resultado validado por Python
