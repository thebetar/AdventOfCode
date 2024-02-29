import re

workflows = []
parts = []

with open('input.txt') as f:
    data = f.read()
    workflows_data, parts_data = data.split('\n\n')
    
    for workflow in workflows_data.split('\n'):
        name, rules = re.findall(r'(\w+)\{([^}]+)\}', workflow)[0]
        rules = rules.split(',')
        
        workflows.append((name, rules))
        
    for part in parts_data.split('\n'):
        x, m, a, s = re.findall(r'\w=(\d+),\w=(\d+),\w=(\d+),\w=(\d+)', part)[0]
        
        parts.append({
            'x': int(x),
            'm': int(m),
            'a': int(a),
            's': int(s)
        })
    
def part_1():
    total = 0
    start_index = [x[0] for x in workflows].index('in')
    
    operators = {
        '>': lambda x, y: x > y,
        '<': lambda x, y: x < y,
        '=': lambda x, y: x == y
    }
    
    def get_workflow(name):
        index = [x[0] for x in workflows].index(name)
        return workflows[index]
    
    for part in parts:
        part_result = ''
        workflow = workflows[start_index]
        
        while part_result == '':
            rules = workflow[1]
            
            print(rules)
            
            for rule in rules:
                if rule == 'A':
                    total += sum(part.values())
                    part_result = 'A'
                    break
                elif rule == 'R':
                    part_result = 'R'
                    break
                elif re.match(r'^[a-z]+$', rule):
                    workflow = get_workflow(rule)
                    break
                else:
                    property, operator, value, result = re.findall(r'(\w+)([><=])(\d+):(\w+)', rule)[0]
                    
                    if operators[operator](part[property], int(value)):
                        if result == 'A':
                            total += sum(part.values())
                            part_result = 'A'
                        elif result == 'R':
                            part_result = 'R'
                        else:
                            workflow = get_workflow(result)
                        break
    return total

print(f'Part 1: {part_1()}')