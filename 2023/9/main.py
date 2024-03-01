with open('input.txt') as f:
    data = f.readlines()
    
def part_1():
    def get_diffs(nums):
        diffs = []
        
        for idx, num in enumerate(nums):
            if idx == 0:
                continue
            
            diffs.append(int(num) - int(nums[idx - 1]))
            
        return diffs
    
    def handle_nums(nums, old_diffs):
        diffs = get_diffs(nums)
        
        if all(x == 0 for x in nums):
            addition = 0
            
            old_diffs.reverse()
            
            for idx, diff in enumerate(old_diffs):
                if idx == 0:
                    continue
                
                addition = old_diffs[idx - 1][-1] + diff[-1]
                old_diffs[idx] = diff + [addition]
                
            return old_diffs[-1][-1]
        else:
            return handle_nums(diffs, old_diffs + [diffs])
    
    result = 0
    
    for line in data:
        nums = [int(num) for num in line.split()]
        result += handle_nums(nums, [nums])
            
    
    return result

def part_2():
    def get_diffs(nums):
        diffs = []
        
        for idx, num in enumerate(nums):
            if idx == 0:
                continue
            
            diffs.append(int(num) - int(nums[idx - 1]))
            
        return diffs
    
    def handle_nums(nums, old_diffs):
        diffs = get_diffs(nums)
        
        if all(x == 0 for x in nums):
            addition = 0
            
            old_diffs.reverse()
            
            print(old_diffs)
            
            for idx, diff in enumerate(old_diffs):
                if idx == 0:
                    continue
                
                addition = diff[0] - old_diffs[idx - 1][0]
                old_diffs[idx] = [addition] + diff
                
            return old_diffs[-1][0]
        else:
            return handle_nums(diffs, old_diffs + [diffs])
    
    result = 0
    
    for line in data:
        nums = [int(num) for num in line.split()]
        result += handle_nums(nums, [nums])
            
    
    return result

print(f'Part 1: {part_1()}')
print(f'Part 2: {part_2()}')