# Voyage

Voyage is a full-stack travel planning application that helps users organize trips based on their travel preferences, estimated budget, and travel style. It provides a personalized dashboard where users can create, manage, and explore trips through a clean and responsive interface.

The project was built to explore modern full-stack application development using Next.js and FastAPI while implementing secure authentication, REST APIs, database management, and production deployment.

**Live Demo:** https://voyagein.vercel.app/

---

## Features

- User authentication using JWT
- Secure signup and login
- Personalized travel profiles
- Trip creation and management
- Dynamic trip cost estimation
- Destination recommendations based on user preferences
- Responsive dashboard
- Protected API routes
- Production deployment using Vercel and Render

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- FastAPI
- SQLAlchemy
- SQLite
- Pydantic
- JWT Authentication

### Deployment

- Vercel
- Render

---

## Project Structure

```
Voyage/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── public/
│
├── backend/
│   ├── main.py
│   ├── auth.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   └── requirements.txt
│
└── README.md
```

---

## Running the Project

### Clone the repository

```bash
git clone https://github.com/yourusername/voyage.git
cd voyage
```

### Backend

```bash
cd backend

python -m venv venv

source venv/bin/activate
# Windows
venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs on:

```
http://127.0.0.1:8000
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```
http://localhost:3000
```

---

## Environment Variables

### Backend

Create a `.env` file inside the backend directory.

```env
SECRET_KEY=your_secret_key
ALLOWED_ORIGINS=http://localhost:3000
```

### Frontend

Create a `.env.local` file.

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

---

## Future Improvements

The current release focuses on the core travel planning workflow.

Planned enhancements include:

- AI-generated travel itineraries
- Weather integration
- Google Maps integration
- Hidden destination recommendations
- AI-powered travel assistant
- PostgreSQL migration
- Saved destinations and trip sharing

---

## License

This project is licensed under the MIT License.
