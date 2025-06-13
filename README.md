# Wallgrid

**Wallgrid** is a modular, customizable live wallpaper system built using only HTML, CSS, and vanilla JavaScript. Designed for [Lively Wallpaper](https://rocksdanister.github.io/lively/), it supports dynamic, user-editable tiles like Weather, Clock, Spotify, YouTube mini-player, browser search, and more.

> 🎯 *“Customize your screen with intelligent, live tiles — powered by Wallgrid.”*

---

## ✨ Features

- ⚙️ Edit mode with drag & drop tile layout
- 🎨 Custom background (image, color, gradient, video)
- 📱 Responsive for both horizontal and vertical screens
- 🔌 Easy to extend with your own tiles

---

## 📦 Project Structure
- `/tiles/` → all independent tile modules (weather, clock, etc.)
- `/core/` → app engine (tile loader, state, storage)
- `/assets/` → CSS, images, icons, etc.
- `/utils/` → helpers
- `index.html` → wallpaper entry

---

## 🚀 Getting Started

1. Clone the repo or download ZIP.
2. Open `index.html` in Lively Wallpaper.
3. Use edit mode to add/customize tiles.

---

## 🧩 Creating a Tile

1. Create a folder under `/tiles/` (e.g. `tiles/mytile`)
2. Add:
   - `tile.js` – core logic
   - `config.js` – default settings
   - (optional) `tile.html` – markup template
3. Your tile will automatically load when added to the list.

➡️ See [`tiles/weather/`](./tiles/weather/) as a reference.

---

## 🙌 Contributing

We welcome contributions! Read [`CONTRIBUTING.md`](./CONTRIBUTING.md) for tile structure, style guide, and contribution rules.

---

## 📄 License

Licensed under the [MIT License](./LICENSE).

---

## 💬 Connect

- Issues & Feature Requests welcome
- Made with ❤️ by [Vansh Patel](https://github.com/patel-vansh)