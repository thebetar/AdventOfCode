with open('input.txt', 'r') as f:
    input_list = f.read().splitlines()

SPECIAL_CHARS = [
    '&',
    '$',
    '%',
    '^',
    '#',
    '=',
    '@',
    '/',
    '+',
    '-',
    '*'
]

def check_char_symbol(char):
    return char in SPECIAL_CHARS

def part_1(): 
    total = 0
    
    def check_row_indices(row, indices):
        for idx in indices:
            if idx < 0 or idx >= len(row):
                continue
            
            if check_char_symbol(row[idx]):
                return True
        return False
        

    def search_around_indices(rowIdx, numIndices):
        row = input_list[rowIdx]
        for idx in numIndices:
            if check_row_indices(row, [idx - 1, idx + 1]):
                return True
        
        if rowIdx != 0:
            row = input_list[rowIdx - 1]
            for idx in numIndices:
                if check_row_indices(row, [idx - 1, idx, idx + 1]):
                    return True
            
        if rowIdx != len(input_list) - 1:
            row = input_list[rowIdx + 1]
            for idx in numIndices:
                if check_row_indices(row, [idx - 1, idx, idx + 1]):
                    return True
                
        return False

    for i in range(len(input_list)):
        line = input_list[i]
        
        num = ''
        indices = []
        
        for idx, char in enumerate(line):
            if char.isdigit():
                indices.append(idx)
                num += char
            else:
                if num:
                    if search_around_indices(i, indices):
                        total += int(num)
                    
                    indices = []
                    num = ''
                
                continue
            
        if num and search_around_indices(i, indices):
            total += int(num)
            
    return total

def part_2():
    total = 0
    
    numbers = []
    symbols = []
    
    for i in range(len(input_list)):
        line = input_list[i]
        
        num = ''
        indices = []
        
        for idx, char in enumerate(line):
            if char.isdigit():
                indices.append(idx)
                num += char
            else:
                if char in SPECIAL_CHARS:
                    symbols.append({
                        'symbol': char,
                        'col': idx,
                        'row': i
                    })
                
                if num:
                    numbers.append({
                        'num': num,
                        'indices': indices,
                        'row': i
                    })
                    
                    indices = []
                    num = ''
                
                continue
            
        if num:
            numbers.append({
                'num': num,
                'indices': indices,
                'row': i
            })
    
    return total

print(part_1())
print(part_2())