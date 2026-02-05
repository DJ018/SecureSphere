# 🔍 Quick API Test Instructions

## Step 1: Find Your Exact Vercel URL

From your Vercel dashboard (https://vercel.com/dj018s-projects), find the SecureSphere project and copy the deployment URL.

It will look like one of these:
- `https://securesphere.vercel.app`
- `https://securesphere-dj018.vercel.app`
- `https://secure-sphere-xyz.vercel.app`

## Step 2: Test the API Endpoint

**Replace `YOUR-URL` below with your actual Vercel URL**, then open in browser:

### Test Quiz API:
```
https://YOUR-URL.vercel.app/api/games-all/questions/quiz
```

**What you should see:**
```json
{
  "success": true,
  "questions": [
    {
      "question": "What does HTTPS stand for?",
      "options": [...],
      "correct": 0,
      "explanation": "..."
    },
    ...12 questions total
  ]
}
```

### Test Scenario API:
```
https://YOUR-URL.vercel.app/api/games-all/questions/scenario
```

### Test Password API:
```
https://YOUR-URL.vercel.app/api/games-all/questions/password
```

## Step 3: Test the Game Page

```
https://YOUR-URL.vercel.app/game.html
```

## What to Report Back

Please tell me:

1. **Your exact Vercel URL:** `https://_____________.vercel.app`

2. **What happens when you visit the quiz API URL:**
   - [ ] I see JSON with 12 questions ✅
   - [ ] I see a 404 error ❌
   - [ ] I see a different error (tell me what)

3. **What happens when you visit game.html:**
   - [ ] I see the name entry screen ✅
   - [ ] I see "unable to load game" error ❌
   - [ ] Something else (describe)

4. **Are you testing:**
   - [ ] On Vercel URL (https://...)
   - [ ] Local file (file:///)

---

## Common Scenarios

### Scenario A: API shows JSON ✅ but game.html shows error ❌
**Cause:** Frontend issue
**Fix:** I'll update the frontend code

### Scenario B: API shows 404 ❌
**Cause:** Deployment issue or API not deployed
**Fix:** Force redeploy with new commit

### Scenario C: Testing on local file (file:///)
**Cause:** Games don't work locally
**Fix:** MUST use Vercel URL

---

**Please test the API URL first and report back what you see!**
