from models.db import get_db_connection


def create_portfolio(
    title,
    description,
    category,
    image,
    project_url,
    featured
):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO portfolio
        (title, description, category, image, project_url, featured)
        VALUES (%s, %s, %s, %s, %s, %s)
    """, (
        title,
        description,
        category,
        image,
        project_url,
        featured
    ))

    conn.commit()
    conn.close()


def get_all_portfolios():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT * FROM portfolio
        ORDER BY id DESC
    """)

    portfolios = cursor.fetchall()
    conn.close()

    return [dict(row) for row in portfolios]


def get_portfolio_by_id(portfolio_id):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM portfolio WHERE id=%s",
        (portfolio_id,)
    )

    portfolio = cursor.fetchone()
    conn.close()

    return dict(portfolio) if portfolio else None


def update_portfolio(
    portfolio_id,
    title,
    description,
    category,
    image,
    project_url,
    featured,
    status
):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE portfolio
        SET title=%s,
            description=%s,
            category=%s,
            image=%s,
            project_url=%s,
            featured=%s,
            status=%s
        WHERE id=%s
    """, (
        title,
        description,
        category,
        image,
        project_url,
        featured,
        status,
        portfolio_id
    ))

    conn.commit()
    conn.close()


def delete_portfolio(portfolio_id):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM portfolio WHERE id=%s",
        (portfolio_id,)
    )

    conn.commit()
    conn.close()