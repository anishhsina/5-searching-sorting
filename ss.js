// Helper function to parse array input
function parseArray(str) {
  return str
    .split(",")
    .map((x) => parseInt(x.trim()))
    .filter((x) => !isNaN(x));
}

// Helper function to display result
function showResult(elementId, message, isError = false) {
  const element = document.getElementById(elementId);
  element.innerHTML = message;
  element.className = isError ? "result error" : "result";
}

// Helper function to visualize array
function visualizeArray(arr, highlightIndices = [], foundIndices = []) {
  return arr
    .map((val, idx) => {
      let className = "array-element";
      if (foundIndices.includes(idx)) className += " found";
      else if (highlightIndices.includes(idx)) className += " highlight";
      return `<span class="${className}">${val}</span>`;
    })
    .join("");
}

// ======================== SEARCHING ALGORITHMS ========================

// Binary Search - Iterative Implementation
function binarySearchIterative(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}

// Binary Search - Recursive Implementation
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) return -1;

  let mid = Math.floor((left + right) / 2);

  if (arr[mid] === target) {
    return mid;
  } else if (arr[mid] < target) {
    return binarySearchRecursive(arr, target, mid + 1, right);
  } else {
    return binarySearchRecursive(arr, target, left, mid - 1);
  }
}

// Test Binary Search Functions
function testBinarySearch() {
  try {
    const arr = parseArray(document.getElementById("bsArray").value);
    const target = parseInt(document.getElementById("bsTarget").value);

    if (arr.length === 0) {
      showResult("bsResult", "Please enter a valid array", true);
      return;
    }

    const result = binarySearchIterative(arr, target);
    const visual = visualizeArray(arr, [], result !== -1 ? [result] : []);

    if (result !== -1) {
      showResult(
        "bsResult",
        `<h4>Found at index: ${result}</h4>
                 <div class="array-visual">${visual}</div>
                 <p>Target ${target} found at position ${result}</p>`
      );
    } else {
      showResult(
        "bsResult",
        `<h4>Not Found</h4>
                 <div class="array-visual">${visual}</div>
                 <p>Target ${target} not found in array</p>`
      );
    }
  } catch (error) {
    showResult("bsResult", "Error: " + error.message, true);
  }
}

function testBinarySearchRecursive() {
  try {
    const arr = parseArray(document.getElementById("bsArray").value);
    const target = parseInt(document.getElementById("bsTarget").value);

    if (arr.length === 0) {
      showResult("bsResult", "Please enter a valid array", true);
      return;
    }

    const result = binarySearchRecursive(arr, target);
    const visual = visualizeArray(arr, [], result !== -1 ? [result] : []);

    if (result !== -1) {
      showResult(
        "bsResult",
        `<h4>Found at index: ${result} (Recursive)</h4>
                 <div class="array-visual">${visual}</div>
                 <p>Target ${target} found at position ${result}</p>`
      );
    } else {
      showResult(
        "bsResult",
        `<h4>Not Found (Recursive)</h4>
                 <div class="array-visual">${visual}</div>
                 <p>Target ${target} not found in array</p>`
      );
    }
  } catch (error) {
    showResult("bsResult", "Error: " + error.message, true);
  }
}

