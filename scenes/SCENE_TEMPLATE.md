# Scene Template

Copy one block below into the `S` array in `engine.js`, then tweak text to match your vibe.

```js
{
  file: "example.ts",
  path: "src > services > example",
  lang: "TypeScript",
  icon: "#3178C6",
  content: `export async function shipIt(input: string) {
  // TODO: replace with real logic
  return input.trim();
}
`,
  logs: [
    "[vite] build started...",
    "✓ 42 modules transformed",
    "✓ build completed in 1.3s",
    "PASS example.test.ts (0.4s)"
  ],
  chat: [
    "Reviewing code for edge cases...",
    "Suggestion: add input validation and unit tests.",
    "Note: avoid logging sensitive data."
  ],
  sug: ["await", "Promise.all", "console.log", "return"]
}
```

