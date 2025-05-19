# 🤝 Contributing to Project Scroll

Thank you for your interest in contributing to Project Scroll! This app is both a live tool and a personal learning journey, so all contributions must follow strict guidelines to maintain clarity, scope, and focus.

---

## 📜 General Rules

- 🔒 Stick to the weekly roadmap. Only work on scoped tasks.
- 🧱 Follow the architecture: `pages/`, `components/`, and `app/games/[gameId]`
- 🛠️ Keep code clean, commented, and modular
- ❌ No premature abstraction or feature additions
- ✅ Fixes, refactors, and enhancements must be discussed first

---

## 📁 Folder Structure

- `src/pages/` – Page components (e.g., DashboardPage, SessionsPage)
- `src/components/` – Reusable UI components (e.g., JoinGameForm)
- `src/app/games/[gameId]/` – Route-based structure for game views
- `firebase/` – Firebase client setup
- `AuthContext.jsx` – Global user auth state

---

## 🧪 Development Practices

- Use Firebase for real-time updates (onSnapshot)
- Tailwind CSS is used for all styling (dark theme)
- React Router v6 for all navigation
- Commit regularly with clear messages

---

## 🧼 Before Submitting

- Run the app locally and test your feature
- Ensure no broken imports or paths
- Check for console warnings or scope violations
- Do not include roadmap-breaking changes unless approved

---

## 🚫 Out of Scope (Unless Approved)

- Notes system
- Inventory management
- Multi-user chat or messaging
- Full authentication UX redesign
- UI/UX theme overhaul

---

## 🧠 When In Doubt

Refer to:
- `README.md`
- `project-scroll-roadmap.md`
- Or ask the Scroll Architect (custom GPT)

Thanks for helping build this the right way.