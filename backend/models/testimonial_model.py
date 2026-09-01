from models.db import get_db_connection


def create_testimonial(
    client_name,
    company,
    designation,
    review,
    rating,
    image
):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO testimonials
        (client_name, company, designation, review, rating, image)
        VALUES (%s, %s, %s, %s, %s, %s)
    """, (
        client_name,
        company,
        designation,
        review,
        rating,
        image
    ))

    conn.commit()
    conn.close()


def get_all_testimonials():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT * FROM testimonials
        ORDER BY id DESC
    """)

    testimonials = cursor.fetchall()
    conn.close()

    return [dict(row) for row in testimonials]


def get_testimonial_by_id(testimonial_id):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM testimonials WHERE id=%s",
        (testimonial_id,)
    )

    testimonial = cursor.fetchone()
    conn.close()

    return dict(testimonial) if testimonial else None


def update_testimonial(
    testimonial_id,
    client_name,
    company,
    designation,
    review,
    rating,
    image,
    status
):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE testimonials
        SET client_name=%s,
            company=%s,
            designation=%s,
            review=%s,
            rating=%s,
            image=%s,
            status=%s
        WHERE id=%s
    """, (
        client_name,
        company,
        designation,
        review,
        rating,
        image,
        status,
        testimonial_id
    ))

    conn.commit()
    conn.close()


def delete_testimonial(testimonial_id):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM testimonials WHERE id=%s",
        (testimonial_id,)
    )

    conn.commit()
    conn.close()