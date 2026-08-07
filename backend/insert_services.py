import sqlite3
from config import DATABASE_PATH

services = [
    ("Google Business Profile Optimization", "Rank higher on Google Maps with optimized business profile.", "fa-globe"),
    ("Website Development", "Professional business websites.", "fa-code"),
    ("CRM Development", "Custom CRM solutions for your business.", "fa-database"),
    ("AI CRM Solutions", "AI-powered CRM automation.", "fa-brain"),
    ("WhatsApp Business Automation", "Automate customer communication using WhatsApp.", "fa-whatsapp"),
    ("AI Voice Calling Solutions", "AI voice agents for customer support and sales.", "fa-phone"),
    ("AI Chatbots & AI Agents", "24/7 AI chatbots for websites and social media.", "fa-robot"),
    ("Mobile App Development", "Android & iOS business applications.", "fa-mobile"),
    ("Search Engine Optimization (SEO)", "Improve your Google search rankings.", "fa-search"),
    ("Google Ads Management", "Generate leads using Google Ads.", "fa-google"),
    ("Meta Ads Management", "Facebook & Instagram advertising.", "fa-bullseye"),
    ("Social Media Marketing", "Grow your brand on social media.", "fa-share"),
    ("Branding & Creative Design", "Professional logos and branding.", "fa-palette"),
    ("AI Business Automation", "Automate business workflows using AI.", "fa-workflow"),
    ("Lead Generation Solutions", "Generate quality leads for your business.", "fa-user-plus"),
    ("Business Consulting", "Expert consulting for business growth.", "fa-briefcase"),
]

conn = sqlite3.connect(DATABASE_PATH)
cursor = conn.cursor()

inserted = 0

for title, description, icon in services:
    cursor.execute(
        "SELECT id FROM services WHERE title = ?",
        (title,)
    )

    if cursor.fetchone() is None:
        cursor.execute(
            """
            INSERT INTO services
            (title, description, icon, status)
            VALUES (?, ?, ?, ?)
            """,
            (title, description, icon, "Active")
        )
        inserted += 1

conn.commit()
conn.close()

print("=" * 45)
print("Digital Creators Hub")
print("=" * 45)
print(f"{inserted} new services inserted successfully.")
print("Finished.")