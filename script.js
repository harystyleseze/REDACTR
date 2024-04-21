function scrambleText() {
  const text = document.getElementById("textInput").value;
  const wordsInput = document.getElementById("wordsInput").value;
  const scrambleChar =
    document.getElementById("scrambleCharInput").value || "*";

  // Check if the user entered any words to scramble
  if (!wordsInput.trim()) {
    alert("Please enter at least one word to scramble.");
    return; // Exit the function to prevent further execution
  }

  const wordsToScramble = wordsInput.split(" ");
  let scrambledText = text;
  let totalScrambled = 0;
  let matchCount = 0;
  const startTime = performance.now(); // Start timing

  wordsToScramble.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\b`, "gi");
    const matches = scrambledText.match(regex);
    if (matches) {
      matchCount += matches.length;
      totalScrambled += matches.reduce((acc, match) => acc + match.length, 0);
      scrambledText = scrambledText.replace(
        regex,
        scrambleChar.repeat(word.length)
      );
    }
  });

  const endTime = performance.now(); // End timing
  const timeTaken = (endTime - startTime).toFixed(2);

  document.getElementById("result").textContent =
    "Scrambled Text: " + scrambledText;
  displayStats(text, matchCount, totalScrambled, timeTaken);
}

function displayStats(originalText, matchCount, charsScrambled, timeTaken) {
  const wordCount = originalText.split(/\s+/).length;
  const stats = `Words Scanned: ${wordCount}, Matches Found: ${matchCount}, Characters Scrambled: ${charsScrambled}, Time Taken: ${timeTaken} ms`;
  document.getElementById("stats").textContent = stats;
}
