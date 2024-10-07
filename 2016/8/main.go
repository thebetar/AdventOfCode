package main

import (
	"fmt"
	"os"
	"strings"
)

func main() {
	// Create matrix of 50 wide by 6 high filled with 0
	matrix := make([][]bool, 6)

	for i := range matrix {
		matrix[i] = make([]bool, 50)
	}

	// Read input
	input, err := os.ReadFile("input.txt")

	if err != nil {
		fmt.Println(err)
		return
	}

	input_str := string(input)
	lines := strings.Split(input_str, "\n")

	for _, line := range lines {
		if strings.HasPrefix(line, "rect") {
			var width, height int
			fmt.Sscanf(line, "rect %dx%d", &width, &height)

			for i := 0; i < height; i++ {
				for j := 0; j < width; j++ {
					matrix[i][j] = true
				}
			}
		} else if strings.HasPrefix(line, "rotate row") {
			var row, shift int
			fmt.Sscanf(line, "rotate row y=%d by %d", &row, &shift)

			for i := 0; i < shift; i++ {
				tmp := matrix[row][len(matrix[row])-1]

				for j := len(matrix[row]) - 1; j > 0; j-- {
					matrix[row][j] = matrix[row][j-1]
				}

				matrix[row][0] = tmp
			}
		} else if strings.HasPrefix(line, "rotate column") {
			var col, shift int
			fmt.Sscanf(line, "rotate column x=%d by %d", &col, &shift)

			for i := 0; i < shift; i++ {
				tmp := matrix[len(matrix)-1][col]

				for j := len(matrix) - 1; j > 0; j-- {
					matrix[j][col] = matrix[j-1][col]
				}

				matrix[0][col] = tmp
			}
		}
	}

	// Count lit pixels
	count := 0

	for i := range matrix {
		for j := range matrix[i] {
			if matrix[i][j] {
				count++
			}
		}
	}

	fmt.Println("Part 1: ", count)

	// Print part 2 the pixel grid
	for i := range matrix {
		for j := range matrix[i] {
			if matrix[i][j] {
				fmt.Print("#")
			} else {
				fmt.Print(" ")
			}
		}

		fmt.Println()
	}
}