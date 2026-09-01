from models.db import get_db_connection


def get_dashboard_counts():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) AS count FROM admin_users")
    admins = cursor.fetchone()["count"]

    cursor.execute("SELECT COUNT(*) AS count FROM services")
    services = cursor.fetchone()["count"]

    cursor.execute("SELECT COUNT(*) AS count FROM portfolio")
    portfolio = cursor.fetchone()["count"]

    cursor.execute("SELECT COUNT(*) AS count FROM testimonials")
    testimonials = cursor.fetchone()["count"]

    cursor.execute("SELECT COUNT(*) AS count FROM contact_messages")
    contacts = cursor.fetchone()["count"]

    conn.close()

    return {
        "total_admins": admins,
        "total_services": services,
        "total_portfolio": portfolio,
        "total_testimonials": testimonials,
        "total_contacts": contacts
    }