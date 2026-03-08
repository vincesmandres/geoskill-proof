def validate_granulometria(data):
    masses = data["retained_masses"]
    total_init_sample = data["total_sample_mass"]
    total_sample_real = sum(masses)
    p_error = (abs(total_sample_real - total_init_sample)) / total_init_sample * 100

    total_retained = sum(masses)
    retained_percentage = [(mass / total_sample_real) * 100 for mass in masses]
    retained_percentage = [round(mass, 2) for mass in retained_percentage]


    cumulative = []
    running = 0
    for p in retained_percentage:
        running += p
        cumulative.append(min(running, 100))

    passing = [100 - c for c in cumulative]
    passing = [round(min(c, 100), 2) for c in passing]

    return {
        "inital_sample": total_init_sample,
        "total_sample_real": total_retained,
        "p_error": p_error,
        "retained_percentage": retained_percentage,
        "cumulative_percentage": cumulative,
        "passing_percentages": passing
    }