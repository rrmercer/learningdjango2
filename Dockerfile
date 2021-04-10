FROM ubuntu

RUN apt-get update
RUN apt-get install curl sudo -y
RUN curl -fsSL https://deb.nodesource.com/setup_15.x | sudo -E bash -
RUN sudo apt-get install -y nodejs

RUN mkdir app
WORKDIR /app
COPY . /app/
RUN cd /app/frontend
RUN npm install
# npm start

# install django and python
RUN apt-get install python3-venv python3-pip -y
RUN cd /app/
RUN pip3 install -r requirements.txt
RUN cd /app/mysite
# python3 manage.py runserver