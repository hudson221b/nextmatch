
  # 💘Next Match💘
  <img src="https://img.shields.io/github/deployments/hudson221b/nextmatch/production?style=for-the-badge&logo=vercel&label=vercel" alt="Project Logo" width="150"/>


## About The App
A small dating app to help you find the next match in this small world

## Live link 


[Try it out here](https://next-match-phi.vercel.app/) with social accounts or with [seed accounts](https://github.com/hudson221b/nextmatch/blob/main/prisma/membersData.ts#L3) and [credentials](https://github.com/hudson221b/nextmatch/blob/main/prisma/seed.ts#L13)

## Table of Content:

- [Features](#features)
- [Technologies](#technologies)
- [Challenges](#challenges)

## Features
- Social sign-in with Google and Github account
![Screenshot 2024-09-11 at 2 00 45 PM](https://github.com/user-attachments/assets/b8dac5b7-225a-478c-a69d-006506c07e2e)

- Live status of online members and instant messaging

https://github.com/user-attachments/assets/554f258a-7513-464b-b5f1-abb74bc7d972

- Image uploading
![uploading-pic](https://github.com/user-attachments/assets/a41fabf5-cd8c-45ab-b85c-b081373a28da)

- Filters, lists and inboxes to manage your preferences and interaction history
![2024-09-11 14 18 10](https://github.com/user-attachments/assets/f5545af7-90b6-45d4-9057-aff9b49ae2bd)

- Email verification & password reset


## Technologies
- Full-stack framework:  Next.js, Typescript, React
- Database: Prisma ORM, Neon Tech PostgresSQL
- Middleware and authentication: Auth.js V5
- UI: NextUI, TailwindCSS
- Hosting: Vercel
- Others: Web socket service Pusher Channels, Resend email service, react-hook-form, Zod, Zustand

## Challenges
I have came across a lot of blockers, pitfalls and my solutions during each logic section of building this app. They are documented in each of my PRs. To summarize, some of the biggest challenges are:
- Conventions and quirks using Next.js 
- Setting up Auth.js and configuring JWT session strategy
- Prisma schema update, migration and seeding
- Choosing filtering strategy: from search params change to zustand states to UI, or from zustand state change to search params to UI?




