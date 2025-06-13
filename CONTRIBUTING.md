# Contributing to Wallgrid

Welcome, and thank you for considering contributing to **Wallgrid**!

## What Can I Contribute?

- New tiles
- Bug fixes or improvements
- Feature requests or UI enhancements
- Documentation updates

## Tile Structure

Each tile lives in its own folder under `/tiles/`. Example: `/tiles/clock/`

Minimum required files:
- `tile.js` — contains `render()` function that returns a DOM node
- `config.js` — defines default settings
- Optional: `tile.html` for large HTML structure (loaded as string or template)

```js
// tile.js (example)
export default {
  id: 'clock',
  name: 'Clock',
  render(container, settings) { ... },
  defaultSettings: { format24h: true }
}
```

## Guidelines

- Stick to vanilla JavaScript (no frameworks).
- Use ES Modules (import/export).
- Avoid dependencies unless discussed.
- Keep CSS scoped to tiles when possible.
- Test both horizontal and vertical screen sizes.

## Suggesting Features
Open an issue with the `feature` or `enhancement` label and clearly explain:
- Use case
- Proposed behavior
- Optional: screenshots/mockups

## Development
- Fork the repo
- Clone your fork
- Make changes
- Create a Pull Request (PR) against main


### Thanks for helping make Wallgrid better!