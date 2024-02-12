file = open("input.txt", "r")

total = 0;
num_dict = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9
}

line_number = 0

for line in file:
    result_dict = {}

    for key in num_dict:
        if key in line:
            check_line = line
            while key in check_line:
                idx = check_line.index(key)
                result_dict[idx] = num_dict[key]
                check_line = check_line.replace(key, len(key) * '~', 1)
            
    first_num = result_dict[min(result_dict.keys())]
    last_num = result_dict[max(result_dict.keys())]

    total += int(f"{first_num}{last_num}")
    
print(total)