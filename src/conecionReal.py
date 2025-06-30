from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
CORS(app)

# Conexión a la base de datos
def get_connection():
    return psycopg2.connect(
        host='localhost',
        user='postgres',
        password='luisito',
        database='Note ME!'
    )

@app.route('/guardar', methods=['POST'])
def guardar_nota():
    datos = request.get_json()
    titulo = datos['titulo']
    contenido = datos['contenido']

    try:
        conn = get_connection()
        cur = conn.cursor()
        cur.execute("INSERT INTO notas (titulo, contenido) VALUES (%s, %s);", (titulo, contenido))
        conn.commit()
        cur.close()
        return jsonify({"mensaje": "Nota guardada con éxito"})
    except Exception as ex:
        return jsonify({"error": str(ex)})
    finally:
        if conn:
            conn.close()

@app.route('/notas', methods=['GET'])
def obtener_notas():
    try:
        conn = get_connection()
        cur = conn.cursor()
        cur.execute("SELECT id, titulo, contenido FROM notas;")
        filas = cur.fetchall()
        notas = [{"id": f[0], "titulo": f[1], "contenido": f[2]} for f in filas]
        cur.close()
        return jsonify(notas)
    except Exception as ex:
        return jsonify({"error": str(ex)})
    finally:
        if conn:
            conn.close()

if __name__ == '__main__':
    app.run(debug=True)
