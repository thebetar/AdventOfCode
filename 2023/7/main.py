from collections import Counter
from functools import cmp_to_key

with open("input.txt", "r") as f:
    data = f.readlines()

def part_1():
    def determine_value(hand):
        same_cards_in_hand = sorted(Counter(hand).values(), reverse=True)
        

        # Five of a kind
        if same_cards_in_hand[0] == 5:
            return 7
        # Four of a kind
        elif same_cards_in_hand[0] == 4:
            return 6
        # Full house
        elif same_cards_in_hand[0] == 3 and same_cards_in_hand[1] == 2:
            return 5
        # Three of kind
        elif same_cards_in_hand[0] == 3:
            return 4
        # Two pairs
        elif same_cards_in_hand[0] == 2 and same_cards_in_hand[1] == 2:
            return 3
        # One pair
        elif same_cards_in_hand[0] == 2:
            return 2
        # High card
        else:
            return 1
    
    card_scores = {
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
        'T': 10,
        'J': 11,
        'Q': 12,
        'K': 13,    
        'A': 14
    }
    
    hands = []
    
    for line in data:
        info = line.split()
        hands.append({
            'card': info[0],
            'value': int(info[1])
        })
        
    def compare(handA, handB):
        handAValue = determine_value(handA['card'])
        handBValue = determine_value(handB['card'])
        
        if handAValue > handBValue:
            return 1
        elif handAValue < handBValue:
            return -1
        else:
            handACards = list(handA['card'])
            handBCards = list(handB['card'])
            
            for idx, cardA in enumerate(handACards):
                cardB = handBCards[idx]
                
                if card_scores[cardA] > card_scores[cardB]:
                    return 1
                elif card_scores[cardA] < card_scores[cardB]:
                    return -1
                elif card_scores[cardA] == card_scores[cardB]:
                    continue
        
        
    hands.sort(key=cmp_to_key(compare))
    
    result = 0
    
    for mulltiplier, hand in enumerate(hands, start=1):
        result += hand['value'] * mulltiplier
        
    return result


    def get_type(hand):
        counts = sorted(Counter(hand).values(), reverse=True)
        if counts[0] == 5:
            return 6
        if counts[0] == 4:
            return 5
        if counts[0] == 3 and counts[1] == 2:
            return 4
        if counts[0] == 3:
            return 3
        if counts[0] == 2 and counts[1] == 2:
            return 2
        if counts[0] == 2:
            return 1
        return 0  
      
    def compare(a, b):
        type_a = get_type(a[0])
        type_b = get_type(b[0])
        if type_a > type_b:
            return 1
        if type_a < type_b:
            return -1
        for card_a, card_b in zip(a[0], b[0]):
            if card_a == card_b:
                continue
            a_wins = (cards.index(card_a) > cards.index(card_b))
            return 1 if a_wins else -1

    cards = '23456789TJQKA'
    regex = r'(\w{5}) (\d+)'
    hands = re.findall(regex, puzzle_input)
    hands.sort(key=cmp_to_key(compare))
    total = 0
    
    for rank, (_, bid) in enumerate(hands, start=1):
        total += rank * int(bid)
        
    return total    

def part_2():
    def determine_value(hand):
        jokers = hand.count('J')
        hand = [card for card in hand if card != 'J']
        same_cards_in_hand = sorted(Counter(hand).values(), reverse=True)

        # All cards are jokers
        if not same_cards_in_hand:
            return 7
        # Five of a kind
        if same_cards_in_hand[0] + jokers == 5:
            return 7
        # Four of a kind
        elif same_cards_in_hand[0] + jokers == 4:
            return 6
        # Full house
        elif (same_cards_in_hand[0] + jokers == 3 and same_cards_in_hand[1] == 2):
            return 5
        # Three of kind
        elif same_cards_in_hand[0] + jokers == 3:
            return 4
        # Two pairs
        elif same_cards_in_hand[0] == 2 and (jokers or same_cards_in_hand[1]) == 2:
            return 3
        # One pair
        elif same_cards_in_hand[0] + jokers == 2:
            return 2
        # High card
        else:
            return 1
    
    card_scores = {
        'J': 1,
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
        'T': 10,
        'Q': 12,
        'K': 13,    
        'A': 14
    }
    
    hands = []
    
    for line in data:
        info = line.split()
        hands.append({
            'card': info[0],
            'value': int(info[1])
        })
        
    def compare(handA, handB):
        handAValue = determine_value(handA['card'])
        handBValue = determine_value(handB['card'])
        
        if handAValue > handBValue:
            return 1
        elif handAValue < handBValue:
            return -1
        else:
            handACards = list(handA['card'])
            handBCards = list(handB['card'])
            
            for idx, cardA in enumerate(handACards):
                cardB = handBCards[idx]
                
                if card_scores[cardA] > card_scores[cardB]:
                    return 1
                elif card_scores[cardA] < card_scores[cardB]:
                    return -1
                elif card_scores[cardA] == card_scores[cardB]:
                    continue
        
        
    hands.sort(key=cmp_to_key(compare))
    
    result = 0
    
    for mulltiplier, hand in enumerate(hands, start=1):
        result += hand['value'] * mulltiplier
        
    return result

print(f"Part 1: {part_1()}")
print(f"Part 2: {part_2()}")
