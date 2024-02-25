with open('input.txt') as f:
    input_data = f.readlines()
    
input_dict = {}

modus = ""

for line in input_data:
    if line.startswith("seeds"):
        input_dict["seeds"] = [int(x) for x in line.split(":")[1].split()]
        continue
        
    if line.endswith("map:\n"):
        modus = line.split()[0]
        input_dict[modus] = []
        continue
        
    if line == "\n":
        modus = ""
        continue
        
        
    numbers = line.split()
    
    dest_start = numbers[0]
    source_start = numbers[1]
    range_length = numbers[2]
    
    input_dict[modus].append({
        "dest_start": int(dest_start),
        "source_start": int(source_start),
        "range_length": int(range_length)
    })

def part_1():
    def get_from_list(idx, lst):
        if not idx:
            return None
        
        for map in lst:
            if idx in range(map['source_start'], map['source_start'] + map['range_length']):
                diff = map['dest_start'] - map['source_start']
                return idx + diff
            
        return idx
    
    result_list = []

    for seed in input_dict["seeds"]:
        soil = get_from_list(seed, input_dict["seed-to-soil"])
        fertilizer = get_from_list(soil, input_dict["soil-to-fertilizer"])
        water = get_from_list(fertilizer, input_dict["fertilizer-to-water"])
        light = get_from_list(water, input_dict["water-to-light"])
        temperature = get_from_list(light, input_dict["light-to-temperature"])
        humidity = get_from_list(temperature, input_dict["temperature-to-humidity"])
        location = get_from_list(humidity, input_dict["humidity-to-location"])
        
        result_list.append({
            "seed": seed,
            "soil": soil,
            "fertilizer": fertilizer,
            "water": water,
            "light": light,
            "temperature": temperature,
            "humidity": humidity,
            "location": location
        })

    seed_min = float('inf')
    location_min = float('inf')

    for result in result_list:
        seed_min = min(result['seed'], seed_min)
        location_min = min(result['location'], location_min)
        
    print(f"Minimum seed: {seed_min}")
    print(f"Minimum location: {location_min}")

def part_2():
    seed_ranges = []
    result_list = []
    
    for idx in range(0, int(len(input_dict["seeds"]) / 2)):
        starting_seed = input_dict["seeds"][idx * 2]
        seed_range = input_dict["seeds"][idx * 2 + 1]
        seed_ranges.append((starting_seed, starting_seed + seed_range))
    
    def get_from_list(idx_ranges, list):
        seed_ranges = idx_ranges.copy()
        results = []
        
        while seed_ranges:
            seed_range = seed_ranges.pop()
            
            starting_seed, ending_seed = seed_range
            
            for map in list:
                starting_map = map['source_start']
                ending_map = map['source_start'] + map['range_length']
                diff_map = map['dest_start'] - map['source_start']
                
                if starting_seed >= ending_map or ending_seed <= starting_map:
                    continue
                if starting_seed < starting_map:
                    seed_ranges.append((starting_seed, starting_map))
                    starting_seed = starting_map
                if ending_seed > ending_map:
                    seed_ranges.append((ending_map, ending_seed))
                    ending_seed = ending_map
                results.append((starting_seed + diff_map, ending_seed + diff_map))
                break
            else:
                results.append((starting_seed, ending_seed))
            
        return results

    soil = get_from_list(seed_ranges, input_dict["seed-to-soil"])
    fertilizer = get_from_list(soil, input_dict["soil-to-fertilizer"])
    water = get_from_list(fertilizer, input_dict["fertilizer-to-water"])
    light = get_from_list(water, input_dict["water-to-light"])
    temperature = get_from_list(light, input_dict["light-to-temperature"])
    humidity = get_from_list(temperature, input_dict["temperature-to-humidity"])
    location = get_from_list(humidity, input_dict["humidity-to-location"])

    location_min = float('inf')

    for loc in location:
        location_min = min(loc[0], location_min)
        
    print(f"RANGE: Minimum location: {location_min}")

part_1()
part_2()
