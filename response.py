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


app = Flask(__name__)
app.config.from_object(__name__)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/responders', methods=['GET'])
def get_responders():
    return

@app.route('/responders', methods=['POST'])
def new_response_list():
    return

@app.route('/responders', methods=['PATCH'])
def update_responders():
    return

@app.route('/responders', methods=['DELETE'])
def remove_response_list():
    return

@app.route('/account', methods=['GET'])
def get_account():
    return

@app.route('/account', methods=['POST'])
def new_account():
    return

@app.route('/account', methods=['PATCH'])
def update_account():
    return

@app.route('/account', methods=['DELETE'])
def remove_account():
    return

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Run the response app')
    parser.add_argument('--setup', dest='run_setup', action='store_true')

    args = parser.parse_args()
    if args.run_setup:
        setup_db()
    else:
        app.run(debug=True)
