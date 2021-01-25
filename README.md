# learningdjango2

# to run locally:
## frontend
$> cd frontend
$> npm install
$> npm install -g webpack-dev-server webpack babel babel-cli
$> webpack-dev-server --hot

## backend
$> cd mysite
$> python3 -m venv env
$> source env/bin/activate
# todo: requirements
$> pip install django
$> pip install djangorestframework
$> pip install django-cors-headers
$> python manage.py runserver