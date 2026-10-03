# MealAI - AI-Powered Meal Planning & Recipe Assistant

MealAI is a smart culinary assistant and meal planning web application powered by Next.js 16, React 19, and Clerk Authentication. It features personalized recipe generation, automated grocery list consolidation, intelligent pantry matching, and conversational cooking guidance.

---

## Local Setup Checklist

Follow this step-by-step checklist to set up and run MealAI locally.

### Prerequisites

Verify your local development environment:

```bash
node --version
npm --version
```

- **Supported Node.js Version**: **Node.js 18.18.0 or higher** (Node.js 20.x or 22.x LTS is strongly recommended; compatible with Next.js 16.3.8 and React 19).
- **npm Version**: **npm 9.x or higher** (npm 10.x / 11.x verified).
- **External Services**:
  - **Clerk Authentication** *(Required for authentication)*: Production-ready identity provider managing user registration, sessions, Google OAuth, and phone verification. Sign up for a free account at [https://clerk.com](https://clerk.com).
  - **Google Gemini API** *(Optional)*: Powers AI features such as recipe generation, pantry image ingredient analysis, and smart substitutions. If omitted, MealAI automatically uses deterministic offline fallback algorithms. Obtain an API key at [Google AI Studio](https://aistudio.google.com/).
  - **Database / Local Storage**: MealAI uses a browser-persisted local storage layer for user profiles, custom recipes, meal plans, and pantry items keyed to the verified Clerk User ID (`uid`). No external database (e.g., PostgreSQL, MongoDB, Redis) installation is needed.

---

### Step 1: Install Dependencies

From the MealAI project root directory:

```bash
npm install
```

> **Note**: The repository includes an `.npmrc` file configured with `legacy-peer-deps=true` to ensure clean dependency resolution between `@clerk/nextjs@7.9.10` and `next@16.3.8`.

---

### Step 2: Create the Local Environment File

Create `.env.local` in the project root:

```bash
cp .env.example .env.local
```

Populate `.env.local` with your configuration:

```env
# Clerk Authentication (Required)
# Retrieve keys from https://dashboard.clerk.com -> Your App -> API Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key

# Clerk Routing URLs (Configured to match actual application routes)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Google Gemini API Key (Optional)
GEMINI_API_KEY=your_gemini_api_key_here

# Application Base URL & Port
APP_URL=http://localhost:3000
PORT=3000
```

> **Important**: Never commit real secret keys (`CLERK_SECRET_KEY` or `GEMINI_API_KEY`) to git. `.env.local` is included in `.gitignore`.

---

### Step 3: Configure Clerk Dashboard

Perform the following configuration in your [Clerk Dashboard](https://dashboard.clerk.com):

1. **Create Application**:
   - Create a new application named `MealAI` (or use an existing one).
2. **Copy API Keys**:
   - Go to **API Keys** in the Clerk Dashboard sidebar.
   - Copy the **Publishable key** (`pk_test_...`) into `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`.
   - Copy the **Secret key** (`sk_test_...`) into `CLERK_SECRET_KEY`.
3. **Configure Allowed Development Origin**:
   - Ensure `http://localhost:3000` is listed under allowed domains/origins.
4. **Sign-in & Sign-up Methods (Preventing Phone from Blocking Sign-Up)**:
   - Go to **User & Authentication** > **Email, Phone, Username**.
   - Ensure **Email address** is toggled **ON** and set as **Required**.
   - Under **Authentication factors**, ensure **Password** is enabled.
   - **Important**: Set **Phone number** to **Optional** (or disabled for initial sign-up).
   - *Why this matters*: If Phone number is set to "Required", Clerk forces every new user to submit an SMS OTP during registration and displays a mandatory "Fill in missing fields" phone prompt after Google OAuth. Setting it to Optional ensures users are never blocked from registering with Email/Password or Google.

5. **Enable Google OAuth**:
   - Go to **User & Authentication** > **Social Connections**.
   - Enable **Google**.
   - In development, you can use Clerk's shared development credentials or configure custom Google Cloud OAuth 2.0 Client credentials.

6. **Indian (+91) Phone Authentication & Clerk SMS Country Allowlist**:
   - Clerk restricts SMS OTP delivery via an **SMS Country Allowlist** to prevent telecommunication fraud and comply with carrier requirements (such as India's TRAI DLT registration rules).
   - If an Indian (`+91`) number is entered while India is not enabled on your Clerk instance, Clerk returns:
     > `Phone numbers from this country (India) are currently not supported.` (`unsupported_country_code`).
   - **How to enable India in Clerk Dashboard**:
     1. Go to **User & Authentication** > **Phone numbers** (or in some dashboard layouts: **Settings** > **SMS** -> **Country allowlist**).
     2. Search for **India (+91)**.
     3. If India is enabled/available for your Clerk instance, toggle **India** to **Enabled** and save.
     4. *Note on Carrier / DLT compliance*: If Clerk indicates India cannot receive SMS on the shared development pool, configure custom Twilio SMS credentials in Clerk with approved Indian DLT headers, or rely on Email/Password and Google sign-in.
   - **Alternative Sign-in Always Available**:
     - The application never traps users on unsupported country phone errors. If an Indian number is entered on an instance without Indian SMS, MealAI provides instant 1-click fallback buttons to sign in with **Google** or **Email/Password**.

7. **Development & Testing without Real SMS**:
   - Never use arbitrary real phone numbers for automated or daily development testing.
   - In Clerk Dashboard, navigate to **User & Authentication** > **Testing**.
   - Add a test phone number (e.g. `+1 555-555-0100` or `+91 99999 99999`) and assign a static verification code (e.g. `424242`).
   - Clerk will accept this test number and code instantly without dispatching real SMS or incurring carrier charges.

8. **Verify Application Routing Paths**:
   - Ensure redirect URLs match the actual application routes:
     - Sign-in: `http://localhost:3000/sign-in`
     - Sign-up: `http://localhost:3000/sign-up`
     - SSO OAuth Callback: `http://localhost:3000/sso-callback`
     - After Sign-in / Home: `http://localhost:3000/`

---

### Step 4: Start the Development Server

Start the Next.js development server with Turbopack:

```bash
npm run dev
```

The server starts and outputs:

```text
▲ Next.js 16.3.8 (Turbopack)
- Local:   http://localhost:3000
✓ Ready in ~800ms
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### Step 5: Verify the Application (Smoke-Test Checklist)

Use this checklist to verify that all authentication and application features function as expected:

- [ ] **Home page loads**: Visiting `http://localhost:3000` displays the MealAI hero section, recipe search, and navigation.
- [ ] **Public pages load without authentication**: Landing page (`/`), catalog recipes (`/api/catalog/recipes`), and health checks (`/api/health`) respond with HTTP 200 without requiring login.
- [ ] **Email/password sign-up works without a phone number**: Registering with email, name, and password creates an authentic Clerk account without prompting for phone verification.
- [ ] **Google sign-up works without a phone number**: Authenticating with Google completes registration without prompting a mandatory "Fill in missing fields" phone screen.
- [ ] **Sign-in works**: Entering valid credentials on `http://localhost:3000/sign-in` logs in the user and redirects to `/`.
- [ ] **Sign-out works**: Clicking "Sign Out" destroys the session and returns the user to the signed-out state.
- [ ] **Indian `+91` numbers do not incorrectly appear to be invalid**: Entering an Indian number format is recognized as a valid international number, not an invalid format.
- [ ] **If India is enabled in Clerk, Indian SMS verification works**: Real SMS codes are dispatched and verified through Clerk's phone factor flow.
- [ ] **If India is unavailable, users can still register using email/password or Google**: When an unsupported country error occurs, instant fallback options to continue with Google or Email/Password are provided.
- [ ] **Protected pages reject signed-out users**: Accessing protected features or non-public routes redirects unauthenticated browser sessions to `/sign-in`.
- [ ] **Signed-in users can access protected pages**: Authenticated users can view user profiles, custom meal planners, and AI generators.
- [ ] **API requests contain a valid Clerk authentication context**: `fetchWithAuth()` in `src/lib/api.ts` attaches `Authorization: Bearer <clerk_token>`.
- [ ] **API routes reject unauthenticated requests**: Calling `POST /api/ai/generate-recipe` or other protected endpoints without a verified session token returns HTTP `401 Unauthorized`.
- [ ] **User-specific data uses the Clerk user ID**: Preferences, saved recipes, and meal plans are stored under `mealai_profile_${user.uid}` using the verified Clerk User ID.
- [ ] **Refreshing the browser preserves the Clerk session**: The Clerk session cookie keeps the user logged in across page reloads.
- [ ] **No fake user is created**: Mock users like "Chef Alex" or `guest_user` do not appear as authenticated users.
- [ ] **No password is stored in localStorage**: Passwords and sensitive credentials are handled exclusively by Clerk and never touch browser storage.
- [ ] **No fake OTP verification exists**: Synthetic test codes (like `"123456"`) are rejected; only Clerk's factor verification succeeds.
- [ ] **No phone number is silently marked as verified**: Phone numbers are only marked as verified when verified by Clerk.
- [ ] **The application does not bypass Clerk's country restrictions**: All phone factor operations respect Clerk's official country SMS allowlist.

---

### Step 6: Verify the Production Build

Validate that the application compiles and runs in production mode:

```bash
# 1. Compile the production bundle with Next.js Turbopack
npm run build

# 2. Start the optimized production server
npm start
```

The production server starts on `http://localhost:3000`. Verify that the landing page and authentication flows operate identically to development.

---

### Step 7: Troubleshooting

| Issue | Cause | Fix |
| :--- | :--- | :--- |
| **Missing `.env.local`** | The environment file was not created in the root directory. | Run `cp .env.example .env.local` and add your Clerk credentials. Next.js will automatically detect `.env.local` upon restart. |
| **Invalid Clerk keys** | `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` or `CLERK_SECRET_KEY` is incorrect, truncated, or contains spaces. | Copy the exact keys from [Clerk Dashboard](https://dashboard.clerk.com) > **API Keys**. The publishable key must begin with `pk_test_` and the secret key with `sk_test_`. |
| **Clerk redirect URL mismatch** | Redirect after sign-in fails or redirects to an invalid port. | Ensure `APP_URL=http://localhost:3000` is set in `.env.local` and `http://localhost:3000` is added to your Clerk allowed domains. |
| **Missing required API keys (`GEMINI_API_KEY`)** | AI operations report warning or offline status. | Add a valid key from [Google AI Studio](https://aistudio.google.com/) to `GEMINI_API_KEY=` in `.env.local`. MealAI will fallback to offline rule-based generation if this key is omitted. |
| **Database / storage unavailable** | Private browsing mode or browser storage blockers prevent reading `localStorage`. | Ensure browser permissions allow local storage for `localhost:3000`. MealAI stores content and user preferences keyed by Clerk user ID in browser local storage. |
| **Port `3000` already in use** | Another development server or background process is listening on port 3000. | On Windows, run `netstat -ano \| findstr :3000` and `taskkill /F /PID <pid>`. Alternatively, run `PORT=3001 npm run dev` and update your Clerk allowed redirect origin. |
| **Node.js version incompatibility** | Using an older Node.js version (< 18.18.0) fails with syntax or Web API errors. | Upgrade to Node.js 20.x or 22.x LTS using [nvm](https://github.com/nvm-sh/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows): `nvm install 20 && nvm use 20`. |
| **Dependency installation errors** | Peer dependency collision between `@clerk/nextjs` and `next@16.x`. | Ensure `.npmrc` contains `legacy-peer-deps=true`. Run `npm install` directly. |
| **Authentication middleware errors** | Deprecated Next.js middleware conventions or incorrect path matchers. | MealAI uses Next.js 16's `src/proxy.ts` with explicit route matching. Public routes (`/`, `/sign-in`, `/sign-up`, `/sso-callback`, `/api/health`, `/api/catalog/*`) bypass auth while securing protected routes. |
| **API requests returning `401 Unauthorized`** | Calling protected API endpoints without a valid Clerk session token. | Ensure you are signed in through Clerk before making AI requests. The frontend automatically includes `Authorization: Bearer <token>` via `src/lib/api.ts`. Unverified requests or spoofed `x-user-id` headers are rejected with 401. |

---

## Authentication Architecture Summary

- **Single Source of Truth**: All authentication state, sessions, and credentials are managed directly by **Clerk** via `@clerk/nextjs`.
- **Zero Mock State**: Mock users, simulated Google profiles, fake verification codes, and localStorage passwords have been completely purged.
- **Cryptographic Server Verification**: Backend route handlers and middleware verify session tokens using Clerk's SDK (`auth()` and `verifyToken(token, { secretKey })`). Arbitrary bearer tokens and `x-user-id` headers are strictly rejected.
- **Separate Guest Access**: Guest access is maintained in-memory for catalog exploration and is explicitly isolated from authenticated user records.
- **Next.js 16 Proxy Middleware**: Route matching in `src/proxy.ts` guarantees public routes remain accessible while routing unauthenticated protected API requests to HTTP 401 JSON and protected web pages to `/sign-in`.

---

## Scripts Reference

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts local Next.js development server on port 3000 with Turbopack |
| `npm run build` | Compiles the production build with Turbopack and TypeScript verification |
| `npm run start` | Runs the compiled production server |
| `npm run typecheck` | Validates TypeScript types across the entire project (`tsc --noEmit`) |
| `npm run lint` | Runs Next.js ESLint checks |
