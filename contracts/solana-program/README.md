# Solana Program

Modulo on-chain de `GeoSkill Proof` construido con Rust + Anchor.

## Objetivo

Este programa no calcula la practica de granulometria.
La validacion tecnica vive en `services/python-validator/`.

El contrato solo registra estado verificable del estudiante:

- quien es la autoridad del perfil
- cuantos intentos tiene
- cuantos intentos validos tiene
- si ya se emitio un badge

## Modelo actual

La cuenta principal es `StudentProfile` y almacena:

- `authority: Pubkey`
- `attempts_count: u32`
- `passed_count: u32`
- `badge_issued: bool`

## Instrucciones

- `init_student`: crea el perfil del estudiante
- `submit_attempt(is_valid: bool)`: suma un intento y, si corresponde, suma aprobados
- `close_student`: cierra la cuenta y devuelve lamports a la autoridad

## Estructura

- `programs/solana-program/src/lib.rs`: logica on-chain
- `tests/solana-program.ts`: pruebas de integracion con Anchor
- `Anchor.toml`: configuracion local del programa

## Comandos utiles

Ejecutar desde `contracts/solana-program`:

```bash
anchor build
anchor test
```

## Regla de mantenimiento

- Edita la logica fuente solo en `programs/solana-program/src/lib.rs`
- Edita las pruebas solo en `tests/solana-program.ts`
- No edites manualmente `target/idl` ni `target/types`; esos archivos se regeneran
- Manten `declare_id!` alineado con `Anchor.toml` y el keypair del programa

## Evolucion prevista

Mas adelante, Python entregara un resultado resumido de validacion y este modulo on-chain registrara solo el estado verificable minimo necesario. Si se requiere mayor trazabilidad, la recomendacion es guardar un resumen o hash del resultado, no toda la salida tecnica del validador.
