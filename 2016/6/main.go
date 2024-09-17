package main

import (
	"fmt"
	"os"
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

	result_len := len(input_lines[0])
	result := ""
	result_2 := ""

	for i := 0; i < result_len; i++ {
		char_count := make(map[rune]int)

		for _, input_line := range input_lines {
			if input_line == "" {
				continue
			}

			char_count[rune(input_line[i])]++
		}

		max_count := 0
		max_char := rune(0)
		min_count := 1000000
		min_char := rune(0)

		for char, count := range char_count {
			if count > max_count {
				max_count = count
				max_char = char
			}

			if count < min_count {
				min_count = count
				min_char = char
			}
		}

		result += string(max_char)
		result_2 += string(min_char)
	}

	fmt.Println("Part 1:", result)
	fmt.Println("Part 2:", result_2)
}