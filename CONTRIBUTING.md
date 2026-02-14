# Contributing

Thanks for helping make this repo funnier and more shareable.

## Add A New Scene

All scenes live in `engine.js` in the `S` array. Each scene is an object with:

- `file`: file name shown in tabs
- `path`: breadcrumbs text
- `lang`: language label
- `icon`: color used for the tab icon
- `content`: code content (multiline string)
- `logs`: terminal output lines
- `chat`: AI assistant messages
- `sug`: IntelliSense suggestion keywords

### Quick Checklist

- Keep `content` around 20-80 lines (readable on screen).
- Make `logs` look realistic: build/test/lint/deploy style.
- Keep `chat` short and "assistant-like" (2-5 lines).
- Avoid real secrets (tokens, keys, internal URLs, customer data).

## Content Guidelines

- This is a UI simulator, not a real IDE.
- Keep it safe to share publicly.
- Prefer tech humor and demo-friendly outputs.

