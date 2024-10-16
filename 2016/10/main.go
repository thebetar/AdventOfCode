package main

import (
	"fmt"
	"os"
	"regexp"
	"strings"
)

func get_number(s string) int {
	var num int
	
	if strings.HasPrefix(s, "bot") {
		fmt.Sscanf(s, "bot %d", &num)
	} else {
		fmt.Sscanf(s, "output %d", &num)
	}

	return num
}

func main() {
	input, err := os.ReadFile("input.txt")

	if err != nil {
		fmt.Println(err)
		return
	}

	input_str := string(input)

	bots := make(map[int][]int)
	bot_transfers := make(map[int][]string)
	outputs := make(map[int]int)

	input_list := strings.Split(input_str, "\n")

	re := regexp.MustCompile(`(bot \d+|output \d+) gives low to (bot \d+|output \d+) and high to (bot \d+|output \d+)`)

	for _, line := range input_list {
		if strings.Contains(line, "value") {
			var bot, value int
			fmt.Sscanf(line, "value %d goes to bot %d", &value, &bot)
			bots[bot] = append(bots[bot], value)
		} else {
			// Returns an array with first item being the orignal string and the rest being the matches
			matches := re.FindStringSubmatch(line)

			if len(matches) > 3 {
				bot := matches[1]
				low := matches[2]
				high := matches[3]

				bot_transfers[get_number(bot)] = []string{low, high}
			} else {
				fmt.Println("Something went wrong extracing bot transfers")
			}
		}
	}

	for true {
		transfers := 0

		for transfer_bot, transfer := range bot_transfers {
			if len(bots[transfer_bot]) == 2 {
				transfers++

				low, high := bots[transfer_bot][0], bots[transfer_bot][1]

				if low > high {
					low, high = high, low
				}

				if low == 17 && high == 61 {
					fmt.Println("Part 1: ", transfer_bot)
				}

				// Check if the output is an output or a bot
				if strings.HasPrefix(transfer[0], "output") {
					outputs[get_number(transfer[0])] = low
				} else {
					bots[get_number(transfer[0])] = append(bots[get_number(transfer[0])], low)
				}

				// Check if the output is an output or a bot
				if (strings.HasPrefix(transfer[1], "output")) {
					outputs[get_number(transfer[1])] = high
				} else {
					bots[get_number(transfer[1])] = append(bots[get_number(transfer[1])], high)
				}

				// Both values are transfered, remove them from the bot
				bots[transfer_bot] = []int{}
			}
		}

		if transfers == 0 {
			fmt.Println("Part 2: ", outputs[0] * outputs[1] * outputs[2])
			break
		}
	}
}