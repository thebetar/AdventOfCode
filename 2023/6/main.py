with open("input.txt", "r") as f:
    data = f.readlines()


def part_1():
    times = data[0].split()[1:]
    distances = data[1].split()[1:]
    result = 0

    for idx, time in enumerate(times):
        distance = int(distances[idx])
        total_faster = 0
        
        for i in range(1, int(time) + 1):
            if i * (int(time) - i) > distance:
                total_faster += 1
        
        if result == 0:
            result = total_faster
        else:
            result *= total_faster
    
    return result

def part_2():
    total_faster = 0
    
    time = int(''.join(data[0].split()[1:]))
    distance = int(''.join(data[1].split()[1:]))
    
    for i in range(1, time + 1):
        if i * (time - i) > distance:
            total_faster += 1
            
    return total_faster

print(f"TOTAL: {part_1()}")
print(f"TOTAL FASTER: {part_2()}")
