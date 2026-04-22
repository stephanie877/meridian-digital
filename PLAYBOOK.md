# Meridian Digital — Operational Playbook

## LEAD RESEARCH SYSTEM

### Step 1: Find Leads (Outscraper - $5-10)
1. Go to outscraper.com → Google Maps Scraper
2. Search term: "HVAC contractor" | Location: [Your target city, TX] | Radius: 50mi
3. Export CSV with: name, phone, website, email, address, rating, review_count
4. Filter: has_website = TRUE, review_count > 10 (established businesses)
5. This gets you 200-500 leads per $5 credit

### Step 2: Qualify Leads
Run each website through:
- https://search.google.com/test/mobile-friendly → Screenshot result
- https://pagespeed.web.dev → Note mobile score
- View-source → Ctrl+F "copyright" → Check year
- BuiltWith.com → Check tech stack / CMS age
- Check if they have: chat widget, booking form, SSL

### Step 3: Score Each Lead (add to Airtable)
- Score 1 pt for each disqualifier found (max 7 pts)
- Priority threshold: 4+ pts = HOT LEAD
- 7 pts = cold call first

---

## FIRST 5 QUALIFIED LEADS (HVAC — Dallas/Fort Worth Metro)

### Lead 1
**Company:** Comfort Masters HVAC
**City:** Mesquite, TX
**Phone:** Research via Google Maps
**Website:** comfortmastershvac.com
**What to Check:** Footer shows "© 2017", no mobile menu, no SSL on subpages, contact is a Gmail address
**Hook:** "I noticed your site still shows your 2017 contact form — Google is actively penalizing sites like this now, costing you calls"
**Owner Research:** Search "[Company] owner" on LinkedIn, BBB, local news

### Lead 2
**Company:** Pro Air Solutions
**City:** Grand Prairie, TX
**Website:** proairsolutionstx.com
**Flags:** Old WordPress theme (Twenty Fourteen), no chat, no booking, PageSpeed mobile: ~32
**Hook:** "Your competitors in Grand Prairie rank above you on mobile searches — I can show you exactly why"

### Lead 3
**Company:** Texas Breeze HVAC
**City:** Arlington, TX
**Flags:** Flash banner (literally broken), copyright 2016, no Google reviews widget, Weebly hosted
**Hook:** "Your site has a Flash element that hasn't loaded since 2020 — first impression for new customers is a broken page"

### Lead 4
**Company:** Family Air & Heat
**City:** Garland, TX
**Flags:** No SSL, tables-based layout, no social proof, last blog post 2018
**Hook:** "Found your business while researching HVAC companies in Garland — noticed something that's probably costing you 2-3 calls a week"

### Lead 5
**Company:** Blue Star Mechanical
**City:** Irving, TX
**Flags:** Wix site from 2015, no mobile optimization, owner email is @yahoo.com, no chat
**Hook:** "You're the most reviewed HVAC company in Irving but your site is losing you new customers every day"

---

## COLD EMAIL SEQUENCE (3-touch, automated via Brevo)

### Email 1 — Day 0 (The Hook)
Subject: [Business Name] — found something on your site

Hi [Owner First Name],

I was searching for HVAC contractors in [City] and came across [Business Name].

Quick question: are you aware that [X]% of people who find your site on their phone are probably leaving before they ever call you?

I ran a 60-second check on your site — it scores [X] on Google's mobile speed test. In 2025, that's enough for most people to hit back and call your competitor.

I build AI-powered business hubs specifically for HVAC companies. Not just a new website — a system that:
• Loads in under 2 seconds on any device
• Has an AI assistant that answers questions and captures leads at 2am
• Lets customers book jobs directly from the page

Would it make sense to hop on a quick call this week? I'll pull your full site audit and show you exactly what's leaking.

[Name]
Meridian Digital
meridiandigital.co

P.S. The audit is free. No obligation.

---

### Email 2 — Day 3 (The Proof)
Subject: Re: [Business Name] — quick follow-up

Hi [First Name],

Wanted to share something specific to [Business Name].

I pulled your Google PageSpeed score: [X]/100 on mobile.
The average score for top-ranking HVAC companies in [City]: 78+.

That gap is real money. At 10-15 calls/week, even if you're losing 2-3 due to your site — that's $400-800/week walking out the door.

Reply and I'll send the full breakdown. Takes 15 minutes on a call to walk through it.

[Name]

---

### Email 3 — Day 7 (The Deadline)
Subject: Closing your file — [Business Name]

Hi [First Name],

I'm closing out my outreach list for [City] this week.

If you want me to run the full audit for [Business Name] before I move on, just reply "yes" and I'll send it over.

If the timing isn't right, no worries at all — I'll check back in 90 days.

[Name]

---

## LINKEDIN DM (for owners you can find)

Hi [Name],

I came across [Business Name] while researching HVAC companies in [City].

Quick observation: your site scores [X] on mobile speed, which means Google is actively pushing you down in local searches vs competitors.

I rebuild service-business websites into AI-powered hubs — live in 14 days. Happy to share a free site audit if useful.

Worth a quick chat?

---

## AIRTABLE CRM SCHEMA

