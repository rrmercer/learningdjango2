FROM ubuntu

RUN apt-get update
RUN apt-get install curl sudo -y
RUN curl -fsSL https://deb.nodesource.com/setup_15.x | sudo -E bash -
RUN sudo apt-get install -y nodejs

RUN cd frontend
RUN npm install
# npm start

# install django and python
RUN apt-get install python3-venv
RUN cd mysite
RUN pip install requirements
# python manage.py runserver