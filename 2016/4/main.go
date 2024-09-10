package main

import (
	"fmt"
	"os"
	"sort"
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
	sum := 0

	for _, input_line := range input_lines {
		if input_line == "" {
			continue
		}

		last_dash := strings.LastIndex(input_line, "-")
		bracket_start := strings.LastIndex(input_line, "[")
		bracket_end := strings.LastIndex(input_line, "]")

		line_name := input_line[:last_dash]
		sector_id_str := input_line[last_dash+1 : bracket_start]
		checksum := input_line[bracket_start+1 : bracket_end]

		result_dict := make(map[rune]int)

		for _, char := range line_name {
			if char == '-' {
				continue
			}

			result_dict[char]++
		}

		type CharCount struct {
			char  rune
			count int
		}

		char_counts := make([]CharCount, 0)

		for char, count := range result_dict {
			char_counts = append(char_counts, CharCount{char, count})
		}

		// Sort list of CharCount structs
		sort.Slice(char_counts, func(i int, j int) bool {
			// Compare counts first
			if char_counts[i].count == char_counts[j].count {
				// Compare ascii values since it is alphabetically
				return char_counts[i].char < char_counts[j].char
			}
			// If counts are different, compare them
			return char_counts[i].count > char_counts[j].count
		})

		expected_checksum := ""

		for i := 0; i < 5; i++ {
			expected_checksum += string(char_counts[i].char)
		}

		if expected_checksum == checksum {
			sector_id, _ := strconv.Atoi(sector_id_str)

			sum += sector_id
		}
	}

	fmt.Println("Part 1:", sum)

	// Part 2
	for _, input_line := range input_lines {
		if input_line == "" {
			continue
		}

		last_dash := strings.LastIndex(input_line, "-")
		bracket_start := strings.LastIndex(input_line, "[")

		line_name := input_line[:last_dash]
		sector_id_str := input_line[last_dash+1 : bracket_start]

		sector_id, _ := strconv.Atoi(sector_id_str)

		decrypted_name := ""

		for _, char := range line_name {
			if char == '-' {
				decrypted_name += " "
				continue
			}

			// Rotate char by sector_id (mod 26 because alphabet has 26 letters)
			rotated_char := char + rune(sector_id % 26)

			// If rotated_char is out of bounds, wrap around
			if rotated_char > 'z' {
				rotated_char -= 26
			}

			// Add rotated_char to decrypted_name
			decrypted_name += string(rotated_char)
		}

		// Print out all names for fun
		fmt.Println(decrypted_name)

		// Check if decrypted_name contains "northpole object storage"
		if strings.Contains(decrypted_name, "northpole object storage") {
			fmt.Println("Part 2:", sector_id)
			break
		}
	}
}