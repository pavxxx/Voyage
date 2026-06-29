import json
import os

BASE_DIR = os.path.dirname(__file__)

json_path = os.path.join(
    BASE_DIR,
    "data",
    "destinations.json"
)

with open(json_path, "r", encoding="utf-8") as file:
    DESTINATIONS = json.load(file)