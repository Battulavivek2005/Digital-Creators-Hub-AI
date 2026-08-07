import sqlite3
from config import DATABASE_PATH

portfolio_projects = [
    (
        "Aurora Bistro - Guest AI",
        "Full reservation, order and loyalty automation for a restaurant chain.",
        "Restaurant Automation"
    ),
    (
        "Skyline Realty CRM",
        "WhatsApp-first lead management with AI property matching.",
        "Real Estate CRM"
    ),
    (
        "Helios Solar Platform",
        "Complete CRM from lead generation to solar installation.",
        "Solar CRM"
    ),
    (
        "NextGen Admissions Suite",
        "AI-powered admission management system for educational institutions.",
        "Education CRM"
    ),
    (
        "Prisma Growth Studio",
        "Digital marketing platform with AI-powered campaign management.",
        "Digital Marketing"
    ),
    (
        "Nomad Café Cloud",
        "Cloud-based restaurant management with AI ordering and analytics.",
        "Restaurant Automation"
    )
]

conn = sqlite3.connect(DATABASE_PATH)
cursor = conn.cursor()

inserted = 0

for title, description, category in portfolio_projects:

    cursor.execute(
        "SELECT id FROM portfolio WHERE title=?",
        (title,)
    )

    if cursor.fetchone() is None:

        cursor.execute("""
            INSERT INTO portfolio
            (
                title,
                description,
                category,
                featured,
                status
            )
            VALUES (?, ?, ?, ?, ?)
        """,
        (
            title,
            description,
            category,
            "Yes",
            "Active"
        ))

        inserted += 1

conn.commit()
conn.close()

print("=" * 45)
print("Digital Creators Hub")
print("=" * 45)
print(f"{inserted} portfolio projects inserted successfully.")
print("Finished.")