Description

Budgetmanager is not the common expenses tracker you can find on app stores. Budgetmanager aims to helps people with zero knowledge on budgeting, in their first steps on financial wellbeing. That's why we have built an mobile and web application where users will enjoy to learn about personal finances and strategies according to their objectives. But also to make budgeting smooth, we provide budget suggestions ready to use so users won't have to think so much how to budget.

Since the first steps on financial well-being starts where your money goes, with our intuitive UI user will make expense tracking a habit. Then when they control their monthly expenses, we will guide them making of saving and investing a habit.


Tech stack & Third party services

The code base was built with NextJs on the frontend, we used Firebase as a backend service (beacuse it allowed us to set auth and database so fast). And all the pipeline and deployment workflow works with Vercel


Color Palette

dopelycolors

Try for free

Landing page
App live

Run the project

Clone the project

$ git clone https://github.com/Managah002/budgetManager
Install dependencies

$ cd budgetManager
$ yarn install
Setup Firebase app: go to services/firebase.js and replace firebaseConfig:

$ code services/firebase.js
const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: ''
}
Run the app:

  $ yarn dev
Roadmap

 PWA
 Goals
 Custom budget
 Expense tracker
 Cross-device support
 User login and signup
 Budgeting made easy with suggestions
 Offline
 Insights
 Improve UX
 Multiple accounts
 Share budget link
 Schedule and bills reminders
 Next 3 month pre-made budget
 Deploy to iOS & Android app store
