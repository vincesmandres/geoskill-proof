def validate_granulometria(data):
    masses = data["retained_masses"]
    total_init_sample = data["total_sample_mass"]
    pan_mass = masses[-1]

    total_sample_real = sum(masses)
    fines_percent = (pan_mass / total_sample_real) * 100
    error_percentage = abs(total_sample_real - total_init_sample) / total_init_sample * 100

    valid_mass_balance = error_percentage <= 2

    if fines_percent <= 10:
        method_status = "Tamizado adecuado"
    else:
        method_status = "Advertencia: >10% de finos, se recomienda sedimentación complementaria"

    if valid_mass_balance:
        test_status = f"Práctica válida: el error de masa es {error_percentage:.2f}%, dentro de la tolerancia del 2%."
    else:
        test_status = f"Práctica inválida: el error de masa es {error_percentage:.2f}%, supera la tolerancia del 2%."

    retained_percentage_raw = [(mass / total_sample_real) * 100 for mass in masses]

    cumulative_raw = []
    running = 0
    for p in retained_percentage_raw:
        running += p
        cumulative_raw.append(min(running, 100))

    passing_raw = [max(0, 100 - c) for c in cumulative_raw]

    score = 1 if valid_mass_balance else 0

    return {
        "initial_sample": total_init_sample,
        "total_sample_real": total_sample_real,
        "p_error": round(error_percentage, 2),
        "retained_percentage": [round(x, 2) for x in retained_percentage_raw],
        "cumulative_percentage": [round(x, 2) for x in cumulative_raw],
        "passing_percentages": [round(x, 2) for x in passing_raw],
        "fines_percent": round(fines_percent, 2),
        "method_status": method_status,
        "valid_mass_balance": valid_mass_balance,
        "test_status": test_status,
        "score": score
    }