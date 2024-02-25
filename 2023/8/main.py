from itertools import cycle
import math

with open('input.txt') as f:
    input_data = f.read().splitlines()
    
directions = input_data[0]
steps = {}

for line in input_data[2:]:
    info = line.split(' = ')
    steps_destinations = info[1].replace('(', '').replace(')', '').split(', ')
    steps[info[0]] = steps_destinations

def part_1():
    counter = 0
    cur_step = 'AAA'
    found = False

    while not found:
        for direction in directions:
            counter += 1
            
            if direction == "L":
                cur_step = steps[cur_step][0]
            elif direction == "R":
                cur_step = steps[cur_step][1]
            
            if cur_step == 'ZZZ':
                found = True
    
    return counter

def part_2():
    results = {}
    positions = []
    
    for position in steps.keys():
        if position.endswith('A'):
            positions.append(position)
    
    for position in positions:
        for count, step in enumerate(cycle(directions), start=1):
            counter += 1
            
            if step == "L":
                position = steps[position][0]
            elif step == "R":
                position = steps[position][1]
                
            if position.endswith('Z'):
                results[position] = count
                break
        
    return math.lcm(*results.values())

print(f"Part 1: {part_1()}")
print(f"Part 2: {part_2()}")
