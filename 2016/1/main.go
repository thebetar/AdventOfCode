package main

import (
	"fmt"
	"math"
	"os"
	"strconv"
	"strings"
)

func main() {
	input, err := os.ReadFile("input.txt")

	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	str_input := string(input)

	input_list := strings.Split(str_input, ", ")

	cur_dir := "N"
	cur_location := [2]int{0, 0}

	location_history := make(map[[2]int]bool)
	step_2 := false

	// Part 1
	for _, item := range input_list {
		dir := item[0]
		steps := item[1:]

		i_steps, err := strconv.Atoi(steps)

		if err != nil {
			fmt.Println(err)
			os.Exit(1)
		}

		if dir == 'R' {
			switch cur_dir {
			case "N":
				cur_dir = "E"
			case "E":
				cur_dir = "S"
			case "S":
				cur_dir = "W"
			case "W":
				cur_dir = "N"
			}
		} else {
			switch cur_dir {
			case "N":
				cur_dir = "W"
			case "W":
				cur_dir = "S"
			case "S":
				cur_dir = "E"
			case "E":
				cur_dir = "N"
			}
		}

		for i := 0; i < i_steps; i++ {
			if cur_dir == "N" {
				cur_location[1] += 1
			} else if cur_dir == "S" {
				cur_location[1] -= 1
			} else if cur_dir == "E" {
				cur_location[0] += 1
			} else {
				cur_location[0] -= 1
			}
	
			if step_2 {
				continue
			}
	
			if location_history[cur_location] {
				fmt.Println("Part 2:", math.Abs(float64(cur_location[0])) + math.Abs(float64(cur_location[1])))
				step_2 = true
			} else {
				location_history[cur_location] = true
			}
		}
	}

	fmt.Println("Part 1:", math.Abs(float64(cur_location[0])) + math.Abs(float64(cur_location[1])))
}