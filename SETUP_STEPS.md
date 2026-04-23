# Setup Steps — Do These In Order
_Estimated total time: 2–3 hours first time_

---

## 🔴 STEP 1: Buy the Domain (5 min)
1. Go to **porkbun.com**
2. Search: `meridiandigital.agency`
3. Buy it (~$12/year)
4. Keep the tab open — you'll need it for DNS

---

## 🔴 STEP 2: Deploy the Website to Vercel (10 min)

### Option A — GitHub (recommended)
1. Go to **github.com** → New repository → name: `meridian-digital` → Public → Create
2. Copy the repo URL (e.g. `https://github.com/yourname/meridian-digital.git`)
3. Tell Scoop your GitHub repo URL — I'll push the code there for you
4. Go to **vercel.com** → Add New Project → Import from GitHub → select `meridian-digital`
5. Deploy (default settings are fine)

### Option B — Vercel CLI (if you prefer terminal)
```bash
cd /path/to/meridian-digital
npx vercel login
npx vercel --prod
```
Follow the prompts — it'll give you a live URL.

---

## 🔴 STEP 3: Connect Your Domain (10 min)
1. In Vercel → your project → Settings → Domains
2. Add: `meridiandigital.agency` and `www.meridiandigital.agency`
3. Vercel will show you DNS records to add
4. Go to Porkbun → DNS → add the records Vercel shows you
5. Wait 5–30 min for propagation — then your site is live at meridiandigital.agency ✅

---

## 🔴 STEP 4: Set Up Email Routing (10 min)
**Goal:** Emails to hello@meridiandigital.agency forward to your real inbox

**Option A — Cloudflare Email Routing (free, recommended)**
1. Go to **cloudflare.com** → Add site → enter meridiandigital.agency
2. Follow steps to point Porkbun DNS to Cloudflare nameservers
3. Cloudflare → Email → Email Routing → Enable
4. Add rule: hello@meridiandigital.agency → your personal email
5. Done — hello@ now forwards to you

**Option B — Zoho Mail (free, if you want to SEND from hello@)**
1. Go to **zoho.com/mail** → Free plan → Add domain
2. Verify domain ownership via DNS TXT record
3. Create mailbox: hello@meridiandigital.agency
4. You can now send AND receive from that address

> **Scoop's pick:** Use Cloudflare routing for receiving + Brevo for sending outreach. Simplest setup.

---

## 🔴 STEP 5: Add Env Variables to Vercel (5 min)
_Do this after Step 6 and 7 — you'll have the values by then_

In Vercel → your project → Settings → Environment Variables:
- `MAKE_WEBHOOK_URL` = (from Make.com — see Step 7)
- `BREVO_API_KEY` = (from Brevo → Settings → API Keys)

Then: Vercel → Deployments → Redeploy (to pick up the new env vars)

---

## 🟡 STEP 6: Set Up Brevo (20 min)
1. Go to **brevo.com** → Sign up free (300 emails/day free)
2. Settings → Senders & IPs → Add sender: hello@meridiandigital.agency
3. Create 4 Contact Lists: Restoration, Electrician, GC, Auto Repair
4. Add custom contact attributes (Contacts → Settings → Contact Attributes):
   - BUSINESS (text)
   - MOBILESCORE (number)
   - COPYRIGHTYEAR (number)
   - CITY (text)
   - NICHE (text)
   - WEBSITE (text)
5. Automations → Create 4 automation workflows (one per list)
   - Trigger: "Contact added to list"
   - Email 1: immediately (copy from BREVO_SEQUENCES.md)
   - Wait: 3 days
   - Email 2 (copy from BREVO_SEQUENCES.md)
   - Wait: 4 days
   - Email 3 (copy from BREVO_SEQUENCES.md)
6. Get your API key: Settings → API Keys → Generate → copy it

---

## 🟡 STEP 7: Set Up Make.com (20 min)
1. Go to **make.com** → Sign up free
2. Create Scenario 1: "Website Form → Airtable"
   - Trigger: Webhooks → Custom webhook → copy URL → save as MAKE_WEBHOOK_URL
   - Action: Airtable → Create Record (see AIRTABLE_SETUP.md Step 5)
3. Create Scenario 2: "New Lead → Brevo"
   - Trigger: Airtable Watch Records
   - Action: Brevo Add to List (see AIRTABLE_SETUP.md Step 6)

---

## 🟡 STEP 8: Set Up Airtable (20 min)
Follow AIRTABLE_SETUP.md exactly — Steps 1 through 6.

---

## 🟡 STEP 9: Set Up Stripe (10 min)
1. Log into **stripe.com** (you have an account)
2. Products → Add product:
   - "Website Build — Standard" → $2,500 → One time
   - "Website Build — Premium" → $4,000 → One time
   - "Monthly Retainer — Standard" → $500 → Recurring, monthly
   - "Monthly Retainer — Premium" → $750 → Recurring, monthly
3. For each product → create a Payment Link (the blue button)
4. Save all 4 Payment Links somewhere accessible (you'll send these to clients)
5. When a client agrees → send Standard Build link → collect 50% upfront
6. You can edit Payment Links to charge specific amounts (e.g. $1,250 for 50% of Standard)

---

## 🟢 STEP 10: Social Media (15 min)
1. **LinkedIn Company Page:**
   - linkedin.com → Work → Create a company page
   - Name: Meridian Digital
   - Website: meridiandigital.agency
   - Logo: use the SVG from the website (public/favicon.svg) or screenshot the logo
   - Tagline: "AI-powered business hubs for service companies"

2. **Instagram:**
   - Check @meridiandigital availability
   - Bio: "We rebuild outdated service business websites into AI-powered hubs. 14-day delivery. 🔧⚡🔥"
   - Link: meridiandigital.agency

3. **Buffer (free scheduling):**
   - buffer.com → free plan → connect LinkedIn + Instagram
   - Schedule the 3 LinkedIn posts from PLAYBOOK.md
   - Post immediately on launch day

---

## 🟢 STEP 11: First Lead Research ($5–10)
1. Go to **outscraper.com** → Create account → add $5 credit
2. Google Maps Scraper → search:
   - "water damage restoration" | [Your target city]
   - "fire restoration contractor" | [Your target city]
   - "electrician" | [Your target city]
3. Export CSV
4. Import to Airtable
5. Manually qualify top 30 leads (PageSpeed + mobile check)
6. Let Make.com automation enroll them in Brevo sequences

---

## ✅ LAUNCH CHECKLIST

- [ ] Domain live at meridiandigital.agency
- [ ] Site loads correctly on mobile
- [ ] Contact form submits → Airtable record created → email alert received
- [ ] hello@meridiandigital.agency forwards to your inbox
- [ ] Brevo sequences created and active
- [ ] All 4 Stripe Payment Links saved
- [ ] LinkedIn company page published
- [ ] First 30+ leads in Airtable with sequences running
- [ ] First social post live

---

## 🆘 IF ANYTHING BREAKS

Just tell Scoop what step you're on and what error you're seeing. I'll fix it.
