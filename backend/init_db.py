    import sqlite3
    import bcrypt
    from config import DATABASE_PATH


    def initialize_database():
        conn = sqlite3.connect(DATABASE_PATH)
        cursor = conn.cursor()

        # Read and execute schema
        with open("schema.sql", "r", encoding="utf-8") as f:
            conn.executescript(f.read())

        # Default Admin Details
        full_name = "Administrator"
        email = "satish@digitalcreatorshub.com"
        password = "satish@123"

        # Hash Password
        password_hash = bcrypt.hashpw(
            password.encode("utf-8"),
            bcrypt.gensalt()
        ).decode("utf-8")

        # Insert Default Admin
        cursor.execute("""
            INSERT INTO admin_users
            (full_name, email, password_hash, role, is_active)
            VALUES (?, ?, ?, ?, ?)
        """, (
            full_name,
            email,
            password_hash,
            "admin",
            1
        ))

        conn.commit()
        conn.close()

        print("======================================")
        print(" Digital Creators Hub Database Created ")
        print("======================================")
        print(f"Database Location: {DATABASE_PATH}")
        print("All tables created successfully.")
        print()
        print("Default Admin Account")
        print("-------------------------")
        print(f"Email    : {email}")
        print(f"Password : {password}")


    if __name__ == "__main__":
        initialize_database()