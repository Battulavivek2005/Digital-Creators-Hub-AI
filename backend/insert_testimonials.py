import sqlite3
from config import DATABASE_PATH

testimonials = [
    (
        "Priya Menon",
        "Skyline Realty",
        "Managing Director",
        "Digital Creators Hub completely transformed our lead generation process. The AI automation has significantly improved our team's productivity.",
        5
    ),
    (
        "Rohan Sharma",
        "Aurora Bistro",
        "Restaurant Owner",
        "Our restaurant operations are now much smoother with WhatsApp automation and AI-powered customer support. Highly recommended!",
        5
    ),
    (
        "Aisha Verma",
        "Helios Solar",
        "Sales Manager",
        "The CRM and automation solutions helped us increase qualified leads and improve our sales process.",
        5
    ),
    (
        "Daniel Cole",
        "NextGen Campus",
        "Admissions Head",
        "The AI chatbot handles student inquiries efficiently, allowing our staff to focus on admissions.",
        5
    ),
    (
        "Sara Ibrahim",
        "Prisma Studio",
        "Marketing Director",
        "Professional service with excellent AI-powered marketing solutions. We achieved outstanding campaign results.",
        5
    ),
    (
        "Vikram Nair",
        "Orbit Foods",
        "Operations Manager",
        "The automation platform saved us countless hours every week. The implementation was smooth and reliable.",
        5
    ),
    (
        "Jessica Chen",
        "Northwind Homes",
        "Sales Head",
        "The AI lead qualification system improved our conversion rates and reduced manual work considerably.",
        5
    ),
    (
        "Arjun Kapoor",
        "Solaris Group",
        "CEO",
        "A complete digital transformation partner. Their AI solutions have taken our business to the next level.",
        5
    )
]

conn = sqlite3.connect(DATABASE_PATH)
cursor = conn.cursor()

inserted = 0

for client_name, company, designation, review, rating in testimonials:

    cursor.execute(
        "SELECT id FROM testimonials WHERE client_name=? AND company=?",
        (client_name, company)
    )

    if cursor.fetchone() is None:

        cursor.execute("""
            INSERT INTO testimonials
            (
                client_name,
                company,
                designation,
                review,
                rating,
                status
            )
            VALUES (?, ?, ?, ?, ?, ?)
        """,
        (
            client_name,
            company,
            designation,
            review,
            rating,
            "Active"
        ))

        inserted += 1

conn.commit()
conn.close()

print("=" * 45)
print("Digital Creators Hub")
print("=" * 45)
print(f"{inserted} testimonials inserted successfully.")
print("Finished.")