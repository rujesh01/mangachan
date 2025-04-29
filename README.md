
![theMangachanLogo](https://github.com/user-attachments/assets/56515476-bb3f-4c23-883a-4b21c70874cd)


**Mangachan** is a modern, minimalistic manga reading web application built with cutting-edge web technologies. Designed for manga enthusiasts, it enables seamless manga discovery, search, and reading — all within a clean and responsive user interface.

---
## 📚 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
  - [MangaDex API Configuration](#mangadex-api-configuration)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## ✨ Features

- 🔍 **Instant Manga Search** – Quickly find manga titles via a robust search system.
- 📖 **Reader Mode** – Enjoy a smooth, paginated reader for an immersive reading experience.
- 🌙 **Dark/Light Mode** – Switch themes based on your reading environment.
- ⚡ **High Performance** – Fast load times and minimal resource usage.
- 📱 **Mobile-Friendly Design** – Fully responsive on all devices.

---

## 🧰 Tech Stack

Mangachan is built with a modern and efficient web stack:

- **Next.js** – React framework for SSR and SSG.
- **TypeScript** – Strong typing for scalable and maintainable code.
- **Tailwind CSS** – Utility-first CSS framework for rapid UI development.
- **Shadcn UI** – Accessible, styled component library.
- **next-themes** – Seamless theme toggling.
- **MangaDex API** – Real-time manga data and content source.

---

## 🚀 Getting Started

### ✅ Prerequisites

Ensure you have the following installed:

- [**Bun**](https://bun.sh) – JavaScript runtime (required)
- [**Node.js 18+**](https://nodejs.org/) – For compatibility (optional)

### 📦 Installation

```bash
# Clone the repository
git clone https://github.com/rujesh01/mangachan.git

# Navigate into the project directory
cd mangachan

# Install dependencies using Bun
bun install
🧪 Usage
bash
Copy
Edit
# Start development server
bun run dev

# Build the app for production
bun run build

# Start the production server
bun run start
📌 Visit http://localhost:3000 to view the app in your browser.

🔗 MangaDex API Configuration
Mangachan fetches manga data using the MangaDex API.

Basic Usage: No authentication needed for public content.

Advanced Features (e.g. saving favorites): Requires OAuth 2.0.

🔐 Setup OAuth:
Register on MangaDex

Obtain a client ID and secret following their API docs

Configure credentials in environment variables or appropriate config files.

⚠️ Note: Respect MangaDex’s rate limits. Avoid excessive requests.

🤝 Contributing
We welcome contributions! Here's how to get started:

Fork the repo

Create your feature branch:

bash
Copy
Edit
git checkout -b feature/your-feature-name
Commit your changes:

bash
Copy
Edit
git commit -m "feat: added your feature"
Push to your branch:

bash
Copy
Edit
git push origin feature/your-feature-name
Open a Pull Request on GitHub

🔍 Please follow coding standards and include tests if applicable. Check CONTRIBUTING.md if available.

📄 License
This project is licensed under the MIT License.

📬 Contact
For issues, suggestions, or feature requests:

Open an issue on GitHub

We appreciate your feedback and contributions!
