# Airtable CRM Setup Guide
_Follow these steps exactly — takes about 20 minutes_

---

## STEP 1: CREATE YOUR AIRTABLE BASE

1. Go to airtable.com → Sign up free
2. Create new Base → name it "Meridian Digital CRM"
3. Delete the default "Table 1" columns — start fresh

---

## STEP 2: BUILD THE LEADS TABLE

Rename "Table 1" to **Leads**, then add these fields in order:

| # | Field Name | Field Type | Options/Notes |
|---|---|---|---|
| 1 | Business | Single line text | Primary field |
| 2 | Owner Name | Single line text | First name |
| 3 | Email | Email | |
| 4 | Phone | Phone number | |
| 5 | Website | URL | |
| 6 | City | Single line text | |
| 7 | Niche | Single select | Options: Restoration, Electrician, GC, Auto Repair, Inbound, Other |
| 8 | Mobile Score | Number | Integer, 0–100 |
| 9 | Copyright Year | Number | Integer |
| 10 | Issues Found | Multiple select | Options: No SSL, No Mobile, Old CMS, No Chat, No Booking, Gmail Email, No Reviews, Outdated Design, No Schema, No Portfolio |
| 11 | Lead Score | Formula | `COUNT(VALUES({Issues Found}))` |
| 12 | Status | Single select | New, Emailed-1, Emailed-2, Emailed-3, Replied, Call Booked, Proposal Sent, Won, Lost, No Reply |
| 13 | Source | Single select | Outscraper, Manual, Inbound, Referral |
| 14 | Last Contacted | Date | Include time: off |
| 15 | Follow-up Date | Date | Include time: off |
| 16 | Owner Research | Long text | LinkedIn findings, review themes |
| 17 | Personalization Hook | Long text | The specific angle for this lead |
| 18 | Deal Value | Currency | USD, estimated setup + 6mo retainer |
| 19 | Notes | Long text | |
| 20 | LinkedIn URL | URL | Owner's LinkedIn if found |

---

## STEP 3: CREATE VIEWS

In the left sidebar, add these views:

**View 1: 🔥 Hot Leads**
- Filter: Lead Score ≥ 6 AND Status = "New"
- Sort: Lead Score (highest first)

**View 2: 🌡️ Warm Leads**
- Filter: Lead Score = 4 OR Lead Score = 5, AND Status = "New"

**View 3: 📧 In Sequence**
- Filter: Status is any of [Emailed-1, Emailed-2, Emailed-3]
- Sort: Last Contacted (oldest first)

**View 4: 📞 Call Booked**
- Filter: Status = "Call Booked"

**View 5: 💰 Pipeline**
- Filter: Status = "Proposal Sent"

**View 6: ✅ Won Clients**
- Filter: Status = "Won"

**View 7: 🔄 Follow Up Today**
- Filter: Follow-up Date = today
- Sort: Niche

---

## STEP 4: CREATE A SECOND TABLE — CLIENTS

Once you win clients, track them here.

Add a new table called **Clients** with:

| Field | Type | Notes |
|---|---|---|
| Business | Single line text | Primary |
| Owner Name | Single line text | |
| Email | Email | |
| Phone | Phone | |
| Website (Old) | URL | Their old site |
| Website (New) | URL | Their new Meridian-built site |
| Niche | Single select | |
| Setup Fee | Currency | |
| Monthly Retainer | Currency | |
| Setup Paid | Checkbox | |
| Retainer Active | Checkbox | |
| Launch Date | Date | |
| Contract Start | Date | |
| Next Retainer Date | Date | |
| Stripe Customer ID | Single line text | From Stripe dashboard |
| Notes | Long text | |
| Link to Lead | Link to Leads table | Connect to their original lead record |

---

## STEP 5: CONNECT TO MAKE.COM

1. Go to make.com → Create free account
2. Create new Scenario → name it "Website Form → CRM"
3. Add trigger: **Webhooks → Custom webhook** → Copy the webhook URL
4. Paste URL into Vercel env vars as `MAKE_WEBHOOK_URL`
5. Add action: **Airtable → Create Record** → connect your base → select Leads table
6. Map fields: name→Owner Name, business→Business, email→Email, phone→Phone, message→Website, source→"Inbound", status→"Replied"
7. Add second action: **Email → Send Email** → to hello@meridiandigital.co → "New inbound lead: {{business}}"
8. Save and activate scenario

---

## STEP 6: MAKE.COM — SEQUENCE TRIGGER

Create a second scenario: "New Lead → Brevo Sequence"

1. Trigger: **Airtable → Watch Records** → Leads table → filter: Status = "New" AND Email not empty
2. Action: **Brevo → Add Contact to List** → select list by Niche field value
3. Action: **Airtable → Update Record** → set Status = "Emailed-1", Last Contacted = today, Follow-up Date = today + 3 days
4. Activate scenario → set schedule: every 15 minutes

---

## STEP 7: ADD LEADS FROM OUTSCRAPER

When you get your CSV from Outscraper:
1. Clean it in Google Sheets: remove rows with no website, review_count < 5
2. Add columns: Mobile Score, Copyright Year, Issues Found (fill manually for top 50)
3. Airtable → Import CSV → map columns to your fields
4. Open 🔥 Hot Leads view — those are your first email targets
5. Change Status from "New" to trigger the Make.com automation

---

## QUICK SCORING GUIDE (for manual qualification)

When checking a site, open these 4 tabs:
1. `pagespeed.web.dev` — paste URL, select Mobile, note score
2. `search.google.com/test/mobile-friendly` — pass/fail
3. `builtwith.com` — note CMS platform
4. The site itself — view-source → Ctrl+F "copyright" → note year

Score in Airtable. If Lead Score ≥ 4, mark as qualified and let automation enroll them.
