package main

import (
	"crypto/md5"
	"encoding/hex"
	"fmt"
	"strings"
)

func main() {
	input_str := "abbhdwsy"

	current_index := 0
	result := ""

	for len(result) < 8 {
		hash := md5.Sum([]byte(fmt.Sprintf("%s%d", input_str, current_index)))
		hash_str := hex.EncodeToString(hash[:])

		// If the first 5 characters are 0s, add the 6th character to the result
		if hash_str[:5] == "00000" {
			result += string(hash_str[5])
		}

		current_index++
	}

	fmt.Println("Part 1:", result)

	current_index = 0
	result = "________"

	for strings.Index(result, "_") != -1 {
		hash := md5.Sum([]byte(fmt.Sprintf("%s%d", input_str, current_index)))
		hash_str := hex.EncodeToString(hash[:])

		if hash_str[:5] == "00000" {
			// Position 6 is the index of the char
			position := hash_str[5] - '0'

			// Position needs to be valid
			if position < 8 && result[position] == '_' {
				// Add 7th character to the result at index at the 6th character
				result = result[:position] + string(hash_str[6]) + result[position+1:]
			}
		}

		current_index++
	}

	fmt.Println("Part 2:", result)
}