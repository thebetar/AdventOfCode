with open('input.txt', 'r') as f:
    input_list = f.read().splitlines()

def part_1():
    total_points = 0
    
    for card in input_list:
        card_points = 0
        input = card.split(":")[1]
        
        winning_numbers, game_numbers = input.split("|")
        
        winning_numbers = [number for number in winning_numbers.split(" ") if number.isdigit()]
        game_numbers = [number for number in game_numbers.split(" ") if number.isdigit()]
        
        for winning_number in winning_numbers:
            if winning_number in game_numbers:
                if card_points == 0:
                    card_points = 1
                else:
                    card_points *= 2
        
        total_points += card_points
        
    return total_points

def part_2():
    card_dict = {}
    
    for card in input_list:
        card_num = card.split(":")[0].split(" ")[-1]
        card_dict[card_num] = 1
    
    for card in input_list:
        card_points = 0
        card_num = card.split(":")[0].split(" ")[-1]
        input = card.split(":")[1]
        
        winning_numbers, game_numbers = input.split("|")
        
        winning_numbers = [number for number in winning_numbers.split(" ") if number.isdigit()]
        game_numbers = [number for number in game_numbers.split(" ") if number.isdigit()]
        
        for winning_number in winning_numbers:
            if winning_number in game_numbers:
                card_points += 1
        
        for point in range(1, card_points + 1):
            if(str(int(card_num) + point) in card_dict):
                card_dict[str(int(card_num) + point)] += card_dict[card_num]
    
    return sum(card_dict.values())

print(part_1())
print(part_2())
