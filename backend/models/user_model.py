from models.db import get_db_connection


def create_admin(full_name, email, password_hash, role="admin"):
    conn = get_db_connection()

    conn.execute(
        """
        INSERT INTO admin_users
        (full_name, email, password_hash, role)
        VALUES (?, ?, ?, ?)
        """,
        (full_name, email, password_hash, role),
    )

    conn.commit()
    conn.close()


def get_admin_by_email(email):
    conn = get_db_connection()

    admin = conn.execute(
        """
        SELECT * FROM admin_users
        WHERE email = ?
        """,
        (email,),
    ).fetchone()

    conn.close()

    return admin


def get_all_admins():
    conn = get_db_connection()

    admins = conn.execute(
        """
        SELECT id, full_name, email, role, is_active, created_at
        FROM admin_users
        ORDER BY id
        """
    ).fetchall()

    conn.close()

    return admins