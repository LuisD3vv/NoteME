# import psycopg2

# try:
#     connection=psycopg2.connect(
#         host = 'localhost',
#         user = 'postgres',
#         password = 'luisito',
#         database = 'Note ME!'
#     )
#     print("conexion exitosa")
#     #realizar sentencia SQL
#     cursor=connection.cursor()
#     cursor.execute("select version()")
#     row=cursor.fetchone()
#     print(row)
#     cursor.execute("SELECT * FROM notas")
#     rows = cursor.fetchall()
#     for row in rows:
#         print(row)
# except Exception as ex:
#     print(ex)
# finally:
#     connection.close()
#     print("Conexion Finalizada")