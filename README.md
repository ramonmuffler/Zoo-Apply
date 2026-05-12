# Zoo-Apply

Zoo-Apply ist eine App des zoo Zürichs.

---

## Technologien

### Frontend

- React 19
- TypeScript
- Vite
- React Router

### Backend

- Javascript
- Express
- MongoDB (Mongoose)

### Tooling

- ESLint
- TypeScript
- Vite Dev Server (HMR)

---

## Installation

```bash
# Repository klonen
git clone https://github.com/ramonmuffler/Zoo-Apply.git

# In das Projekt wechseln
cd Zoo-Apply

# Frontend Dependencies installieren
npm install

# Backend Dependencies installieren
cd backend
npm install
cd ..
```

---

## MongoDB Mit Docker Starten

Für Registrierung/Login muss MongoDB laufen.

```bash
docker run -d --name zoo-mongo -p 27017:27017 -v zoo_mongo_data:/data/db mongo:7
```

Prüfen ob der Container läuft:

```bash
docker ps
```

Falls der Container schon existiert (aber gestoppt ist):

```bash
docker start zoo-mongo
```

---

## Backend Konfiguration (.env)

Datei `backend/.env` erstellen (wird nicht in Git gespeichert):

```env
MONGODB_URI=mongodb://localhost:27017/zoo-app
PORT=5000
```

---

## Development Server Starten

1. Backend starten:

```bash
cd backend
node server.js
```

Der Backend-Server läuft danach unter:
http://localhost:5000

2. In einem zweiten Terminal das Frontend starten:

```bash
cd Zoo-Apply
npm run dev
```

Die App läuft danach typischerweise unter:
http://localhost:5173

## Backend Starten

```bash
node server.js
```

Server läuft auf http://localhost:5000

---

## Typische Fehler Bei Registrierung

Wenn beim Registrieren `Server-Fehler` kommt, bitte prüfen:

- MongoDB Container läuft wirklich (`docker ps`)
- `backend/.env` existiert und enthält eine gültige `MONGODB_URI`
- Backend wurde aus `backend` gestartet (`node server.js`)
- `backend/node_modules` sind installiert (`cd backend && npm install`)
- Port `5000` ist frei

Optional: Health-Check im Browser öffnen:
http://localhost:5000/

Wenn alles korrekt ist, sollte dort JSON mit `database: "MongoDB"` erscheinen.

---

## Scripts

- `npm run dev` → Startet den Dev Server
- `npm run build` → Erstellt Produktions-Build
- `npm run preview` → Vorschau des Builds
- `npm run lint` → Code linten

---

## Autor

Ramon Muffler
Michaël Hersberger
Ramon Meier
Allesandro Liniger
Timo Maag
Luke Waldvogel

https://github.com/ramonmuffler/Zoo-Apply