import argparse
import json
import os

from flask import Flask, g, jsonify, render_template, request, abort

import rethinkdb as r
from rethinkdb.errors import RqlRuntimeError, RqlDriverError


RDB_HOST = os.environ.get('RDB_HOST') or 'localhost'
RDB_PORT = os.environ.get('RDB_PORT') or 28015
APP_DB = 'response'

def setup_db():
    connection = r.connect(host=RDB_HOST, port=RDB_PORT)
    try:
        r.db_create(APP_DB).run(connection)
        r.db(APP_DB).table_create('accounts').run(connection)
        print 'Database setup completed. Now run the app without --setup'
    except RqlRuntimeError:
        print 'Database already exists. Run the app without --setup'
    finally:
        connection.close()


app = Flask(__name__, static_url_path='')
app.config.from_object(__name__)


@app.before_request
def before_request():
    try:
        g.rdb_conn = r.connect(host=RDB_HOST, port=RDB_PORT, db=APP_DB)
    except RqlDriverError:
        abort(503, "No database connection could be established")

@app.teardown_request
def teardown_request(exception):
    try:
        g.rdb_conn.close()
    except AttributeError:
        pass


@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/incident', methods=['GET'])
def get_current_incident():
    incident = list(r.table('incidents').filter({'isCurrentIncident': True}).run(g.rdb_conn))[0]
    for response in incident['responses']:
        response['user'] = r.table('accounts').get(response['user']).pluck('firstName', 'lastName').run(g.rdb_conn)
    return jsonify(incident)

# @app.route('/incident', methods=['POST'])
# def new_incident():
#     return

# @app.route('/incident', methods=['PATCH'])
# def update_incident():
#     return

# @app.route('/incident', methods=['DELETE'])
# def remove_incident():
#     return

@app.route('/account', methods=['GET'])
def get_account():
    account = r.table('accounts').get('477d269c-cb2a-4a21-ab2e-32055068e016').run(g.rdb_conn)
    return jsonify(account)

@app.route('/account', methods=['PATCH'])
def update_account():
    return jsonify(r.table('accounts').get('477d269c-cb2a-4a21-ab2e-32055068e016').update(request.json).run(g.rdb_conn))

# @app.route('/account', methods=['POST'])
# def new_account():
#     return

# @app.route("/account/<string:id>", methods=['GET'])
# def get_account_by_id(id):
#     return jsonify(r.table('accounts').get(id).run(g.rdb_conn))

# @app.route("/account/<string:id>", methods=['DELETE'])
# def remove_account(id):
#     return jsonify(r.table('accounts').get(id).delete().run(g.rdb_conn))

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Run the response app')
    parser.add_argument('--setup', dest='run_setup', action='store_true')

    args = parser.parse_args()
    if args.run_setup:
        setup_db()
    else:
        app.run(debug=True)
