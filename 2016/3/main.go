package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func get_count(input_lines []string) int {
	// Part 1
	count := 0

	for i := 0; i < len(input_lines); i++ {
		values := strings.Split((input_lines[i]), " ")

		valid := true

		for j := 0; j < len(values); j++ {
			cur_value, _ := strconv.Atoi(values[j])

			sum := 0

			// Check if sum of other values is higher
			for k := 0; k < len(values); k++ {
				if j == k {
					continue
				}

				sum_value, _ := strconv.Atoi(values[k])
				sum += sum_value
			}

			if sum <= cur_value {
				valid = false
				break
			}
		}

		if valid {
			count++
		}
	}

	return count
}

func main() {
	input, err := os.ReadFile("input.txt")

	if err != nil {
		fmt.Println("No file found")
		os.Exit(1)
	}

	input_str := string(input)

	// Part 1
	input_lines := strings.Split(input_str, "\n")
	count := get_count(input_lines)

	fmt.Println("Part 1:", count)

	// Part 2
	input_lines_new := []string{}

	for i := 0; i < len(input_lines) / 3; i++ {
		start_i := i * 3
		
		row_1 := strings.Split(input_lines[start_i], " ")
		row_2 := strings.Split(input_lines[start_i + 1], " ")
		row_3 := strings.Split(input_lines[start_i + 2], " ")

		input_lines_new = append(input_lines_new, row_1[0] + " " + row_2[0] + " " + row_3[0])
		input_lines_new = append(input_lines_new, row_1[1] + " " + row_2[1] + " " + row_3[1])
		input_lines_new = append(input_lines_new, row_1[2] + " " + row_2[2] + " " + row_3[2])
	}

	count = get_count(input_lines_new)

	fmt.Println("Part 2:", count)
}