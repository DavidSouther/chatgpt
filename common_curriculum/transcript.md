> Write a function called insertShiftArray which takes in an array and a value to be added. Without utilizing any of the built-in methods available to your language, return an array with the new value added at the middle index.

```js
function insertShiftArray(arr, value) {
  // Determine the middle index of the array
  const middleIndex = Math.ceil(arr.length / 2);

  // Create a new array with the same length as the original array, plus 1
  const newArr = new Array(arr.length + 1);

  // Copy the values from the original array into the new array,
  // starting at index 0 and stopping at the middle index
  for (let i = 0; i < middleIndex; i++) {
    newArr[i] = arr[i];
  }

  // Set the value at the middle index to be the value passed to the function
  newArr[middleIndex] = value;

  // Copy the remaining values from the original array into the new array,
  // starting at the middle index + 1 and going until the end of the array
  for (let i = middleIndex + 1; i < newArr.length; i++) {
    newArr[i] = arr[i - 1];
  }

  // Return the new array
  return newArr;
}
```

---

> What about in Python?

```py
def insertShiftArray(arr, value):
  # Determine the middle index of the array
  middle_index = len(arr) // 2

  # Create a new list with the same length as the original array, plus 1
  new_arr = [None] * (len(arr) + 1)

  # Copy the values from the original array into the new array,
  # starting at index 0 and stopping at the middle index
  for i in range(middle_index):
    new_arr[i] = arr[i]

  # Set the value at the middle index to be the value passed to the function
  new_arr[middle_index] = value

  # Copy the remaining values from the original array into the new array,
  # starting at the middle index + 1 and going until the end of the array
  for i in range(middle_index + 1, len(new_arr)):
    new_arr[i] = arr[i - 1]

  # Return the new array
  return new_arr
```

---

> Write a function called BinarySearch which takes in 2 parameters: a sorted array and the search key. Without utilizing any of the built-in methods available to your language, return the index of the array's element that is equal to the value of the search key, or -1 if the element is not in the array.

```py
def BinarySearch(arr, key):
  # Set the initial values for the start and end indices
  start = 0
  end = len(arr) - 1

  # Loop while the start index is less than or equal to the end index
  while start <= end:
    # Calculate the middle index
    middle = (start + end) // 2

    # If the value at the middle index is equal to the search key,
    # return the middle index
    if arr[middle] == key:
      return middle

    # If the value at the middle index is less than the search key,
    # update the start index to be the middle index + 1
    elif arr[middle] < key:
      start = middle + 1

    # Otherwise, the value at the middle index is greater than the search key,
    # so update the end index to be the middle index - 1
    else:
      end = middle - 1

  # If the search key is not found in the array, return -1
  return -1
```

---

> In C, Given a matrix, find the sum of each row.

```c
#include <stdio.h>

#define NROWS 3
#define NCOLS 3

void sumRows(int matrix[NROWS][NCOLS]) {
  for (int i = 0; i < NROWS; i++) {
    int sum = 0;
    for (int j = 0; j < NCOLS; j++) {
      sum += matrix[i][j];
    }
    printf("Sum of row %d: %d\n", i, sum);
  }
}

int main() {
  int matrix[NROWS][NCOLS] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
  sumRows(matrix);
  return 0;
}
```

---

> Generate the nth Fibonacci number, in Rust

```rust
fn fibonacci(n: u32) -> u32 {
    if n <= 1 {
        return n;
    }

    fibonacci(n - 1) + fibonacci(n - 2)
}
```

---

> Oh nice, but without recursion?

```rust
fn fibonacci(n: u32) -> u32 {
    if n <= 1 {
        return n;
    }

    let mut a = 0;
    let mut b = 1;

    for _ in 1..n {
        let temp = a;
        a = b;
        b = temp + b;
    }

    b
}
```

---

> k-th value from the end of a linked list in java

```java
public class ListNode {
  int val;
  ListNode next;

  public ListNode(int val) {
    this.val = val;
  }
}

public int findKthFromEnd(ListNode head, int k) {
  // Check if the linked list is empty
  if (head == null) {
    return -1;
  }

  // Create two pointers, one k nodes behind the other
  ListNode fast = head;
  ListNode slow = head;
  for (int i = 0; i < k; i++) {
    fast = fast.next;

    // If the fast pointer has reached the end of the list,
    // then the k-th value does not exist
    if (fast == null) {
      return -1;
    }
  }

  // Move both pointers until the fast pointer reaches the end of the list
  while (fast.next != null) {
    fast = fast.next;
    slow = slow.next;
  }

  // Return the value of the slow pointer, which is the k-th value from the end
  return slow.val;
}
```

---

> Zip two linked lists.

```java
public class ListNode {
  int val;
  ListNode next;

  public ListNode(int val) {
    this.val = val;
  }
}

public ListNode zipLists(ListNode head1, ListNode head2) {
  // Create a new linked list to hold the zipped elements
  ListNode zippedList = new ListNode(0);
  ListNode curr = zippedList;

  // Loop while both linked lists have elements remaining
  while (head1 != null && head2 != null) {
    // Add the next element from the first linked list to the zipped list
    curr.next = head1;
    head1 = head1.next;
    curr = curr.next;

    // Add the next element from the
```

---

> Would that be easier in ocaml?
