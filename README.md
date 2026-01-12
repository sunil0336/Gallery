📸 Real-Time Gallery Interaction App

A multi-user real-time image gallery application where users can react to images with emojis, add comments, and see all interactions update instantly across users via a live activity feed.

This project was built as part of a React Intern Assignment to demonstrate real-time state handling, clean component architecture, and thoughtful UI/UX decisions.

🚀 Live Demo

👉 Deployed URL: <PASTE YOUR LIVE LINK HERE>

📦 GitHub Repository

👉 Repo: <PASTE YOUR GITHUB LINK HERE>

🎯 Features
🖼️ Gallery

Images fetched from Unsplash API

Infinite scroll (IntersectionObserver)

Pinterest-style masonry layout (CSS columns)

Click image to open a focused image view

😊 Image Interactions (Real-Time)

Emoji reactions (WhatsApp-style: default emojis + ➕ picker)

Add comments on images

All reactions & comments sync instantly across users

📰 Live Feed (Real-Time)

Mixed chronological feed (reactions + comments)

Shows who did what, when

Clicking “view” opens the same image modal

Sticky panel with internal scroll

🎨 UI / UX

Dark-only theme

iOS-style glass / blur UI

Responsive image modal

Clean, minimal, readable layout

🛠️ Tech Stack

React (functional components only)

Tailwind CSS

InstantDB – real-time data synchronization

Zustand – global state management

React Query – API data handling

Unsplash API – image source

emoji-picker-react – emoji selection

Vite – build tool

🧠 Architecture Overview
Unsplash API ──▶ React Query ──▶ Gallery Grid
                                   │
User Actions ──▶ InstantDB ◀────────┘
        │
        ├─ Emoji Reactions (real-time)
        ├─ Comments (real-time)
        └─ Global Live Feed (real-time)

Zustand:
- Selected image state
- Global image map (for feed → modal navigation)
- User identity

🔄 Real-Time Data Design (InstantDB)
Collections Used
reactions {
  id
  imageId
  emoji
  user
  createdAt
}

comments {
  id
  imageId
  text
  user
  createdAt
}


Every write generates a unique ID

Live Feed is created by merging reactions + comments

Sorted by createdAt for true chronological order

⚙️ Setup Instructions
1️⃣ Clone repository
git clone <repo-url>
cd project-folder

2️⃣ Install dependencies
npm install

3️⃣ Environment variables

Create .env file:

VITE_UNSPLASH_ACCESS_KEY=your_unsplash_key


Add your InstantDB App ID in:

src/db/instant.js

4️⃣ Run locally
npm run dev

🧩 Key Design Decisions

Infinite scroll instead of pagination for better UX

CSS masonry layout instead of heavy JS libraries

React Portal used for emoji picker to avoid clipping

Global image store so Live Feed can open the same image modal

Defensive rendering in modal to avoid async data crashes

Sticky live feed to prevent layout shift during real-time updates

🚧 Challenges Faced & Solutions
❓ Real-time write API confusion

InstantDB write APIs differ by version

Solved by using version-correct db.tx.collection[id].update() pattern

❓ Infinite scroll not triggering

Masonry + IntersectionObserver edge cases

Fixed using threshold: 0, rootMargin, and fetch guards

❓ Emoji picker clipping inside image cards

Solved using React Portal to render picker at document.body level

⭐ Improvements With More Time

User authentication instead of random usernames

Per-emoji reaction counts

Delete/edit own comments

Feed item grouping by image

Mobile gesture optimizations

🧪 How to Test Real-Time Behavior

Open the app in two browser tabs

React or comment on an image in Tab A

Observe instant updates in Tab B

Verify Live Feed updates without refresh

📌 Final Notes

This project focuses on clarity, correctness, and real-time reasoning rather than visual complexity.
All major requirements of the assignment are implemented with attention to scalability and clean architecture.

🙌 Thank you for reviewing!