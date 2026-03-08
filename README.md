# geoskill-proof

Un mini sistema donde el estudiante:
- Ingresa datos de una práctica de laboratorio geotécnico.
- El sistema valida reglas objetivas basadas en normativas internacionales (ISO, ASTM).
- El estudiante responde una microverificación conceptual.
- Si pasa varias prácticas sin error, se emite una prueba verificable de dominio.

## G001: Curvas Granulometricas (ISO/TS 17892-4:2004)

El sistema valida que el estudiante siga la metodología correcta para la determinación de la distribución granulométrica del suelo, verificando el método usado, las masas de muestra y los cálculos.

### Reglas de Validación

**1. Método de Ensayo:**
- < 10% finos → Solo Tamizado.
- > 10% finos → Tamizado + Sedimentación.

**2. Control de Calidad:**
- Masa mínima vs $D_{90}$ (Tabla 1).
- Sobrecarga de tamices (Tabla 2).
- Pérdida de material < 1%.

**3. Cálculos:**
- % Pasante por tamiz.
- Diámetro equivalente (Stokes) y correcciones en sedimentación.

---

*Para más detalles sobre la integración de nuevos módulos, consultar la documentación extendida.*
