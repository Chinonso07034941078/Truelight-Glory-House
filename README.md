📖 Truelight Glory House Website
Welcome to the official  repository for Truelight Glory House — a vibrant and growing Christian ministry committed to discipling nations and transforming lives through God's Word, prayer, and purpose-driven leadership.

🌟 Overview
This is a responsive, fully animated React-based website built to showcase the heart, vision, and activities of Truelight Glory House. It includes:

🔹 Dynamic hero sections with smooth transitions

🔹 Sermon listings that redirect to full Telegram messages

🔹 Animated event pages

🔹 A filtered search experience for messages by topic

🔹 Responsive design for mobile and desktop

🔹 Tailwind CSS styling with Framer Motion animations

🧱 Tech Stack
React JS

Tailwind CSS

Framer Motion

React Router

Lucide Icons

📁 Folder Structure
css
Copy
Edit
src/
├── assets/           → Images and logos
├── components/       → Reusable UI components (Navbar, Footer, etc.)
├── pages/            → Route-level pages (About, Home, Events, Sermons, etc.)
├── context/          → (If used) for state management
├── App.jsx           → Route declarations
└── main.jsx          → Entry point
⚙️ Installation
Clone the repository:

bash
Copy
Edit
git clone https://github.com/Joseph-Godwin12/Truelight-glory-house.git
Navigate to the project folder:

bash
Copy
Edit
cd Truelight-glory-house
Install dependencies:

bash
Copy
Edit
npm install
Run the development server:

bash
Copy
Edit
npm run dev
✅ Features
Hero slides and dynamic page transitions

Filterable sermon page integrated with Telegram links

Events calendar with animated highlights

Reusable and modular components

Organized data through external data.js for easy updates

📬 Contact
For backend integration or deployment-related discussions, please contact the development team or submit a pull request.

## WCC registration configuration and duplicate protection

The WCC page's reusable fields and configuration are in `src/components/wcc/` and
`src/lib/wcc/`. Registration uses `/api/wcc-registration`; its Apps Script URL stays
in the server module. Set `WCC_API_URL` in Vercel environment variables, using
`.env.example` as a reference. The existing endpoint remains the server default
so the frontend does not need an environment-variable change to retain its connection.
Do not put passwords or Brevo API keys in `VITE_*` variables. Keep them in Apps Script
Script Properties; values prefixed with `VITE_` are included in browser bundles.

### Required Apps Script deployment

Use **`apps-script/Code.gs`**, based on the latest supplied registration/Brevo/check-in
backend and retaining its existing features. The root `Code.gs` is an older script
and is left untouched; do not use it for this update.

1. Open the existing registration Apps Script project and replace its `Code.gs`
   contents with `apps-script/Code.gs`.
2. Save, then Deploy > Manage deployments > Edit > New version > Deploy.
3. Keep Execute as **Me**, access **Anyone**, the existing deployment URL, and all
   Script Properties (`ADMIN_PASSWORD`, `BREVO_API_KEY`, `SENDER_EMAIL`, etc.).
4. Deploy the frontend commit and confirm adult and child registration.

The proxy checks the backend capability before posting and refuses registrations
through an old deployment, preventing new duplicate rows during an incomplete update.
No existing registrations or check-in records are deleted or merged.

Adults match by normalized full name plus matching email **or** phone. Children match
by child name plus guardian email **or** phone, separately from adults. Names ignore
case and repeated whitespace; Nigerian `080...`, `+23480...` and `0023480...` phone
formats are equivalent. Siblings or different people sharing a contact can register
separately. Missing registrationKind in older rows is treated as adult. Changing
both contact details or materially changing the name cannot reliably recover a prior
registration; organisers must resolve those cases.

Duplicate detection runs inside the same Apps Script lock as the save, including
simultaneous submissions and retries. A repeat submission returns the original
registration reference and check-in code without creating a row or resending email.
The frontend displays those returned values for both adults and children.

`npm run dev` supports the same API route through Vite's local middleware.
