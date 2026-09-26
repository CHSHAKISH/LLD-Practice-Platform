// A simple test runner to demonstrate testing of the deterministic logic

function runTests() {
  console.log("🏃 Running Deterministic Evaluation Tests...\n");
  
  let passed = 0;
  let failed = 0;

  function assertEqual(expected: any, actual: any, testName: string) {
    if (expected === actual) {
      console.log(`✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${testName}\n   Expected: ${expected}\n   Actual: ${actual}`);
      failed++;
    }
  }

  // The logic we use in the API route
  function isSolutionValid(solution: string): { valid: boolean; reason?: string } {
    if (!solution || solution.trim().length === 0) {
      return { valid: false, reason: "Solution cannot be empty." };
    }
    if (solution.trim().length < 20) {
      return { valid: false, reason: "Solution is too short to evaluate." };
    }
    return { valid: true };
  }

  // --- Tests ---
  
  const emptyRes = isSolutionValid("   ");
  assertEqual(false, emptyRes.valid, "Empty solution should be invalid");

  const shortRes = isSolutionValid("class Car {}");
  assertEqual(false, shortRes.valid, "Short solution (< 20 chars) should be invalid");

  const validRes = isSolutionValid("class Car { getLicensePlate(): string { return this.plate; } }");
  assertEqual(true, validRes.valid, "Adequate solution (> 20 chars) should be valid");

  console.log(`\nTest Summary: ${passed} passed, ${failed} failed.`);
  if (failed > 0) process.exit(1);
}

runTests();
