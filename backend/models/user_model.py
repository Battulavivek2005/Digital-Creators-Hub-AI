from models.db import get_db_connection


def create_admin(full_name, email, password_hash, role="admin"):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO admin_users
        (full_name, email, password_hash, role)
        VALUES (%s, %s, %s, %s)
        """,
        (full_name, email, password_hash, role),
    )

    conn.commit()
    conn.close()


def get_admin_by_email(email):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT * FROM admin_users
        WHERE email = %s
        """,
        (email,),
    )

    admin = cursor.fetchone()

    conn.close()

    return dict(admin) if admin else None


def get_all_admins():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT id, full_name, email, role, is_active, created_at
        FROM admin_users
        ORDER BY id
        """
    )

    admins = cursor.fetchall()

    conn.close()

    return [dict(admin) for admin in admins]