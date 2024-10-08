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
		fmt.Println(err)
		return
	}

	input_str := string(input)
	result_length := decompressString(input_str, false)
	fmt.Println("Part 1: ", result_length)

	result_length = decompressString(input_str, true)
	fmt.Println("Part 2: ", result_length)
}

func decompressString(input string, recursive bool) int {
	result_length := 0

	for i := 0; i < len(input); {
		character := input[i]

		if character == '(' {
			// Find index of ending parenthesis
			endMarker := strings.Index(input[i:], ")") + i
			// Get the marker
			marker := input[i+1 : endMarker]
			parts := strings.Split(marker, "x")
			pattern, _ := strconv.Atoi(parts[0])
			repeats, _ := strconv.Atoi(parts[1])

			// Move past the marker
			i = endMarker + 1

			// Get the section that will be repeated
			repeatSection := input[i:i+pattern]

			// Calculate the length
			if recursive {
				// For part 2 the repeated pattern needs to be decompressed
				result_length += repeats * decompressString(repeatSection, true)
			} else {
				// For part 1 the repeated pattern does not need to be decompressed
				result_length += repeats * len(repeatSection)
			}

			// Move the index to the end of the repeated section
			i += pattern
		} else {
			// If it's not a marker, just increase the length for a normal character
			result_length++
			i++
		}
	}

	return result_length
}