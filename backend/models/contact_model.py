from models.db import get_db_connection


def create_contact(name, email, phone, subject, message):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO contact_messages
        (name, email, phone, subject, message)
        VALUES (%s, %s, %s, %s, %s)
    """, (
        name,
        email,
        phone,
        subject,
        message
    ))

    conn.commit()
    conn.close()


def get_all_contacts():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT * FROM contact_messages
        ORDER BY id DESC
    """)

    contacts = cursor.fetchall()
    conn.close()

    return [dict(row) for row in contacts]


def get_contact_by_id(contact_id):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM contact_messages WHERE id=%s",
        (contact_id,)
    )

    contact = cursor.fetchone()
    conn.close()

    return dict(contact) if contact else None


def update_contact_status(contact_id, status):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE contact_messages
        SET status=%s
        WHERE id=%s
    """, (
        status,
        contact_id
    ))

    conn.commit()
    conn.close()


def delete_contact(contact_id):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM contact_messages WHERE id=%s",
        (contact_id,)
    )

    conn.commit()
    conn.close()