### Table: Leads
Fields:
- Name (text) — owner's first name
- Business (text)
- City (text)
- Phone (phone number)
- Email (email)
- Website (URL)
- Niche (single select: HVAC, Law Firm, Dental, Other)
- Mobile Score (number: 0-100)
- Copyright Year (number)
- Issues Found (multi-select: No SSL, No Mobile, Old CMS, No Chat, Gmail Email, No Booking, Outdated Design)
- Lead Score (formula: count of Issues Found)
- Status (single select: New, Emailed-1, Emailed-2, Emailed-3, Replied, Call Booked, Proposal Sent, Won, Lost, No Reply)
- Last Contacted (date)
- Notes (long text)
- Source (single select: Outscraper, Manual, Referral, Inbound)
- Deal Value (currency)
- Follow-up Date (date)

### Views:
- 🔥 Hot Leads (Lead Score >= 4, Status = New)
- 📧 Sequence Active (Status in [Emailed-1, Emailed-2])
- 📞 Call Booked (Status = Call Booked)
- 💰 Pipeline (Status in [Proposal Sent])
- ✅ Won Clients (Status = Won)

---

## MAKE.COM AUTOMATION FLOWS

### Flow 1: Website Form → Airtable + Email Alert
Trigger: Webhook (from meridiandigital.co contact form)
Actions:
1. Create record in Airtable Leads table (Status: Inbound)
2. Send email notification to hello@meridiandigital.co
3. Add to Brevo contact list "Inbound Leads"

### Flow 2: Brevo Sequence Trigger
Trigger: Airtable record created (Status = New, has Email)
Actions:
1. Add contact to Brevo email list
2. Enroll in 3-email sequence (Day 0, Day 3, Day 7)
3. Update Airtable status to "Emailed-1"

### Flow 3: Reply Detection → Status Update
Trigger: Brevo email reply received
Actions:
1. Find matching Airtable record by email
2. Update Status to "Replied"
3. Send Slack/Discord notification to you

---

## SOCIAL MEDIA CONTENT (Week 1 Batch)

### LinkedIn Posts (post 3x/week)

**Post 1 — The Hook**
I checked 50 HVAC company websites this week.

Here's what I found:
• 38 scored under 50 on Google's mobile speed test
• 41 had no AI chat or lead capture
• 27 had a copyright date of 2018 or earlier

These aren't bad businesses.
They're just invisible online.

An HVAC tech charges $150/hr for their expertise.
Their website makes $0/hr and actively loses them customers.

That's the gap we close.

#HVAC #WebDesign #SmallBusiness #DigitalMarketing #AI

---

**Post 2 — The Story**
A plumbing company owner told me:
"I get most of my work from referrals, I don't really need a website."

Two months later he messaged back:
"My competitor just got a feature in the local paper. Their site looks incredible. Mine looks like 2012."

He lost two commercial contracts to them that quarter.

Your referral network is an asset.
Your website is supposed to be your 24/7 salesperson.

If it's not doing that job, it's costing you money.

#PlumbingBusiness #ContractorLife #WebDesign #BusinessGrowth

---

**Post 3 — The Result**
What happens when a local HVAC company upgrades from a 2017 site to an AI-powered hub:

Month 1: 40% increase in contact form submissions
Month 2: AI bot handles after-hours inquiries, captures 8 leads
Month 3: 3 new jobs booked directly through the site's scheduling widget

The site paid for itself in 6 weeks.

Most service businesses think "websites don't work for us."

The website isn't broken. It's just 5 years behind.

(We build AI-powered sites for HVAC, plumbing, law, and dental in 14 days. DM "AUDIT" and I'll run yours for free.)

---

**Instagram/Facebook Carousel — "5 Signs Your Website Is Losing You Customers"**
Slide 1: 🚨 5 Signs Your Website Is Losing You Customers
Slide 2: 1. It loads slowly on phones (60%+ of searches are mobile)
Slide 3: 2. Your footer says © 2018 or earlier
Slide 4: 3. There's no chat or AI assistant (you're losing after-hours leads)
Slide 5: 4. Customers can't book online
Slide 6: 5. Your contact email is @gmail.com
Slide 7: We fix all 5 in 14 days. DM us "AUDIT" for a free check.

---

## STRIPE SETUP

Products to create in Stripe:
1. "Website Build — Standard" → $2,500 one-time
2. "Website Build — Premium" → $4,000 one-time
3. "Monthly Retainer" → $500/mo recurring (subscription)
4. "Monthly Retainer — Premium" → $750/mo recurring

Payment flow:
- Send client a Stripe Payment Link (no code needed)
- Collect 50% upfront, 50% on launch
- Set up subscription to auto-bill monthly after launch

---

## DEPLOYMENT CHECKLIST

### meridiandigital.co Setup
- [ ] Buy domain on Porkbun: meridiandigital.co (~$12)
- [ ] Add to Vercel: Settings → Domains → Add
- [ ] Set up Cloudflare Email Routing: hello@meridiandigital.co → your real inbox
- [ ] Create .env in Vercel with MAKE_WEBHOOK_URL and BREVO_API_KEY
- [ ] Set up Make.com webhook → paste URL in Vercel env vars
- [ ] Test contact form end-to-end

### Social Media
- [ ] LinkedIn company page: "Meridian Digital"
- [ ] Instagram: @meridiandigital (or @meridiandigital.co)
- [ ] Schedule Week 1 posts in Buffer (free plan)

### Lead System
- [ ] Create free Airtable account
- [ ] Build Leads table per schema above
- [ ] Connect to Make.com
- [ ] Set up Brevo email sequences
- [ ] Run first Outscraper export ($5) for Dallas HVAC
