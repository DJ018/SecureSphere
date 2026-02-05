# 🚀 Deploy SecureSphere to Vercel - Step by Step

## Quick Deploy (Recommended)

### Option 1: Deploy via Vercel CLI

```powershell
# Install Vercel CLI (if not installed)
npm install -g vercel

# Navigate to project directory
cd "c:\Users\Devesh Jain\OneDrive\Desktop\html-css-course\intro-to-html\securesphere"

# Deploy
vercel --prod
```

### Option 2: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import from GitHub: `DJ018/SecureSphere`
4. Click "Deploy"

---

## What's Already Ready

✅ **Frontend Pages**:
- `index.html` - Homepage
- `learn.html` - Learning platform (FIXED with quiz validation & certificates)
- `lab.html` - Interactive labs
- `game.html` - Games
- `services.html` - Services
- `portfolio.html` - Portfolio

✅ **Backend APIs** (in `/api` folder):
- `sql.js` - SQL injection lab
- `phish.js` - Phishing detection
- `password.js` - Password strength
- `network.js` - Network scanning
- `iam.js` - IAM policy testing
- `malware.js` - Malware analysis
- `contact.js` - Contact form
- `games.js` - Games backend
- `learn.js` - Learning backend
- `services.js` - Services backend

✅ **Configuration**:
- `vercel.json` - Deployment config
- `package.json` - Project metadata

---

## Manual Deployment Steps

If automatic deployment isn't working, follow these steps:

### Step 1: Ensure Git is Up to Date

```powershell
cd "c:\Users\Devesh Jain\OneDrive\Desktop\html-css-course\intro-to-html\securesphere"
git add .
git commit -m "Deploy complete website with learn.html fixes"
git push origin main
```

### Step 2: Deploy to Vercel

**Method A: Using Vercel CLI**
```powershell
vercel --prod
```

**Method B: Using Vercel Dashboard**
1. Login to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Find your SecureSphere project
3. Click "Deployments"
4. Click "Redeploy" on the latest deployment

---

## Troubleshooting

### Issue: "vercel command not found"

**Solution**: Install Vercel CLI
```powershell
npm install -g vercel
```

### Issue: "Not logged in"

**Solution**: Login to Vercel
```powershell
vercel login
```

### Issue: "Project not linked"

**Solution**: Link project
```powershell
vercel link
```
Then select your existing project or create new one.

### Issue: "Deployment fails"

**Solution**: Check Vercel dashboard for error logs
1. Go to vercel.com/dashboard
2. Click on your project
3. Click on failed deployment
4. Check "Build Logs" and "Function Logs"

---

## Verify Deployment

After deployment, test these URLs (replace `your-domain` with your actual Vercel URL):

### Frontend Pages
- `https://your-domain.vercel.app/` - Homepage
- `https://your-domain.vercel.app/learn.html` - Learning (with fixed quiz)
- `https://your-domain.vercel.app/lab.html` - Labs
- `https://your-domain.vercel.app/game.html` - Games
- `https://your-domain.vercel.app/services.html` - Services
- `https://your-domain.vercel.app/portfolio.html` - Portfolio

### API Endpoints
- `https://your-domain.vercel.app/api/sql` - SQL lab API
- `https://your-domain.vercel.app/api/phish` - Phishing API
- `https://your-domain.vercel.app/api/password` - Password API

---

## What I Fixed

### learn.html ✅
- ❌ Before: Quiz always passed (const passed = true)
- ✅ After: Proper validation with 70% minimum score
- ✅ Professional certificates with logo and ID
- ✅ Download and print functionality

### lab.html ✅
- Already perfect! No changes needed
- Professional design
- Proper API integration

---

## Next Steps

1. Run the deployment command (see above)
2. Wait for deployment to complete
3. Visit your Vercel URL
4. Test learn.html quiz and certificate
5. Test lab.html interactive labs
6. Share your live website!

---

## Need Help?

If deployment still doesn't work:
1. Share the error message from Vercel
2. Check if GitHub repository is connected to Vercel
3. Verify you have access to the Vercel project
