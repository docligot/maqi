import json
import pandas as pd


# Function to convert a CSV to JSON
# Takes the file paths as arguments
def make_json(csvFilePath, jsonFilePath):
    # create a dictionary
    data = {}

    csv_data = pd.read_csv(csvFilePath, sep=",")
    # csv_data = csv_data.to_json(orient="index")  # sample.json
    # csv_data = csv_data.to_json(orient="columns") ##sample_column.json
    # csv_data = csv_data.to_json(orient="table") # sample_table.json
    # csv_data = csv_data.to_json(orient="split") # sample_split.json
    # csv_data = csv_data.to_json(orient="records")  # sample_records.json
    csv_data = csv_data.set_index('date').to_json(orient="index")  # sample_keyed.json set your desired column to be key

    parsed = json.loads(csv_data)
    print(parsed)
    json.dumps(parsed, indent=4)

    # Open a json writer, and use the json.dumps()
    # function to dump data
    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(parsed,
                               indent=4,
                               skipkeys=True,
                               allow_nan=True
                               ))


# Driver Code

# Decide the two file paths according to your
# computer system
csvFilePath = r'sample.csv'
jsonFilePath = r'sample_keyed.json'

# Call the make_json function
make_json(csvFilePath, jsonFilePath)
