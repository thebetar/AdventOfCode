package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	input, err := os.ReadFile("input.txt")

	if err != nil {
		fmt.Println("No file found")
		os.Exit(1)
	}

	input_str := string(input)
	input_lines := strings.Split(input_str, "\n")

	// Part 1
	result := ""
	cur_key := [2]int{2, 2}

	for i := 0; i < len(input_lines); i++ {
		input_line := input_lines[i]
		steps := strings.Split(input_line, "")

		for j := 0; j < len(steps); j++ {
			step := steps[j]

			switch step {
			case "D":
				if cur_key[1] < 3 {
					cur_key[1] += 1
				}
			case "U":
				if cur_key[1] > 1 {
					cur_key[1] -= 1
				}
			case "R":
				if cur_key[0] < 3 {
					cur_key[0] += 1
				}
			case "L":
				if cur_key[0] > 1 {
					cur_key[0] -= 1
				}
			}
		}

		next_key := cur_key[0] + ((cur_key[1] - 1) * 3)
		result += strconv.Itoa(next_key)
	}

	fmt.Println(result)

	// Part 2
	result = ""
	cur_key = [2]int{3, 3}

	for i := 0; i < len(input_lines); i++ {
		input_line := input_lines[i]
		steps := strings.Split(input_line, "")

		for j := 0; j < len(steps); j++ {
			step := steps[j]

			switch step {
			case "D":
				if (cur_key[1] < 3 && cur_key[0] == 1) ||
					(cur_key[1] < 4 && cur_key[0] == 2) ||
					(cur_key[1] < 5 && cur_key[0] == 3) ||
					(cur_key[1] < 4 && cur_key[0] == 4) ||
					(cur_key[1] < 3 && cur_key[0] == 5) {
					cur_key[1] += 1
				}
			case "U":
				if (cur_key[1] > 3 && cur_key[0] == 1) ||
					(cur_key[1] > 2 && cur_key[0] == 2) ||
					(cur_key[1] > 1 && cur_key[0] == 3) ||
					(cur_key[1] > 2 && cur_key[0] == 4) ||
					(cur_key[1] > 3 && cur_key[0] == 5) {
					cur_key[1] -= 1
				}
			case "R":
				if (cur_key[0] < 3 && cur_key[1] == 1) ||
					(cur_key[0] < 4 && cur_key[1] == 2) ||
					(cur_key[0] < 5 && cur_key[1] == 3) ||
					(cur_key[0] < 4 && cur_key[1] == 4) ||
					(cur_key[0] < 3 && cur_key[1] == 5) {
					cur_key[0] += 1
				}
			case "L":
				if (cur_key[0] > 3 && cur_key[1] == 1) ||
					(cur_key[0] > 2 && cur_key[1] == 2) ||
					(cur_key[0] > 1 && cur_key[1] == 3) ||
					(cur_key[0] > 2 && cur_key[1] == 4) ||
					(cur_key[0] > 3 && cur_key[1] == 5) {
					cur_key[0] -= 1
				}
			}
		}
		
		if cur_key[0] == 3 && cur_key[1] == 1 {
			result += "1"
		} else if cur_key[0] == 2 && cur_key[1] == 2 {
			result += "2"
		} else if cur_key[0] == 3 && cur_key[1] == 2 {
			result += "3"
		} else if cur_key[0] == 4 && cur_key[1] == 2 {
			result += "4"
		} else if cur_key[0] == 1 && cur_key[1] == 3 {
			result += "5"
		} else if cur_key[0] == 2 && cur_key[1] == 3 {
			result += "6"
		} else if cur_key[0] == 3 && cur_key[1] == 3 {
			result += "7"
		} else if cur_key[0] == 4 && cur_key[1] == 3 {
			result += "8"
		} else if cur_key[0] == 5 && cur_key[1] == 3 {
			result += "9"
		} else if cur_key[0] == 2 && cur_key[1] == 4 {
			result += "A"
		} else if cur_key[0] == 3 && cur_key[1] == 4 {
			result += "B"
		} else if cur_key[0] == 4 && cur_key[1] == 4 {
			result += "C"
		} else if cur_key[0] == 3 && cur_key[1] == 5 {
			result += "D"
		}
	}

	fmt.Println(result)
}