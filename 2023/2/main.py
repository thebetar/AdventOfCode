check_values = {
    'red': 12,
    'green': 13,
    'blue': 14
}

def part1():
    file = open('input.txt', 'r')
    
    id = 0
    total = 0

    for line in file:
        id += 1
        
        info = line.split(':')[1].replace('\n', '')
        rounds = info.split(';')
        
        possible = True
        
        for round in rounds:
            marbles = round.split(',')
            
            for marble in marbles:
                marble_color = marble.split(" ")[2]
                marble_amount = marble.split(" ")[1]
                
                if(check_values[marble_color] < int(marble_amount)):
                    possible = False
                    break
        
        if possible:
            total += id  
    
    file.close()
    
    return total

def part2():
    file = open('input.txt', 'r')
    
    id = 0
    total = 0
    
    for line in file:
        id += 1
        
        result_dict = {
            'red': 0,
            'green': 0,
            'blue': 0
        }
        
        info = line.split(':')[1].replace('\n', '')
        rounds = info.split(';')
        
        for round in rounds:
            marbles = round.split(',')
            
            for marble in marbles:
                marble_color = marble.split(" ")[2]
                marble_amount = int(marble.split(" ")[1])
                
                if result_dict[marble_color] < marble_amount:
                    result_dict[marble_color] = marble_amount
    
        total += (result_dict['red'] * result_dict['green'] * result_dict['blue'])
    
    file.close()
    
    return total

print(part1())
print(part2())