// Find First and Last Occurrence of Element
function findFirstLast(arr, target) {
  function findFirst(arr, target) {
    let left = 0,
      right = arr.length - 1,
      result = -1;
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (arr[mid] === target) {
        result = mid;
        right = mid - 1; // Continue searching left
      } else if (arr[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return result;
  }

  function findLast(arr, target) {
    let left = 0,
      right = arr.length - 1,
      result = -1;
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (arr[mid] === target) {
        result = mid;
        left = mid + 1; // Continue searching right
      } else if (arr[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return result;
  }

  return [findFirst(arr, target), findLast(arr, target)];
}

function testFirstLast() {
  try {
    const arr = parseArray(document.getElementById("flArray").value);
    const target = parseInt(document.getElementById("flTarget").value);

    if (arr.length === 0) {
      showResult("flResult", "Please enter a valid array", true);
      return;
    }

    const [first, last] = findFirstLast(arr, target);
    const foundIndices = [];
    if (first !== -1 && last !== -1) {
      for (let i = first; i <= last; i++) {
        foundIndices.push(i);
      }
    }
    const visual = visualizeArray(arr, [], foundIndices);

    if (first !== -1 && last !== -1) {
      showResult(
        "flResult",
        `<h4>First occurrence: ${first}, Last occurrence: ${last}</h4>
                 <div class="array-visual">${visual}</div>
                 <p>Target ${target} appears from index ${first} to ${last} (${
          last - first + 1
        } times)</p>`
      );
    } else {
      showResult(
        "flResult",
        `<h4>Not Found</h4>
                 <div class="array-visual">${visual}</div>
                 <p>Target ${target} not found in array</p>`
      );
    }
  } catch (error) {
    showResult("flResult", "Error: " + error.message, true);
  }
}

// Search in 2D Matrix
function searchMatrix(matrix, target) {
  if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
    return false;
  }

  let rows = matrix.length;
  let cols = matrix[0].length;
  let left = 0;
  let right = rows * cols - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let midVal = matrix[Math.floor(mid / cols)][mid % cols];

    if (midVal === target) {
      return true;
    } else if (midVal < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return false;
}

function testMatrixSearch() {
  try {
    const matrixInput = document.getElementById("matrixInput").value;
    const target = parseInt(document.getElementById("matrixTarget").value);

    const matrix = matrixInput
      .split(";")
      .map((row) => row.split(",").map((x) => parseInt(x.trim())));

    const found = searchMatrix(matrix, target);
    let matrixHTML =
      '<table style="margin: 10px 0; border-collapse: collapse;">';

    for (let i = 0; i < matrix.length; i++) {
      matrixHTML += "<tr>";
      for (let j = 0; j < matrix[i].length; j++) {
        const isTarget = matrix[i][j] === target && found;
        const cellStyle = `padding: 8px; border: 1px solid #ddd; text-align: center; ${
          isTarget
            ? "background-color: #51cf66; color: white; font-weight: bold;"
            : ""
        }`;
        matrixHTML += `<td style="${cellStyle}">${matrix[i][j]}</td>`;
      }
      matrixHTML += "</tr>";
    }
    matrixHTML += "</table>";

    showResult(
      "matrixResult",
      `<h4>${found ? "Found" : "Not Found"}</h4>
             ${matrixHTML}
             <p>Target ${target} ${
        found ? "exists" : "does not exist"
      } in the matrix</p>`
    );
  } catch (error) {
    showResult("matrixResult", "Error: " + error.message, true);
  }
}

// Find Peak Element
function findPeakElement(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    if (nums[mid] > nums[mid + 1]) {
      // Peak is on the left side (including mid)
      right = mid;
    } else {
      // Peak is on the right side
      left = mid + 1;
    }
  }

  return left; // Return index of peak element
}

function testPeakElement() {
  try {
    const arr = parseArray(document.getElementById("peakArray").value);

    if (arr.length === 0) {
      showResult("peakResult", "Please enter a valid array", true);
      return;
    }

    const peakIndex = findPeakElement(arr);
    const visual = visualizeArray(arr, [], [peakIndex]);

    showResult(
      "peakResult",
      `<h4>Peak element found at index: ${peakIndex}</h4>
             <div class="array-visual">${visual}</div>
             <p>Peak element is ${arr[peakIndex]} at position ${peakIndex}</p>`
    );
  } catch (error) {
    showResult("peakResult", "Error: " + error.message, true);
  }
}

// ======================== SORTING ALGORITHMS ========================

// Merge Sort Implementation
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  let i = 0,
    j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}

function testMergeSort() {
  try {
    const arr = parseArray(document.getElementById("mergeArray").value);

    if (arr.length === 0) {
      showResult("mergeResult", "Please enter a valid array", true);
      return;
    }

    const originalVisual = visualizeArray([...arr]);
    const sorted = mergeSort([...arr]);
    const sortedVisual = visualizeArray(sorted);

    showResult(
      "mergeResult",
      `<h4>Array Sorted Successfully!</h4>
             <p><strong>Original:</strong></p>
             <div class="array-visual">${originalVisual}</div>
             <p><strong>Sorted:</strong></p>
             <div class="array-visual">${sortedVisual}</div>`
    );
  } catch (error) {
    showResult("mergeResult", "Error: " + error.message, true);
  }
}

// Quick Sort Implementation
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

function testQuickSort() {
  try {
    const arr = parseArray(document.getElementById("quickArray").value);

    if (arr.length === 0) {
      showResult("quickResult", "Please enter a valid array", true);
      return;
    }

    const originalVisual = visualizeArray([...arr]);
    const sorted = quickSort([...arr]);
    const sortedVisual = visualizeArray(sorted);

    showResult(
      "quickResult",
      `<h4>Array Sorted Successfully!</h4>
             <p><strong>Original:</strong></p>
             <div class="array-visual">${originalVisual}</div>
             <p><strong>Sorted:</strong></p>
             <div class="array-visual">${sortedVisual}</div>`
    );
  } catch (error) {
    showResult("quickResult", "Error: " + error.message, true);
  }
}

// Count Inversions in Array
function countInversions(arr) {
  let temp = new Array(arr.length);
  return mergeSortAndCount([...arr], temp, 0, arr.length - 1);
}

function mergeSortAndCount(arr, temp, left, right) {
  let invCount = 0;
  if (left < right) {
    let mid = Math.floor((left + right) / 2);

    invCount += mergeSortAndCount(arr, temp, left, mid);
    invCount += mergeSortAndCount(arr, temp, mid + 1, right);
    invCount += mergeAndCount(arr, temp, left, mid, right);
  }
  return invCount;
}

function mergeAndCount(arr, temp, left, mid, right) {
  let i = left,
    j = mid + 1,
    k = left;
  let invCount = 0;

  while (i <= mid && j <= right) {
    if (arr[i] <= arr[j]) {
      temp[k++] = arr[i++];
    } else {
      temp[k++] = arr[j++];
      invCount += mid - i + 1;
    }
  }

  while (i <= mid) temp[k++] = arr[i++];
  while (j <= right) temp[k++] = arr[j++];

  for (i = left; i <= right; i++) arr[i] = temp[i];

  return invCount;
}

function testCountInversions() {
  try {
    const arr = parseArray(document.getElementById("invArray").value);

    if (arr.length === 0) {
      showResult("invResult", "Please enter a valid array", true);
      return;
    }

    const inversions = countInversions([...arr]);
    const visual = visualizeArray(arr);

    showResult(
      "invResult",
      `<h4>Number of Inversions: ${inversions}</h4>
             <div class="array-visual">${visual}</div>
             <p>An inversion occurs when arr[i] > arr[j] and i < j</p>`
    );
  } catch (error) {
    showResult("invResult", "Error: " + error.message, true);
  }
}

// Sort Colors (Dutch National Flag Algorithm)
function sortColors(nums) {
  let low = 0; // Pointer for 0s
  let mid = 0; // Current pointer
  let high = nums.length - 1; // Pointer for 2s

  while (mid <= high) {
    if (nums[mid] === 0) {
      // Swap with low and move both pointers
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++;
      mid++;
    } else if (nums[mid] === 1) {
      // Just move mid pointer
      mid++;
    } else {
      // nums[mid] === 2
      // Swap with high and move high pointer back
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--;
      // Don't increment mid as we need to check swapped element
    }
  }

  return nums;
}

function testSortColors() {
  try {
    const arr = parseArray(document.getElementById("colorArray").value);

    if (arr.length === 0) {
      showResult("colorResult", "Please enter a valid array", true);
      return;
    }

    // Validate input contains only 0, 1, 2
    if (!arr.every((x) => x >= 0 && x <= 2)) {
      showResult(
        "colorResult",
        "Array should contain only 0s, 1s, and 2s",
        true
      );
      return;
    }

    const originalVisual = visualizeArray([...arr]);
    const sorted = sortColors([...arr]);
    const sortedVisual = visualizeArray(sorted);

    showResult(
      "colorResult",
      `<h4>Colors Sorted Successfully!</h4>
             <p><strong>Original:</strong></p>
             <div class="array-visual">${originalVisual}</div>
             <p><strong>Sorted:</strong></p>
             <div class="array-visual">${sortedVisual}</div>
             <p>Red (0s) → White (1s) → Blue (2s)</p>`
    );
  } catch (error) {
    showResult("colorResult", "Error: " + error.message, true);
  }
}

// ======================== ADDITIONAL UTILITY FUNCTIONS ========================

// Alternative Binary Search with step-by-step visualization
function binarySearchWithSteps(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let steps = [];

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    steps.push({
      left: left,
      mid: mid,
      right: right,
      value: arr[mid],
      comparison:
        arr[mid] === target
          ? "found"
          : arr[mid] < target
          ? "go right"
          : "go left",
    });

    if (arr[mid] === target) {
      return { found: true, index: mid, steps: steps };
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return { found: false, index: -1, steps: steps };
}

// Enhanced Quick Sort with pivot selection strategies
function quickSortEnhanced(arr, pivotStrategy = "last") {
  function quickSortHelper(arr, low, high) {
    if (low < high) {
      let pi;

      switch (pivotStrategy) {
        case "first":
          [arr[low], arr[high]] = [arr[high], arr[low]];
          pi = partition(arr, low, high);
          break;
        case "middle":
          let mid = Math.floor((low + high) / 2);
          [arr[mid], arr[high]] = [arr[high], arr[mid]];
          pi = partition(arr, low, high);
          break;
        case "random":
          let randomIndex = Math.floor(Math.random() * (high - low + 1)) + low;
          [arr[randomIndex], arr[high]] = [arr[high], arr[randomIndex]];
          pi = partition(arr, low, high);
          break;
        default: // 'last'
          pi = partition(arr, low, high);
      }

      quickSortHelper(arr, low, pi - 1);
      quickSortHelper(arr, pi + 1, high);
    }
  }

  const result = [...arr];
  quickSortHelper(result, 0, result.length - 1);
  return result;
}

// Iterative Binary Search for comparison
function binarySearchIterativeDetailed(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let iterations = 0;

  while (left <= right) {
    iterations++;
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return {
        found: true,
        index: mid,
        iterations: iterations,
        message: `Found ${target} at index ${mid} in ${iterations} iterations`,
      };
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return {
    found: false,
    index: -1,
    iterations: iterations,
    message: `${target} not found after ${iterations} iterations`,
  };
}

// Function to generate test arrays
function generateTestArray(size, min = 1, max = 100, sorted = false) {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return sorted ? arr.sort((a, b) => a - b) : arr;
}

// Performance testing function
function performanceTest(algorithm, arr, iterations = 1000) {
  const start = performance.now();

  for (let i = 0; i < iterations; i++) {
    algorithm([...arr]);
  }

  const end = performance.now();
  return {
    algorithm: algorithm.name,
    arraySize: arr.length,
    iterations: iterations,
    totalTime: end - start,
    averageTime: (end - start) / iterations,
  };
}
