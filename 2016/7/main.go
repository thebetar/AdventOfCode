package main

import (
	"fmt"
	"os"
	"strings"
)

func main() {
	// Get file
	file, err := os.ReadFile("input.txt")

	// Check for errors
	if err != nil {
		fmt.Println(err)
		return
	}

	input_str := string(file)
	input_lines := strings.Split(input_str, "\n")

	tls_count := 0
	ssl_count := 0

	for _, line := range input_lines {
		pair_found := false
		pair_found_inside := false
		inside_brackets := false

		short_pair := []string{}
		short_pair_found := false
		short_pair_inside := []string{}
		short_pair_found_inside := false

		// Compare characters to find double pair
		for i := 0; i < len(line) - 3; i++ {
			character_1 := line[i]
			character_2 := line[i+1]

			if character_1 == character_2 {
				continue
			}

			if character_1 == '[' {
				inside_brackets = true
				continue
			}

			if character_1 == ']' {
				inside_brackets = false
				continue
			}

			character_3 := line[i+2]
			character_4 := line[i+3]

			// Part 1 pattern search
			if string(character_1) + string(character_2) == string(character_4) + string(character_3) {
				if inside_brackets {
					pair_found_inside = true
				} else {
					pair_found = true
				}
			}

			// Part 2 pattern search
			if character_1 == character_3 && character_1 != character_2 {
				pattern := string(character_1) + string(character_2) + string(character_3)

				// If [ or ] in pattern then skip
				if strings.ContainsAny(pattern, "[]") {
					continue
				}

				if inside_brackets {
					short_pair_found_inside = true
					short_pair_inside = append(short_pair_inside, pattern)
				} else {
					short_pair_found = true
					short_pair = append(short_pair, pattern)
				}
			}

			if character_2 == character_4 && character_2 != character_3 {
				pattern := string(character_2) + string(character_3) + string(character_4)

				// If [ or ] in pattern then skip
				if strings.ContainsAny(pattern, "[]") {
					continue
				}

				if inside_brackets {
					short_pair_found_inside = true
					short_pair_inside = append(short_pair_inside, pattern)
				} else {
					short_pair_found = true
					short_pair = append(short_pair, pattern)
				}
			}
		}

		if pair_found && !pair_found_inside {
			tls_count++
		}

		loop_break := false

		if short_pair_found && short_pair_found_inside {
			for _, pair := range short_pair {
				if loop_break {
					break
				}

				reversed_pair := string(pair[1]) + string(pair[0]) + string(pair[1])

				for _, pair_inside := range short_pair_inside {
					if pair_inside == reversed_pair {
						ssl_count++
						loop_break = true
						break
					}
				}
			}
		}
	}

	fmt.Println("Part 1:", tls_count)
	fmt.Println("Part 2:", ssl_count)
}