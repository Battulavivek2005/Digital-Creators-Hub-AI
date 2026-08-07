from models.db import get_db_connection


def get_dashboard_counts():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) FROM admin_users")
    admins = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM services")
    services = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM portfolio")
    portfolio = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM testimonials")
    testimonials = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM contact_messages")
    contacts = cursor.fetchone()[0]

    conn.close()

    return {
        "total_admins": admins,
        "total_services": services,
        "total_portfolio": portfolio,
        "total_testimonials": testimonials,
        "total_contacts": contacts
    }