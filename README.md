# GeoSkill Proof

GeoSkill Proof es un proyecto educativo que combina validacion tecnica off-chain con registro verificable on-chain.

La idea central es simple:

- Python valida una practica de laboratorio de granulometria.
- Solana + Anchor registran el progreso verificable del estudiante.
- Mas adelante, ese progreso podra servir como base para microcredenciales o badges.

## Que problema resuelve

En una practica de laboratorio, el estudiante puede hacer calculos correctos o incorrectos. Este proyecto busca separar dos responsabilidades:

- `Python` se encarga del calculo y la validacion tecnica.
- `Solana` se encarga del estado verificable del estudiante.

Eso evita meter logica cientifica compleja dentro del contrato y deja el modulo on-chain pequeno, claro y facil de auditar.

## Arquitectura

- `services/python-validator/`: motor de validacion off-chain
- `contracts/solana-program/`: programa on-chain con Rust + Anchor
- `app/`: frontend futuro
- `docs/`: documentacion tecnica y decisiones de arquitectura

## Estado actual del proyecto

Hoy el repo ya tiene dos piezas funcionales:

### 1. Validador Python

Ubicacion: `services/python-validator/`

Actualmente:

- recibe datos de una practica de granulometria
- calcula consistencia de masa y porcentaje de finos
- determina si la practica es valida
- produce un resultado resumido para etapas posteriores

### 2. Programa Solana con Anchor

Ubicacion: `contracts/solana-program/`

Actualmente:

- crea perfiles de estudiante
- registra intentos
- cuenta intentos aprobados
- permite cerrar el perfil
- pasa pruebas con `anchor test`

## Modelo on-chain actual

La cuenta principal es `StudentProfile` y guarda:

- `authority: Pubkey`
- `attempts_count: u32`
- `passed_count: u32`
- `badge_issued: bool`

Las instrucciones implementadas hoy son:

- `init_student`
- `submit_attempt(is_valid: bool)`
- `close_student`

## Regla principal de diseno

Python hace el calculo de la practica.
Solana no calcula granulometria.

Solana solo registra estado resumido y verificable del estudiante. Esa separacion es intencional y es una de las decisiones mas importantes del proyecto.

## Flujo esperado

1. El estudiante entrega datos de la practica.
2. Python valida la practica y produce un resultado.
3. Ese resultado se resume para el modulo on-chain.
4. Anchor actualiza el `StudentProfile`.

## Como correr lo que ya existe

### Validador Python

Desde `services/python-validator/`:

```bash
python main.py
```

### Programa Anchor

Desde `contracts/solana-program/`:

```bash
anchor build
anchor test
```

## Que esta listo y que no

Listo hoy:

- base del validador Python
- CRUD minimo on-chain de `StudentProfile`
- pruebas de integracion del contrato
- separacion clara entre logica off-chain y on-chain

Todavia no implementado:

- integracion completa Python -> backend/frontend -> Solana
- almacenamiento on-chain de resumen avanzado o hash del resultado
- emision de badges
- frontend de usuario

## Documentacion relacionada

- `contracts/solana-program/README.md`: detalle del modulo on-chain
- `docs/architecture.md`: vista general de arquitectura y evolucion prevista

## Nota de entorno

Para desarrollo de Anchor en este proyecto, el entorno recomendado es `WSL (Ubuntu)` sobre Windows.
