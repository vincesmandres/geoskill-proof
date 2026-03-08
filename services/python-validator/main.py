import json
from validator import validate_granulometria

with open("sample_input.json") as file:
    data = json.load(file)

result = validate_granulometria(data)

print("Resultados de validación:")
print(result)