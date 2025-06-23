from flask import Flask, request, jsonify
import psycopg2
from datetime import datetime

app = Flask(__name__)

# Configuración de conexión
conn = psycopg2.connect(
    host="localhost",
    database="notas_db",
    user="tu_usuario",
    password="tu_contraseña"
)
cur = conn.cursor()

# Ruta para agregar una nota
@app.route('/notas', methods=['POST'])
def agregar_nota():
    data = request.get_json()
    titulo = data.get('titulo')
    contenido = data.get('contenido')
    
    cur.execute("""
        INSERT INTO notas (titulo, contenido)
        VALUES (%s, %s)
    """, (titulo, contenido))
    conn.commit()
    
    return jsonify({"mensaje": "Nota guardada correctamente"})

# Ruta para obtener todas las notas
@app.route('/notas', methods=['GET'])
def obtener_notas():
    cur.execute("SELECT id, titulo, contenido, fecha_creacion FROM notas ORDER BY fecha_creacion DESC")
    notas = cur.fetchall()
    resultado = [
        {"id": n[0], "titulo": n[1], "contenido": n[2], "fecha": n[3].strftime("%Y-%m-%d %H:%M")}
        for n in notas
    ]
    return jsonify(resultado)

if __name__ == '__main__':
    app.run(debug=True)


# create database notas_db;

# create table notas (
#     id serial primary key,
#     titulo text not null,
#     contenido text not null,
#     fecha_creacion timestamp default current_timestamp
# );
