import numpy as np
import sys
import math

sys.setrecursionlimit(10**6)

dict = {
    '|': 'n-s',
    '-': 'w-e',
    'L': 'n-e',
    'J': 'n-w',
    '7': 's-w',
    'F': 's-e',
    '.': '',
}


with open('input.txt', 'r') as f:
    data = f.read().split('\n')
    data = [np.array(list(x)) for x in data]

dataMat = np.matrix(data)

def problem():
    indexA = np.where(dataMat == 'S')
    history = []
    
    def get_direction(label):
        if 'n' in label:
            return (-1, 0)
        if 's' in label:
            return (1, 0)
        if 'w' in label:
            return (0, -1)
        if 'e' in label:
            return (0, 1)
        
    def reverse_direction(direction):
        if direction == 'n':
            return 's'
        if direction == 's':
            return 'n'
        if direction == 'w':
            return 'e'
        if direction == 'e':
            return 'w'
        
    def get_new_direction(old_direction, new_direction):
        return new_direction.replace(old_direction, '').replace('-', '')
    
    def get_step(starting_pos, direction_label, count):
        direction = get_direction(direction_label)
        new_pos = (starting_pos[0] + direction[0], starting_pos[1] + direction[1])
        history.append(new_pos)
        
        if new_pos == '.':
            return 0
        
        if dataMat[new_pos[0], new_pos[1]] == 'S':
            return count
        
        new_direction = get_new_direction(reverse_direction(direction_label), dict[dataMat[new_pos[0], new_pos[1]]])
        
        if dataMat[new_pos[0], new_pos[1]] in [symbol for symbol in dict.keys() if new_direction in dict[symbol]]:
            return get_step(new_pos, new_direction, count + 1)
        
    
    results = []
    starting_pos = (indexA[0][0], indexA[1][0])
    
    if dataMat[starting_pos[0] - 1, starting_pos[1]] in [symbol for symbol in dict.keys() if 's' in dict[symbol]]:
        new_pos = (starting_pos[0] - 1, starting_pos[1])
        history.append(new_pos)
        new_direction = get_new_direction('s', dict[dataMat[new_pos[0], new_pos[1]]])
        results.append(get_step(new_pos, new_direction, 1))
    if dataMat[starting_pos[0] + 1, starting_pos[1]] in [symbol for symbol in dict.keys() if 'n' in dict[symbol]]:
        new_pos = (starting_pos[0] + 1, starting_pos[1])
        history.append(new_pos)
        new_direction = get_new_direction('n', dict[dataMat[new_pos[0], new_pos[1]]])
        results.append(get_step(new_pos, new_direction, 1))
    if dataMat[starting_pos[0], starting_pos[1] - 1] in [symbol for symbol in dict.keys() if 'e' in dict[symbol]]:
        new_pos = (starting_pos[0], starting_pos[1] - 1)
        history.append(new_pos)
        new_direction = get_new_direction('e', dict[dataMat[new_pos[0], new_pos[1]]])
        results.append(get_step(new_pos, new_direction, 1))
    if dataMat[starting_pos[0], starting_pos[1] + 1] in [symbol for symbol in dict.keys() if 'w' in dict[symbol]]:
        new_pos = (starting_pos[0], starting_pos[1] + 1)
        history.append(new_pos)
        new_direction = get_new_direction('w', dict[dataMat[new_pos[0], new_pos[1]]])
        results.append(get_step(new_pos, new_direction, 1))

    result_1 = max([x for x in results if x is not None])
    result_1 = math.ceil(result_1 / 2)

    # print(history)

    result_2 = set()

    within = False

    for i, j in np.ndindex(dataMat.shape):
        if (i, j) in history:
            if dataMat[i, j] in ['|', 'L', 'J']:
                within = not within
        elif within:
            result_2.add((j, i))    
        
    result_2 = len(result_2)

    return result_1, result_2

result_1, result_2 = problem()

print(f"Part 1: {result_1}")
print(f"Part 2: {result_2}")

