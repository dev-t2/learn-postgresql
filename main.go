package main

import (
	"bufio"
	"fmt"
	"math/rand"
	"os"
	"strconv"
)

func readNumbers(filename string) ([]string, error){
	file, err := os.Open(filename)

	if err != nil {
		return nil, err
	}

	defer file.Close()

	var scanner = bufio.NewScanner(file)

	var numbers []string

	for scanner.Scan() {
		numbers = append(numbers, scanner.Text())
	}

	return numbers, nil
}

func main() {
	if len(os.Args) < 3 {
		fmt.Println("Invalid Arguments")

		return
	}

	var filename = os.Args[1]

	count, err := strconv.Atoi(os.Args[2])

	if err != nil {
		fmt.Println(err)

		return
	}

	numbers, err := readNumbers(filename)

	if err != nil {
		fmt.Println(err)

		return
	}

	var results = make([]string, count)

	for i := 0; i < count; i++ {
		var n = rand.Intn(len(numbers))

		results[i] = numbers[n]

		numbers = append(numbers[:n], numbers[n+1:]...)
	}

	for _, result := range results {
		fmt.Printf("%s ", result)
	}
}