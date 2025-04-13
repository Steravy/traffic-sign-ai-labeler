# Traffic Sign AI Labeler

**Traffic Sign AI Labeler** is an open-source tool for scraping, storing, labeling, and searching traffic sign images using AI and vector similarity. It automates the entire data pipeline from web crawling to AI-based metadata generation and exposes a developer-friendly API for accessing labeled traffic sign data.

---

## 🚀 Features

### 🔍 Web Scraping & Image Collection
- Scrapes traffic sign images and metadata (e.g. title, description, category) from European government websites or open traffic sign directories.
- Downloads and uploads each image to a configured MinIO (S3-compatible) bucket.

### 🤖 AI-Powered Image Labeling
- Uses AI vision models (Google Vision, CLIP, or custom) to:
  - Describe image contents
  - Identify shapes, colors, and symbols
  - Generate human-readable and vector-based descriptions
- Automatically tags and categorizes each traffic sign with relevant metadata.

### 🧠 Vector Embeddings & Semantic Search
- Converts image descriptions and labels into vector embeddings using models like OpenAI, HuggingFace, or CLIP.
- Supports vector similarity search so users can:
  - Search traffic signs using natural language
  - Find visually or semantically similar signs

### 🗂️ Organized Metadata & Label Engine
- Each image is labeled and stored with:
  - Raw and AI-generated metadata
  - Tags (e.g., "prohibition", "mandatory", "warning")
  - Vector representation
- This acts as a scalable data labeling engine for machine learning pipelines or educational content generation.

### 🧪 Developer API
- RESTful API to:
  - Query all traffic signs
  - Filter by category, tags, or description
  - Perform semantic search using embeddings
- Built with NestJS and TypeORM using Clean Architecture

### 🏫 Educational SaaS Layer (Optional)
- Driving schools or educators can:
  - Search traffic sign images by topic
  - Generate quizzes/tests based on selected signs using AI
  - Embed traffic sign data into teaching materials

### 🧠 Visual Similarity Search
- Perform reverse-image or visual similarity queries based on the vector space.
- Enables finding signs that "look like" a given input.

---

## 💼 Use Cases

- Navigation systems and autonomous vehicle datasets
- Smart city & traffic analysis platforms
- Driving school education software
- AI and computer vision researchers working with road sign datasets

---

## 🏗 Tech Stack

| Layer              | Stack/Tool                        |
|-------------------|-----------------------------------|
| API Framework      | [NestJS](https://nestjs.com/)     |
| ORM                | [TypeORM](https://typeorm.io/)    |
| Scraping           | Puppeteer                         |
| Storage            | MinIO (S3-compatible)             |
| AI Vision          | Google Vision / OpenAI / CLIP     |
| Vector Search      | pgvector / Pinecone / Weaviate    |
| DB                 | PostgreSQL                        |
| Architecture       | Clean Architecture (DDD)          |

---

## 📂 Clean Architecture Overview

```
traffic-sign-ai-labeler/
├── apps/                    # Entry point (API)
├── src/
│   ├── domain/              # Entities and domain logic
│   ├── application/         # Use-cases and services
│   ├── infrastructure/      # TypeORM, MinIO, scraping, vector DB
│   ├── presentation/        # Controllers and DTOs
│   ├── config/              # Configuration modules
│   └── shared/              # Common utilities
├── scripts/                 # CLI jobs (scraper, workers)
├── test/                    # Test files
├── .env.example             # Env vars
├── README.md
└── package.json
```

---

## 📌 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/traffic-sign-ai-labeler.git
cd traffic-sign-ai-labeler
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment

Create a `.env` file based on `.env.example`:

```env
MINIO_ENDPOINT=localhost
MINIO_ACCESS_KEY=your_key
MINIO_SECRET_KEY=your_secret
DATABASE_URL=postgres://user:pass@localhost:5432/traffic
OPENAI_API_KEY=your_key
```

### 4. Run Database Migrations

```bash
npm run migration:run
```

### 5. Start the App

```bash
npm run start:dev
```

---

## 🔁 Workflow Pipeline

```text
[Scraper] → [Download Image] → [Upload to MinIO]
           → [Worker detects unprocessed images]
           → [AI labels image + generates description]
           → [Vectorize the description]
           → [Store metadata in DB]
```

---

## 🧪 Example API Endpoints

| Method | Endpoint                    | Description                        |
|--------|-----------------------------|------------------------------------|
| GET    | `/api/traffic-signs`        | List all traffic signs             |
| GET    | `/api/traffic-signs/:id`    | Get one image + metadata           |
| POST   | `/api/search`               | Search by natural language query   |
| GET    | `/api/tags`                 | List all unique tags               |

---

## 📖 License

This project is open-sourced under the MIT License.

---

## 🙌 Contributing

Pull requests are welcome! Please open an issue to discuss your ideas, or contribute to modules like:
- New scraper sources
- Alternative AI models
- UI for browsing/searching signs

---

## ✨ Star History

If this project helps you, please give it a ⭐ on GitHub to support development!

---

## 📬 Contact

For collaborations or integrations, reach out via [GitHub Issues](https://github.com/yourusername/traffic-sign-ai-labeler/issues) or open a discussion thread.