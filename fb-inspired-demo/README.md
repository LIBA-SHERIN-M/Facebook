# Authorized Project Demo

This is a responsive web project featuring a Facebook-inspired login-page design. It connects to a Supabase backend to store test submissions. 

**Important:** This is an authorized demonstration project. It explicitly asks for "Test value" and does not collect real credentials. It uses its own branding ("ConnectSphere") and does not use Facebook's trademarked logos.

## Setup Instructions

Follow these steps to connect this project to your own Supabase database and deploy it to the web.

### 1. Create a Supabase Project
1. Go to [Supabase](https://supabase.com/) and sign up or log in.
2. Click **"New Project"**.
3. Select your organization, give your project a name (e.g., `connectsphere-demo`), and generate a secure database password.
4. Choose a region close to you and click **"Create new project"**. Wait a few minutes for the database to provision.

### 2. Create the `submissions` Table
1. In your Supabase dashboard, go to the **SQL Editor** (the terminal icon on the left sidebar).
2. Click **"New query"**.
3. Paste and run the following SQL command to create the table:

```sql
CREATE TABLE submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username TEXT NOT NULL,
    test_value TEXT NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. Enable and Configure Row Level Security (RLS)
By default, tables in Supabase should have RLS enabled to prevent unauthorized access.

1. Still in the **SQL Editor**, run this command to enable RLS on the table:

```sql
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
```

### 4. Add the Required INSERT Policy
You need to allow anyone (the public) to insert data into the form, but prevent them from reading data submitted by others.

1. Run this command in the **SQL Editor** to create an insert-only policy:

```sql
CREATE POLICY "Allow public insert" 
ON submissions 
FOR INSERT 
TO public 
WITH CHECK (true);
```
*(Security Note: We DO NOT create a `SELECT` policy. This ensures that while anyone can submit data through the form, nobody can fetch or view the existing submissions via the public API. Only you can view the data through the secure Supabase Table Editor.)*

### 5. Get the Supabase Project URL and Public Anon Key
1. In your Supabase dashboard, go to **Project Settings** (the gear icon at the bottom of the left sidebar).
2. Click on **"API"** under the Configuration section.
3. Under **Project URL**, copy the URL.
4. Under **Project API keys**, copy the `anon` `public` key. 
*(Security Note: It is safe to use the `anon` key in frontend code, as its permissions are strictly governed by the Row Level Security policies you just set up. NEVER expose the `service_role` key).*

### 6. Update the JavaScript Configuration
1. Open the `script.js` file in this project.
2. Replace the placeholder values at the top of the file with your actual URL and Key:

```javascript
const SUPABASE_URL = 'https://your-project-id.supabase.co';
const SUPABASE_ANON_KEY = 'your-eyJ...';
```

### 7. Run the Website Locally
Since the project uses plain HTML/CSS/JS, you can simply double-click `index.html` to open it in your browser, or use a local server like VS Code's Live Server extension.

### 8. Test a Submission
1. Open the page in your browser.
2. Enter a test username and test value.
3. Click "Log In" (which submits the form).
4. You should see a green success message indicating the submission was recorded.

### 9. Confirm Data in Supabase
1. Go back to your Supabase dashboard.
2. Click on the **Table Editor** (the grid icon in the left sidebar).
3. Click on the `submissions` table.
4. You should see a new row containing the data you just submitted.

### 10. Deploy the Project
To share this project, you need to host it online. **Netlify** or **Vercel** are great free options for static sites.

**Using Netlify (Easiest):**
1. Go to [Netlify Drop](https://app.netlify.com/drop).
2. Drag and drop your entire project folder (containing `index.html`, `style.css`, and `script.js`) onto the page.
3. Netlify will immediately deploy your site and provide a public URL.
4. To customize the URL, create a free Netlify account, claim your site, and go to Site Settings to change the site name (e.g., `your-demo-project.netlify.app`).

**Using GitHub & Vercel/Netlify:**
1. Push this project folder to a new repository on GitHub.
2. Log into [Vercel](https://vercel.com/) or [Netlify](https://netlify.com/) and authorize GitHub.
3. Click "Add New Project" or "Import from Git".
4. Select your repository and deploy.
5. Vercel/Netlify will provide you with a live, shareable URL.

### 11. Final Verification
Share the provided Netlify/Vercel link with your project participants. Any data they submit will securely stream directly into your private Supabase database.
