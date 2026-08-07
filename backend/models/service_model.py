from models.db import get_db_connection


def create_service(title, description, icon, image):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO services(title, description, icon, image)
        VALUES (?, ?, ?, ?)
    """, (title, description, icon, image))

    conn.commit()
    conn.close()


def get_all_services():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT * FROM services
        ORDER BY id DESC
    """)

    services = [dict(row) for row in cursor.fetchall()]
    conn.close()

    return services


def get_service_by_id(service_id):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM services WHERE id=?",
        (service_id,)
    )

    service = cursor.fetchone()
    conn.close()

    return dict(service) if service else None


def update_service(service_id, title, description, icon, image, status):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE services
        SET title=?,
            description=?,
            icon=?,
            image=?,
            status=?
        WHERE id=?
    """, (
        title,
        description,
        icon,
        image,
        status,
        service_id
    ))

    conn.commit()
    conn.close()


def delete_service(service_id):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM services WHERE id=?",
        (service_id,)
    )

    conn.commit()
    conn.close()