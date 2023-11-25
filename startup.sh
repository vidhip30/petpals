#!/bin/bash
backend_path="./backend/petpal"

if [ ! -d "$backend_path/venv" ]; then
    virtualenv "$backend_path/venv"
fi

source "$backend_path/venv/bin/activate"
pip install -r "$backend_path/requirements.txt"

"$backend_path/manage.py" makemigrations
"$backend_path/manage.py" migrate