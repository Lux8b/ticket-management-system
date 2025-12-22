# Help Ticket Management System (Google Apps Script)

## 📌 Project Overview

This is a **web-based Help Ticket Management System** built using **Google Apps Script**, **HTML**, **CSS**, and **JavaScript**, fully integrated with **Google Sheets** as the backend database.

The application allows users to:

* Log in using role-based authentication (User / Admin)
* Raise help desk tickets
* Perform ticket follow-up (S1)
* Perform problem-solving updates (S2)
* Allow admins to view all ticket data in a dashboard

The entire system is deployed using **Google Apps Script Web App**, and all data is stored securely in the owner's **personal Google Sheets**.

🔗 **Live Application URL:**
[https://script.google.com/macros/s/AKfycbyTXqsvu8I5M-gV2ryWOi22Lsr_8207uxBMdfqDNsmmg2weCiLkGPKZeijnkjuNC7bjHA/exec](https://script.google.com/macros/s/AKfycbyTXqsvu8I5M-gV2ryWOi22Lsr_8207uxBMdfqDNsmmg2weCiLkGPKZeijnkjuNC7bjHA/exec)

---

## 🧩 Tech Stack

* Google Apps Script (Backend)
* HTML, CSS, JavaScript (Frontend)
* Google Sheets (Database)
* Google Apps Script Web App (Deployment)

---

## 📂 Project Structure

```
├── Code.gs        # Core backend logic (login, tickets, updates, dashboard)
├── Login.gs       # Admin creation & user initialization logic
├── Index.html     # Complete frontend UI (login + dashboard)
```

---

## 📑 Google Sheet Structure

All data is stored in a **Google Sheet owned by the developer**.

### 1️⃣ User Sheet (`User`)

Used for authentication and role-based access.

| Column | Name      | Description                        |
| ------ | --------- | ---------------------------------- |
| A      | Name      | User full name                     |
| B      | Password  | Plain-text password (as per logic) |
| C      | Email     | Login email                        |
| D      | User Type | `Admin` or `User`                  |

🔹 Admin user is created using `createAdminUser()` in `Login.gs`.

---

### 2️⃣ Doer Sheet (`Doer_Name`)

Used to populate dropdowns dynamically.

| Column | Purpose              |
| ------ | -------------------- |
| B      | Raised By names      |
| C      | PC Accountable names |

---

### 3️⃣ FMS Sheet (`FMS`)

Stores all ticket-related data.

| Columns | Description                  |
| ------- | ---------------------------- |
| A–F     | Ticket creation details      |
| G–J     | Follow-Up (S1) details       |
| K–N     | Problem Solving (S2) details |

⚠️ First **4 rows are reserved for headers**. Data starts from **Row 5**.

---

## 🔐 Authentication Logic

* Login handled via `doLogin(email, password)`
* Credentials matched against the **User sheet**
* Role-based access enabled:

  * **Admin** → Can view all data
  * **User** → Can create & update tickets only

Passwords are stored as plain text to match the current login logic.

---

## 🎫 Ticket Creation Logic

* Users create tickets from the dashboard
* UID is auto-generated in `001, 002, 003...` format
* Data is appended to the `FMS` sheet

Handled by:

```js
submitTicket(form)
```

---

## 🔁 Follow-Up (S1) Logic

* Updates columns **G–J** in `FMS`
* Includes planned time, actual time, status, and delay

Handled by:

```js
submitFollowUp(form)
```

---

## 🛠 Problem Solving (S2) Logic

* Updates columns **K–N** in `FMS`
* Includes planned time, actual time, status, and desired date

Handled by:

```js
submitProblemSolving(form)
```

---

## 📊 Admin Dashboard Logic

* Only visible to users with `Admin` role
* Displays all ticket records in tabular format
* Data fetched directly from Google Sheets

Handled by:

```js
getDashboardData()
```

---

## 🚀 Deployment Details

* Deployed as a **Google Apps Script Web App**
* Execution runs as the **script owner**
* Access: **Anyone with the link**
* No external hosting (GitHub Pages / Render not required)

All data modifications directly affect the **owner’s Google Sheet**.

---

## ✅ Key Features

* Role-based login system
* Dynamic dropdowns from Sheets
* Auto UID generation
* Follow-up & problem-solving workflow
* Admin-only data visibility
* Fully serverless architecture

---

## 🔮 Future Enhancements

* Password hashing
* Email notifications
* Ticket priority & SLA
* File attachments
* Search & filter dashboard

---

## 👤 Author

Developed by **Kunal**

---

---

## 🔗 Connect with Me
📦 GitHub: [github.com/Kunalsahuji](https://github.com/Kunalsahuji)  
🔗 LinkedIn: [linkedin.com/in/kunal-sahu-7688ba1b0](https://www.linkedin.com/in/kunal-sahu-7688ba1b0)  
📌 Notion: [Watch my content](https://www.notion.so/1dff7c6ce1bb803787fbddd34e422ab4?v=1e0f7c6ce1bb8052b14c000cb57448ee&pvs=4)  
📧 Email: [ksahu0103@gmail.com](mailto:ksahu0103@gmail.com)  

---

## 🙌 Acknowledgements
This task was assigned by **[RCC Infrastructues Pvt Ltd, Bhopal](https://www.rccinfrastructures.com/)** as part of an assessment.  
Developed with ❤️ by [Kunal Sahu](https://github.com/Kunalsahuji).  
